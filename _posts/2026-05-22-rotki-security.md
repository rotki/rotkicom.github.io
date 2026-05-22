---
layout: post
title: "How we shield rotki against supply chain attacks"
description: With the increasing number of attacks, it is important to ensure integrity and secure the whole development pipeline. This is how we do it at rotki.

tags:
- rotki
- developer

keywords:
- rotki
- security
- privacy
- local first
---

> Update: This post was updated after initial publishing to mention our 7-day cooldown period before updating dependencies.

rotki is a local app that helps you to keep track of your crypto activity both as transactions on different chains and on CEXes like Coinbase, Kraken, Binance, etc. This information is quite sensitive and there are [reasons to not leak it](https://github.com/jlopp/physical-bitcoin-attacks/blob/master/README.md). It is **critical** for us that what reaches your computer is exactly what we built. Anything less puts our users at risk.

For this reason, after the recent attacks [^1] [^2] [^3], we reviewed our dependency supply chain and the measures we've had in place since day one. rotki has many moving parts and its architecture spans different stacks and layers: package managers, CI, packaging pipelines, distribution. All of them need to be secure.

There is no magic solution that makes the process 100% secure. But you can make attacks harder, reduce the places where trust is implicit, and make releases easier to verify. This is what we currently do.

## Locked dependencies everywhere

The first rule is that builds should not decide dependency versions on their own.

All the ecosystems we use have lockfiles and we treat them as part of the source code. If a dependency changes, the lockfile has to change too and that change has to be reviewed. This gives us a clear place to see what was added, removed, or upgraded.

In practice this means:

- **Frontend**: we use `pnpm install --frozen-lockfile`, so `pnpm-lock.yaml` must already contain the exact dependency graph.
- **Backend**: we use `uv sync --locked`, so Python dependencies must match what is in `uv.lock`.
- **Rust service**: we use `cargo fetch --locked`, so Cargo will not resolve any unexpected version.

This is important because package registries are mutable environments. A maintainer account can be compromised, a package can be transferred, or a new version can be published with malicious code. If CI installs "whatever is latest that satisfies the range", then an attacker only needs to influence dependency resolution once.

With locked installs, CI installs what we reviewed before. If someone wants to update a package, that becomes an explicit code change.

Also for the `node` ecosystem we use `pnpm` instead of `npm` since it offers additional protections and most of the recent attacks haven't affected pnpm users.

## Release builds do not use dependency caches

Our CI for tests and on-demand builds runs entirely on GitHub, and we use caches because they save a lot of time. We make several PRs per day and waiting for every dependency to be downloaded from scratch on every branch would be painful.

Releases are different. They happen less often and they are what the user will receive. For releases we prefer the slower and cleaner path.

For release workflows we disable package manager caches:

```yaml
# rotki_release.yaml
enable-cache: false          # uv
package-manager-cache: false # pnpm
```

The reason is cache poisoning. If a malicious dependency, binary, or intermediate artifact lands in a cache, the release job could reuse it without ever pulling the legitimate version. That kind of failure is hard to notice because everything can still look reproducible from the outside.

So for releases we build from scratch, using the locked dependency versions and fresh downloads. It costs more CI time, but this is one of those cases where speed is not the priority.

## GitHub Actions are pinned to commit hashes

CI configuration is code too. In many projects this part is overlooked, but the actions used in GitHub workflows have a lot of power. They can read the repository, access secrets depending on the job, upload artifacts, and influence what gets released.

For that reason we pin GitHub Actions to full commit SHAs instead of tags:

```yaml
uses: actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd  # v6.0.2
```

Using tags like `@v6` or `@v6.0.2` is more convenient than pointing to commits but tags are also more dangerous. If a tag is moved, or if an upstream project is compromised, the same workflow file can suddenly execute different code. A commit hash is immutable and explicit: it points to exactly which code we are trusting.

## Build provenance attestations

Users should be able to ask: "Was this binary built by rotki, from the rotki source code, in the expected CI environment?"

To help answer that, we generate build provenance attestations for release artifacts using `actions/attest-build-provenance`. This attaches verifiable metadata to the artifact.

The attestation links the binary to the workflow that produced it and to the source revision used for the build. This is useful because it narrows the trust problem. Instead of only trusting a file that appeared on a release page, users and downstream distributors can verify where it came from.

This matters especially for desktop applications like rotki since people download a binary and run it locally. If an attacker manages to replace an artifact after the build, provenance checks give us and users another way to detect that the file is not the expected output of our release process.

More information is available [here](https://docs.rotki.com/requirement-and-installation/verify.html#verify-your-download)

> Note: In the case of the Windows version we are forced to sign the binary locally with a YubiKey and reupload it. The Github attestation will fail because of that.

## Trusted publishing instead of tokens

Publishing credentials are dangerous. An npm or PyPI token can leak from a developer machine, CI logs, a misconfigured secret, or an old environment nobody remembers. For packages we publish ourselves, we avoid that model completely and use trusted publishing with OpenID Connect (OIDC).

With trusted publishing, the registry does not use a token at all. Instead it verifies that the publishing request comes from the GitHub Actions workflow we configured. The permission is tied to the repository, the workflow, and the release process.

This has two advantages:

- There is no secret to steal.
- Publishing is constrained to the CI path we control.

## New dependencies go through quarantine

The easiest way to reduce dependency risk is to have fewer dependencies. Of course we cannot write everything ourselves and good libraries save time and prevent bugs. But every new dependency is also new code that runs in our application, new maintainers we trust, new transitive dependencies, and a new update stream to monitor.

So we do not add dependencies casually. Before adopting a new package we look at things like:

- Who maintains it?
- Is the project active?
- Does it have a history of suspicious releases?
- How many transitive dependencies does it bring?
- Is the package doing something simple enough that we should implement it ourselves?
- Is vendoring a small piece of code safer than depending on the whole package?

When a dependency is accepted, it is always added with locked versions. As an extra precaution, we also apply a 7-day cooldown period before updating dependencies to newly released versions, giving the ecosystem time to detect and report suspicious releases. We have to be honest about the fact that maintainers are themselves attack targets and that dependency graphs grow fast.

## Closing thoughts

Securing the supply chain for any software is hard and no single measure shields you. It takes several layered steps and even then nothing is perfect. The practices above are some of the most important ones we take to ensure that the software you receive from rotki is exactly what you expect from us.

None of this means we are done. Security work is never finished. But we think this is the right direction: less implicit trust, more reviewable state, and release artifacts that are easier to reason about.

[^1]: [Mini Shai-Hulud: Compromised AntV npm packages enable CI/CD credential theft](https://www.microsoft.com/en-us/security/blog/2026/05/20/mini-shai-hulud-compromised-antv-npm-packages-enable-ci-cd-credential-theft/)
[^2]: [Mitigating the Axios npm supply chain compromise](https://www.microsoft.com/en-us/security/blog/2026/04/01/mitigating-the-axios-npm-supply-chain-compromise/)
[^3]: [Vercel April 2026 security incident](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident#what-we-know)