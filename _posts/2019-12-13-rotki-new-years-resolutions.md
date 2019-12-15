---
layout: post
title: Rotki's New Year Resolutions
description: The roadmap of the Rotki portfolio manager for the year 2020

tags:
- Rotki

keywords:
- vuejs
- vue
- rotki
- ethereum
- bitcoin
- portfolio-tracking
- cryptocurrency-portfolio-tracker
---


# Introduction

As 2019 draws to a close, a lot of users have been asking us when will certain features be implemented, which features are in the pipeline and generally what's the roadmap for the future of Rotki as an application. This short post attempts to serve as a go-to answer for these questions, clarify the short-term roadmap and give some hints on what will come in the long-term future.

# Short term

Very recently we have created a [develop](https://github.com/rotki/rotki/tree/develop) branch in Rotki in order to facilitate all the big breaking changes that are coming. All PRs by default will now be done against develop and thus all big changes that need to be done will stay in that branch. Once a release is done, develop will merge to master and binaries will be published. PRs against master will be reserved for quick patch fixes that can be done independently of any breaking changes in develop.

The next release coming out of will be [v1.1.0](https://github.com/rotki/rotki/projects/2) and it will contain, among other things, two major features.

## Release v1.1.0

### Modern UI

The entire UI is being [rewritten](https://github.com/rotki/rotki/issues/354) and turned from the old-school hand-made `CSS` + `bootstrap` abominaton to a proper modern framework thanks to the tireless work done by [kelsos](https://twitter.com/kelsos86). At the time of writing this post the work is almost done and the [PR](https://github.com/rotki/rotki/pull/371) is about to be merged.

What does the average user care you may ask? By far the most important advantage of this change is that adding new UI components and thus features will become much easier. [Vue.js](https://vuejs.org/) is a modular framework which makes it trivial to add new components or modify the looks of the UI. In short adding new features is now going to be made easier. God knows there is a lot in the pipeline that needs to be implemented!

Apart from that the looks of the entire app are getting modernized. All components are now more sleek and pleasing to the eye. For example here is the ethereum token selection.

<img class="post_image_not_set_size with_border" src="{{'/public/post5/v105_v110.png' | relative_url}}" />


### Proper REST API

The current version of Rotki uses the [ZMQ](https://zeromq.org/) protocol in order for the front-end (UI) to communicate with the backend. The API developed for that communication was crude but what's worse ZMQ libraries for both python and javascript are not kept up to date and are pulling very old dependencies. The ZMQ library is why rotki is stuck in an old version of electron and also why we maintain our own fork of an abandoned node project, the [node-zerorpc](https://github.com/rotki/zerorpc-node-rotkehlchen) client.

The entire ZMQ messaging layer is getting rooted out and replaced by a proper [REST API](https://github.com/rotki/rotki/issues/404).

What does the average user care about this you may ask? Higher electron versions allow us to have more security in the application and take advantage of all the new electron features. Also with ZMQ no longer being a dependency, a very big and fat dependency is out and final binaries would probably be smaller in size.

But more importantly this opens up the way to be able to [run Rotki in a headless machine](https://github.com/rotki/rotki/issues/523) and communicate with it only via the API. That would also enable you to [run rotki's backend in a different machine than the UI](https://github.com/rotki/rotki/issues/522).

Finally with this change Rotki will be getting a very good, well documented and tested REST API. Users will now also be able to work with Rotki via command line interfaces. Below is a screenshot of the docs in the [work in progress PR](https://github.com/rotki/rotki/pull/526) that implements the ZMQ to REST API switch.

<img class="post_image_not_set_size with_border" src="{{'/public/post5/rotki_api_docs.png' | relative_url}}" />

### When?

When it's ready. Soon ™.

## Other releases after v1.1.0

The next big feature planned after that is implementation of support for [Coinbase PRO](https://github.com/rotki/rotki/projects/3) which should hit in the release right after v1.1.0, presumably [v1.2.0](https://github.com/rotki/rotki/projects/3).

Apart from that there is a lot of issues and feature requests in the [backlog](https://github.com/rotki/rotki/issues) that should be handled. Priority will go to supporting new exchanges such as [Bitstamp](https://github.com/rotki/rotki/issues/436) and generally fulfilling user's wishes such as [support for staking in PoS cryptocurrencies](https://github.com/rotki/rotki/issues/473).

What would **you** like to see in the near future implemented in Rotki? Don't be shy, join us and write up a feature request as a github issue [here](https://github.com/rotki/rotki/issues/new/choose).

# How can I follow the evolution of the roadmap?

As an opensource application, transparency is in the core of Rotki's ethos. As of the writing of this post our milestones are tracked by Github projects. You can see the current milestones [here](https://github.com/rotki/rotki/projects) and inspect which features will be implemented and which bugs will be fixed in which releases.

<img class="post_image_not_set_size with_border" src="{{'/public/post5/projects.png' | relative_url}}" />

The current milestones are:

- **Next patch release**: Small issues that may pop up and need quick fixes go here. Patch releases are made if required to make quick fixes to an already existing release.
- **Next minor release (currently v1.1.0)**: Most of the current development always targets the next minor release. All new features that are going to be included in the next release end up going there.
- **Minor release after the next (currently v1.2.0)**: This is where features that are planned for development go but which we know will not be included in the next minor (feature) release.

# Long term

The long term vision for Rotki is for it to become **the best** portfolio management, tracking and accounting application for both crypto and traditional assets. The tool that not only **enables you to manage your finances** but also **does this in an opensource, transparent way allowing you to own your financial data** and not have them lying on a centralized server somewhere in the cloud ready to fall into the hands of malicious actors.

In an ideal future it would also be able to track not only one's investments but also everyday expenses and provide insight and analytics about the entire spectrum of a user's finances.

There are no specific Github issues made yet for the various things that we are thinking about the long-term future but as a general idea:

- Rotki should be able to track traditional assets such as stocks, bonds, real estate and so on.
- Rotki should be able to manage a user's daily expenses and provide insights and analytics into spending habits, savings and so on.
- Users of Rotki should be able to track part of their expenses while on the move so a companion mobile app to Rotki desktop should be made.

What else would **you** like to see implemented in the long run in Rotki? What would you require from an application that is supposed to be the constant and trusted companion to all your financial analysis needs?

Naturally all the above largely depend on how the current userbase of Rotki grows and how succesfull is the monetization of the application. Without any steady revenue stream or funding all of the above are probably really hard to accomplish.

# Conclusion

The future of Rotki is bright! There is a lot of demand in the form of feature requests, and the userbase is steadily increasing. Stay tuned for more updates and please help us in building the best transparent financial tool that enables you to take ownership of your data. Ways to do that are:

- Try out Rotki's [latest release](https://github.com/rotki/rotki/releases).
- Provide us with [feedback](https://github.com/rotki/rotki/issues/new/choose) in the form of bug reports and feature requests.
- [Star](https://github.com/rotki/rotki) our Github repo and [follow](https://twitter.com/rotkiapp) us in Twitter.
- [Buy](https://rotki.com/products/) a premium subscription and/or [support us financially](https://github.com/rotki/rotki#financially).
- Spread the word so that more people get to try and use Rotki and learn how to both manage their finances but also how to protect the privacy of their financial data.
