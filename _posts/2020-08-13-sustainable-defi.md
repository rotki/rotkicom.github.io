---
layout: post
title:  Decentralized Finance, the YAM fiasco and the road to DeFi sustainability
description: This post explores what is the concept of Decentralized Finance (DeFi), what new possibilities does it unlock and why it's so cool and hot right now. On the other side of the coin it touches on the dark side of DeFi with the YOLO farming and unaudited contracts most recently highlighted by the YAM fiasco. Finally it takes a look on the road ahead, the lessons that the community needs to learn in order to create sustainable and responsible DeFi for decades to come that will not be used by few Twitter bros but permisionlessly by everyone around the world.

tags:
- Rotki
- yield-farming
- decentralized-finance
- security
- sustainability
- cryptocurrency

keywords:
- rotki
- security
- cryptocurrency
- DeFi
- decentralized-finance
- yield-farming
- yam
- ethereum
- portfolio-tracking
- cryptocurrency-portfolio-tracker
- lefteris-karapetsas
---

# Introduction

This post explores what is the concept of Decentralized Finance (DeFi), what new possibilities does it unlock and why it's so cool and hot right now. On the other side of the coin it touches on the dark side of DeFi with the YOLO farming and unaudited contracts most recently highlighted by the YAM fiasco. Finally it takes a look on the road ahead, the lessons that the community needs to learn in order to create sustainable and responsible DeFi for decades to come. Finacial instruments and tools that will not only be used by a few Twitter bros but permisionlessly by everyone around the world.

# What is DeFi

In one sentence, decentralized finance is the permissionless decentralized version of various traditional financial instruments such as exchanges, lending, borrowing, synthetic assets e.t.c. There has been a lot of innovation in the sector in the past 2 years.

## Decentralized Exchanges

We have various decentralized exchanges such as:

- [Uniswap](https://uniswap.org/)
- [Kyber](https://kyberswap.com/swap)
- [Deversifi](https://www.deversifi.com/)

They all operate in a decentralized way and are non-custodial in stark contrast with centralized exchanges such as Binance, Kraken to which you have to first deposit and give custody of your funds.

## Lending/Borrowing Protocols

There are protocols such as [Compound](https://app.compound.finance/) and [Aave](https://app.aave.com/home) that allow users to lend their assets to earn interest or to borrow assets after staking some collateral. MakerDAO also offers a form of borrowing via [vaults](https://oasis.app/borrow) that can mint the DAI stable token after depositing various forms of collateral.

## Synthetic Assets

Synthetic asset protocols such as [Synthetix](https://www.synthetix.io/) or [Token Sets](https://www.tokensets.com/) combine a mix of different assets into a single asset. This way you can get exposure to multiple different assets by just holding a single synthetic asset.

# What new possibilities does DeFi unlock?

What DeFi does is nothing new. All of this already exist in one form or another in the world of "traditional finance". What is so amazing and revolutionary about DeFi is that it's completely decentralized and permissionless. And that it is accessible to everyone regardless of location or background. It's unlocking a ton of possibilities for people around the world, building a new permisionless financial system in the process.

# The dark side of DeFi

Just like with everything involving money this sector also attracts short-termed myopic people and projects who are driven by greed.

There is the concept of a yield farmer, someone who provides liquidity or stakes in a protocol in return for interest, fees or some governance token. Yield farming is not bad per se. Everyone who provides liquidity in all the DeFi protocols is essentially yield farming. There is nothing wrong with that.

<br />

<img class="post_image_not_set_size with*border" src="{{'/public/post8/defichad.jpeg' | relative_url}}" />

<br />
<br />

The bad side of farming is the "DeFi chad" or "Defi Degen". The kind of meme-driven farmer who jumps from protocol to protocol without any thought on contract safety, chasing the biggest yield, dumping their tokens to the new guys and then moving on. A practice that is obviously unsustainable.

## YAM finance.

A very good example of the irresponsible approach to DeFi is YAM. An experiment that did not even manage to last 2 days. It [launched](https://medium.com/@yamfinance/yam-finance-d0ad577250c7) in 19:00 UTC, August 11th, 2020 and [died](https://medium.com/@yamfinance/yam-post-rescue-attempt-update-c9c90c05953f) 36 hours later.

### What happened?

YAM advertised itself as an experiment from the start. It was a mashup of code from various other DeFi projects, completely unaudited and without any safety hatches or deposit limits. For all intents and purposes a completely reckless enterprise. Despite that at its peak it had over $500m locked in it!

For a technical explanation of the bug read [their post](https://medium.com/@yamfinance/yam-post-rescue-attempt-update-c9c90c05953f). In short the bug made it impossible for the YAM holders to reach quorum on anything so essentially the governance part of the protocol was broken and without it the entire protocol could no longer function.

Once people realized that, the market cap of YAM went within minutes from $60m to 0. Everyone left holding YAM they bought took a loss as they can't sell it, so did uniswap liquidity providers as they took a loss every time someone sold YAM through them.


### Could this have been avoided?

ABSOLUTELY

There were multiple warnings from many prominet people in the crypto sector including myself that this is going to end in tears. The minimum precaution that could have been taken is:

- Write contract tests
- Have some sort of security audit of the code
- IF you claim it's an experiment then treat it as such by:
    * Putting deposit limits in the code to protect your users
	* Put an escape hatch in the code to protect your users.
	

### Ponzi

What's worse is that from the tokenomics of YAM it was obvious that this was a ponzi game. Note the difference between ponzi game and ponzi scheme as explained in [this](https://jpkoning.blogspot.com/2018/05/ethereum-is-full-of-ponzis-is-that.html) article.

Every 12 hours the total supply of the token increased but the amount held by each user stayed the same through a process called rebasing. The first farmers were incentivized to pump and shill YAM via social media so they can find victims onto whom to dump their tokens after the rebase. The new holders had the exact same incentives to pump it even more so they can in turn dump their bags onto the poor sods after the second rebase. And so on and so forth.

It was a "fair" and transparent ponzi, but a ponzi nonetheless. And with the amount of due dilligence people do in Crypto I am 100% certain that most of the people who got shilled into it did not realize that and lost money as a result.

### Shilling in Twitter

What I personally found **absolutely disgusting** was the incessant amount of shilling of YAM in Twitter by many people in the ethereum community whom I actually respect who were also farming it.

It's inexcusable, reckless and irresponsible. They were shilling a protocol that had not seen any production use yet, had unaudited code, no tests, no deposit limits or anything. They were doing so only to get more people into the Ponzi game to sustain their profits and dump their bags onto them.

I sincerely hope lessons are now learned. If you are shilling an unaudited insecure ponzi you are part of the problem of why this sector is not taken seriously. We can't have such irresponsible behavior if we are ever going to reach mass adoption.

### What did it cost us?

<img class="post_image_not_set_size with*border" src="{{'/public/post8/yamcrash.jpeg' | relative_url}}" />

Some people lost a lot of money

- Marketcap dropped from $60m to $0.
- People who bought YAM are left holding a hot potato, got burned and lost everything they invested.
- Uniswap liquidity providers lost money due to providing liquidity for sellers of a dying token.
- Lots of money in gas fees (300+ gwei) for nothing

The rest of the non yam farming ethereum users were left with 300 gwei gas prices and could not really use the ethereum blockchain.

And finally and most importantly, outsiders roll their eyes and we lose credibility. Every nocoiner I know that I tried to explain this to just get their view that crypto is only for scams and ponzi schemes reinforced. Can you blame them?

# Responsible Decentralized Finance

If you are to keep anything from this post as a take-home message let it be this section. DeFi is good and is here to stay. We just all need to be more responsible about it.

## Responsible DeFi user

As a user don't rush into every new thing that pops up and promises amazing 100%+ returns. Do you due dilligence, demand audit reports, ask people in the community about the history and portfolio of the founders of the protocol and if possible read the code and understand the tokenomics. DYOR. If something sounds too good to be true that's because it's probably a scam or a ponzi.

## Responsible DeFi founder

As a founder/developer for the love of god DO NOT TEST IN PRODUCTION. Be responsible. Users do not heed warnings, or disclaimers. If it's an experiment and you want to experiment in the mainnet that's fine. Then put deposit limits and centralized escape hatches for the first X months. The safety of your users is your responsibility. Avoiding that responsbility through the veil of "just an experiment" won't be accepted.

## Towards a sustainable DeFi ecosystem

It is only through responsible development and professionalism that this sector can mature. We won't get any new users with the YOLO yield farming memes. For DeFi to fullfill its goals of a new permisionless financial system it needs to go mainstream. And it will not achieve that through ponzi games and chad memes in Twitter. This will only be achieved when the ecosystem is perceived by normies to be mature enough so that they can also come in and participante in it. Let's all then do our part to advance the ecosystem through responsible building and sustainable development and build a new financial system for the many and not for the few.


# Closing / About the author

My name is [Lefteris Karapetsas](https://twitter.com/LefterisJP). I am the founder of [Rotki](https://rotki.com/). It is a project that deals with DeFi, among other things, and believes in the dream of a sustainable permissionless new financial system. We are a portfolio tracker and accounting tool that respect our users' privacy and we are in this game for the long run and not to scam our users for short term gain.

Here is how you can help us:

- Try out Rotki's [latest release](https://github.com/rotki/rotki/releases) and use it daily.
- [Buy](https://rotki.com/products/) a premium subscription to unlock awesome premium features and also support our development.
- Provide us with [feedback](https://github.com/rotki/rotki/issues) in the form of bug reports and feature requests.
- [Star](https://github.com/rotki/rotki) our Github repo and [follow](https://twitter.com/rotkiapp) us on Twitter.
- Chat with us and other users of Rotki in [Discord](https://discord.gg/aGCxHG7) or in [Telegram](https://t.me/rotkiportfolio).
- Spread the word so that more people get to try and use Rotki and learn how to both manage their finances but also how to protect the privacy of their financial data.
