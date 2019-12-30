---
layout: post
title: Rotki 2019 - A year in review
description: Highlights big things that happened in Rotki during the year 2019

tags:
- Rotki

keywords:
- rotki
- ethereum
- bitcoin
- portfolio-tracking
- cryptocurrency-portfolio-tracker
- lefteris-karapetsas
- kelsos
---


# Introduction

What a year has this been for Rotki! With less than two days left in 2019 this post is meant to highlight the biggest things that happened in the project during the past 12 months, list what we have achieved and look to what is coming in the future.


# Year In Review

## January

January started with the publishing of [Rotki v0.6.0](https://github.com/rotki/rotki/releases), the last release before v1.0.

<img class="post_image_not_set_size with_border" src="{{'/public/post6/release_v0_6_0.png' | relative_url}}" />

It was a big release containing many bug fixes but also introducing some features like the API query caching or the tax report progress indicator that stay with Rotki even to this date.

Other than that development [continued](https://github.com/rotki/rotki/pulls?utf8=%E2%9C%93&q=is%3Apr+created%3A2019-01-01..2019-01-31+) with a good pace.

## February

Work on Rotki [continued](https://github.com/rotki/rotki/pulls?utf8=%E2%9C%93&q=is%3Apr+created%3A2019-02-01..2019-02-28). The project's source code was [ported to Windows](https://twitter.com/LefterisJP/status/1100327186660245504) and for the first time Rotki gets to run in a Windows environment.

<img class="post_image_not_set_size with_border" src="{{'/public/post6/rotki_windows.jpeg' | relative_url}}" />

Trying to port code to Windows is not an easy thing, especially coming from a Linux background, but seeing the end result of the app running inside an all familiar looking windows themed frame is really rewarding.

Apart from that a lot of work on improving the experience of the application was done such as accomodating for Token upgrades starting with the [new MLN](https://github.com/rotki/rotki/pull/278) token.

## March

Rotki participated in [ETHCC 2](https://ethcc.io/) in Paris and gave a talk on what Rotki is, what is the problem that we are trying to solve and what would v1.0 bring.

<img class="post_image_not_set_size with_border" src="{{'/public/post6/rotki_ethcc.jpg' | relative_url}}" />

The reactions from the audience and the questions we got were really encouraging. People wanted to learn more about Rotki's mission, how can they try it but most of all when would it be available in Windows and when would v1.0 be released?
To see the full recording of the talk check [here](https://www.youtube.com/watch?v=oIT0L9GDYEg).

Meanwhile development steadily [continued](https://github.com/rotki/rotki/pulls?utf8=%E2%9C%93&q=is%3Apr+created%3A2019-03-01..2019-03-31+) with sneak peeks of the [premium graphs](https://twitter.com/rotkiapp/status/1106129114388406272) and among other things a lot of [UI improvements](https://github.com/rotki/rotki/pull/305).

## April

Development [continued](https://github.com/rotki/rotki/pulls?utf8=%E2%9C%93&q=is%3Apr+created%3A2019-04-01..2019-04-30) in April but rather slowly. This month was dominated by events in Lefteris' personal life as he became a father!

<img class="post_image_not_set_size with_border" src="{{'/public/post6/hania.jpeg' | relative_url}}" />

## May

Slowly development [picked up its pace](https://github.com/rotki/rotki/pulls?utf8=%E2%9C%93&q=is%3Apr+created%3A2019-05-01..2019-05-31+) again with various bug fixes done to the app but also some features being implemented. Most notable change that got implemented in May was a complete change in the way assets are handled by Rotki. The application no longer trusted any single token/asset symbol it is given. Instead from here and on it maintains [a list of known asset symbols](https://github.com/rotki/rotki/pull/342/) along with their conversions from/to external services. Any asset not in that list is not supported by Rotki. This lets us stop the guessing games about what assets the user has and instead allows us to know all details about each token in question and how it translates in each exchange or price querying website.

{% highlight json linenos %}
"KEY": {
    "ethereum_address": "0x4CC19356f2D37338b9802aa8E8fc58B0373296E7",
    "ethereum_token_decimals": 18,
    "name": "Selfkey",
    "started": 1508803200,
    "symbol": "KEY",
    "type": "ethereum token"
},
"KEY-2": {
    "ethereum_address": "0x4Cd988AfBad37289BAAf53C13e98E2BD46aAEa8c",
    "ethereum_token_decimals": 18,
    "name": "Bihu KEY",
    "started": 1507822985,
    "symbol": "KEY",
    "type": "ethereum token"
},
"KEY-3": {
    "active": false,
    "ended": 1452038400,
    "name": "KeyCoin",
    "started": 1405382400,
    "symbol": "KEY",
    "type": "own chain"
},
{% endhighlight %}

If you are interested to learn more about this topic it has been covered extensively in [this](https://blog.rotki.com/2019/09/01/crypto-assets-database/) post.

## June

Development [continued](https://github.com/rotki/rotki/pull/371) with a steady pace towards v1.0.

A lot of work is also happening outside of Github as a website is being built for Rotki which also contains a system that allows premium users to purchase and manage premium subscriptions. Also an API server is being developed for the premiums users of Rotki.

<img class="post_image_wide with_border" src="{{'/public/post6/june_website_work.png' | relative_url}}" />

In parallel to all that [Kelsos](https://twitter.com/kelsos86) started the slow and painful process of [rewriting the UI code using the vue.js framework](https://github.com/rotki/rotki/pull/371)

## July

July is definitely dominated by finally reaching the v1.0 milestone.

<img class="post_image_not_set_size with_border" src="{{'/public/post6/release_v1_0_0.png' | relative_url}}" />

The Rotki v1.0 release was the biggest release of Rotki up to now (probably will be overshadowed by v1.1.0 though ;)).

It officially launched the purchasing of Rotki premium subscriptions and the website to support it. It also was the first release to utilize the premium API server to provide the users with the ability to save their data in our servers and get extra statistics and graphs for their assets and activity.

Rotki v1.0 also was the first release to be able to run in Windows.

With Rotki v1.0 the users could now for the first time conveniently see notifications in the top right of the front-end about information or warnings that the software wants to show them instead of always having to read the logfiles.

Finally this version had a ton of bug fixes, and new features for a full list of which you should check the [release notes](https://github.com/rotki/rotki/releases/tag/v1.0.0).

## August

As if v1.0 in July was not enough, August was a **really** busy month for Rotki!

As the users [started using v1.0](https://twitter.com/bitfalls/status/1157011467478155264), August started with bugfixing of various issues that were reported. Not one, but two bugfixing releases were made within a few days!

- [v1.0.1 - Afterfeather](https://github.com/rotki/rotki/releases/tag/v1.0.1)

<img class="post_image_not_set_size with_border" src="{{'/public/post6/release_v1_0_1.png' | relative_url}}" />

- [v1.0.2 - Afterafterfeather](https://github.com/rotki/rotki/releases/tag/v1.0.2)

<img class="post_image_not_set_size with_border" src="{{'/public/post6/release_v1_0_2.png' | relative_url}}" />

In August we also got our first paying premium subscribers, something that boosted our confidence that what we are building is something that people need and that the problem we are solving is worth all the effort we are putting into the project.

We also started getting a lot of feature requests from people in social media and Github

- [Allow authentication with WalletConnect](https://twitter.com/bmann/status/1164920035510509568)
- [Bitstamp support](https://twitter.com/Marsmensch/status/1160235755479949312)
- [POS chains staking support](https://twitter.com/jrmoreau/status/1160668837370617858)
- [Coinbase support](https://github.com/rotki/rotki/issues/296#issuecomment-519070786)

This blog was also started in August with the very first [post](https://blog.rotki.com/2019/08/03/rotkehlchen-value-vision/) explaining what Rotki is, what are our values and the vision for the future of the project.

An unforgettable event was our [participation](https://twitter.com/LefterisJP/status/1165188514499223552) in [EthBerlinzwei](https://ethberlinzwei.com/) and [Dappcon](https://dappcon.io/) which we even [sponsored](https://twitter.com/LefterisJP/status/1164525082477072384)!

<img class="post_image_not_set_size with_border" src="{{'/public/post6/ethberlinzwei.png' | relative_url}}" />

There we talked with many users who were interested in what's in store for Rotki and we got lots of [feedback](https://twitter.com/LefterisJP/status/1165350054762356736) and advice on how to go forward.

Finally at the very end of the month, a big release containing bug fixes and the most requested features was made. Release [v1.0.3](https://github.com/rotki/rotki/releases/tag/v1.0.3) added support for Coinbase which was a feature prioritized via request of a premium subscriber.

<img class="post_image_not_set_size with_border" src="{{'/public/post6/release_v1_0_3.png' | relative_url}}" />

It also introduced a dmg installer for OSX users, added a popup warning users when new releases are available and added various smaller features and lots of bug fixes. Check the [changelog](https://github.com/rotki/rotki/releases/tag/v1.0.3) for more details.

## September

Development [continued](https://github.com/rotki/rotki/pulls?utf8=%E2%9C%93&q=is%3Apr+created%3A2019-09-01..2019-09-30+) also in September. The biggest change implemented this month was [saving all actions inside the database](https://github.com/rotki/rotki/pull/508) so that users won't have to re-query each time they run Rotki.

In the meantime traction in social media is slowly [increasing](https://twitter.com/rotkiapp/status/1176579879560765440). To further improve our online presence we are trying to [educate](https://twitter.com/LefterisJP/status/1174645492095102977) current and potential future users on why Rotki is needed by explaining the problems of centralization, lack of privacy and lack of data ownership that all other portfolio tracking and accounting solutions are facing.

In the meantime yet another post is made in this blog, this time to explain [why Rotki maintains its own list of assets and their mappings](https://blog.rotki.com/2019/09/01/crypto-assets-database/).

Finally in order to support the Ethereum ecosystem from which we came we also became sponsors of ethereum's [devcon 5](https://devcon.org/) that would take place next month in Osaka, Japan.

<img class="post_image_not_set_size with_border" src="{{'/public/post6/sponsor_devcon.jpeg' | relative_url}}" />

## October

October started by unleashing a new Rotki release!

<img class="post_image_not_set_size with_border" src="{{'/public/post6/release_v1_0_4.png' | relative_url}}" />

Release v1.0.4 contained multiple features and bug fixes. The most noteworthy feature of that release was the ability to [import data from cointracking.info](https://github.com/rotki/rotki/issues/498). That feature was requested by a premium subscriber and as such was prioritized. For a full list of changes take a look at the [changelog](https://github.com/rotki/rotki/releases/tag/v1.0.4).

The most seminal event of October was of course our participation in Ethereum's [Devcon 5](https://devcon.org/) in Osaka, Japan and the [talk](https://twitter.com/LefterisJP/status/1182203276936114176) we gave there regarding the problems of using centralized tools in order to do accounting for the world of decentralized finance. You can find a recorded video of the talk [here](https://www.youtube.com/watch?v=hEwcDjjcUhk).

<img class="post_image_not_set_size with_border" src="{{'/public/post6/devcon5_talk.jpg' | relative_url}}" />

There was a lot of feedback given to us after the talk and during our presence in the conference. The feedback and questions revolved around upcoming DeFi features but also ideas of monetization for the project. There were ample discussions about the direction Rotki is taking as an opensource application trying to monetize itself and we got many ideas on potential ways forward.

Development also [continued](https://github.com/rotki/rotki/pulls?utf8=%E2%9C%93&q=is%3Apr+created%3A2019-10-01..2019-10-31+) albeit in a slower pace due to travelling to the other side of the world for the conference.

## November

In November development [continued](https://github.com/rotki/rotki/pulls?utf8=%E2%9C%93&q=is%3Apr+created%3A2019-11-01..2019-11-30+) trying to fix various bugs and prepare the next upcoming release.

The most noteworthy change that occured in November was the rebranding of the project from `Rotkehlchen` to `Rotki`. Since even before v1.0 many people were complaining about the difficulty they faced when trying to pronounce or spell the original name. It made it really hard to spread the word about it, recommend it to friends or even google it. As such rebranding to the diminutive form was absolutely necessary. Github, twitter, website all got renamed. For a full list of what changed check [this post](https://blog.rotki.com/2019/11/14/rotki-rebranding/).

<img class="post_image_not_set_size with_border" src="{{'/public/post6/rebranding.png' | relative_url}}" />

In November we also had to face the problems introduced by the [introduction](https://blog.makerdao.com/multi-collateral-dai-is-live/) of Maker DAO Multi-collateral DAI and the renaming of the old DAI to SAI. We developed the required [code and DB upgrades](https://github.com/rotki/rotki/pull/551) to handle it and also explained our view on why renaming an asset like that is misguided in [this blogpost](https://blog.rotki.com/2019/11/19/why-renaming-asset-is-misguided/).


## December

This month, Rotki has been **on fire**!

December started with the publishing of the last release for the year. Rotki [v1.0.5](https://github.com/rotki/rotki/releases/tag/v1.0.5) was released mainly containing the work done for the Maker DAO multi-collateral DAI upgrade. Some minor features and bug fixes were also included in this release. For a full list of changes check the [changelog](https://github.com/rotki/rotki/releases/tag/v1.0.5).

<img class="post_image_not_set_size with_border" src="{{'/public/post6/release_v1_0_5.png' | relative_url}}" />

After requests from our users we also created two chatrooms where users can chat about Rotki. A [Telegram chat](https://t.me/rotkiportfolio) and a [discord room](https://discordapp.com/invite/aGCxHG7).

But December, presumably due to the holidays, has been one of our most productive months of work.

We started having two different branches in the project due to the sheer amount of changes happening. The master branch stays as the stable branch where releases are published from. The development branch is where all new work is going to.

The work that Kelsos had started in June in order to switch the entire front-end code to utilize the [Vue.js framework](https://vuejs.org/) was finally finished and got [merged](https://github.com/rotki/rotki/pull/371).

<img class="post_image_not_set_size with_border" src="{{'/public/post6/monster_merge.jpeg' | relative_url}}" />

At the same time a lot of work [preparing the project for v.1.1.0](https://github.com/rotki/rotki/projects/2) was done. Most noteable of which was the [complete removal of ZMQ and replacing it with a full-fledged REST API](https://github.com/rotki/rotki/pull/526).
Even as of the writing of this post work [continues](https://github.com/rotki/rotki/pull/584) so that v1.1.0 can be ready in January 2020. I can't describe how much work has been going on in Rotki the past few days. Best way to see it for yourself is to [check the PRs in Github](https://github.com/rotki/rotki/pulls?utf8=%E2%9C%93&q=is%3Apr+created%3A2019-12-01..2019-12-31).

We also described how would v1.1.0 look in our [new year resolutions for 2020 post](https://blog.rotki.com/2019/12/13/rotki-new-years-resolutions/). Check it out if you would like to see some hints about how v1.1.0 will look like and also some more long-term ideas about Rotki.

# Wrapup

What a year has 2019 been for Rotki! We are beaming with pride! So much work has been done, the userbase is steadily growing, we acquired the first paid users and we have gotten more feature requests than we can currently cope with.

We would like to thank all the users who have entrusted us with their business and for all the good wishes and words of support we have gotten over social media. We promise that as we head into 2020 we will not let you down!


# Conclusion - 2020 and beyond

Heading into the new decade, we can only be positive about the future of Rotki!

A lot more work will be going into the project in order to fullfill all the feature requests we have been getting. Expect a lot more coming from us and for our online presence to increase and become stronger. The userbase will also steadily keep increasing, which will allow us to perfect the software and make it the best tool for everyone by taking all of your feedback into account.

Stay tuned for more updates and please help us in building the best transparent financial tool that enables you to take ownership of your financial data. Ways to do that are:

- Try out Rotki's [latest release](https://github.com/rotki/rotki/releases).
- Provide us with [feedback](https://github.com/rotki/rotki/issues/new/choose) in the form of bug reports and feature requests.
- [Star](https://github.com/rotki/rotki) our Github repo and [follow](https://twitter.com/rotkiapp) us in Twitter.
- [Buy](https://rotki.com/products/) a premium subscription and/or [support us financially](https://github.com/rotki/rotki#financially).
- Chat with us and other users of Rotki in [Telegram](https://t.me/rotkiportfolio) or in [Discord](https://discord.gg/aGCxHG7).
- Spread the word so that more people get to try and use Rotki and learn how to both manage their finances but also how to protect the privacy of their financial data.
