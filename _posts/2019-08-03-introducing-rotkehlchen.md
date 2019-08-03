---
layout: post
title: Rotkehlchen's Values and Vision

tags:
- Rotkehlchen
---


# Introduction

In this post we are going to see what Rotkehlchen is, what is it trying to solve, what is the value proposition of the application compared to competitors, the values we stand for, our vision for the future and more.


# Our values

The casual reader may think: "Okay so what the heck am I here for? I see a hard to pronounce German name and a cute bird picture."

Read on to see what is the problem we are trying to solve, how we do that and what our value proposition is.

## What is the Problem?

Does the following situation sound familiar?

You have bought a few different cryptocurrencies, traded a bit, even bought something with your cryptocurrencies and now you are at a loss with what you have and where. In which account was `Token X`, did you deposit `Token Y` to `Exchange Z` and so on.

Also if you ever wanted an overview of the performance of your portfolio you have no idea how to even begin to calculate your profit/loss. What about taxes? How can you take into account all the different rules your jurisdiction imposes?

## How does Rotkehlchen help?

This is where Rotkehlchen comes in.

It allows tracking of all your crypto assets, no matter if they are located on a blockchain account or on an exchange. It gives you an overview of all assets you own as well as provides you with the ability to analyze your transaction history in exchanges thus enabling calculation of profit/loss over a time period.

<img class="post_image" src="{{'/public/post1/rk-screenshot-1.png' | relative_url}}" />


With a [premium](#rotkehlchen-premium) subscription it also provides very nice visualizations of the above in easy to read graphs such as the one below showcasing a test user's total USD value in BTC and their total BTC amount graphed over time.

<img class="post_image" src="{{'/public/post1/graph1.jpeg' | relative_url}}" />

Our test user sold when BTC price was high to rebalance his portfolio and bought again when it was low according to the graph.

You can also customize the profit/loss calculation to adjust it to the requirements of your jurisdiction and get a very easy detailed report which can be exported in CSV and handed over to your accountant.

<img class="post_image" src="{{'/public/post1/rk-screenshot-2.png' | relative_url}}" />

## Rotkehlchen's value proposition

Okay so what? There are many other applications which offer similar services. cointracking.info cryptotax.de to name just a few.

It's true. We are surrounded by coin tracking applications. We see a new one pop up every day. But they all share the same common flaw. They are **centralized online** applications onto which you have to **relinquish all your data**.

Arguably there is few data more important than the entire history of your financial transactions. And to simply hand it over to a centralized closed-source service is unthinkable! Especially for people who are prominent defendants of privacy and decentralization as most crypto users are.

Using any of the above applications is dangerous to you and to your financial privacy. Avoid them like the plague!

Here in Rotkehlchen we won't have any of that and this is the strongest point in our value proposition:

- Rotkehlchen is a **local** application available in all major Operating systems. You don't need to send your data anywhere and worry about their eventual misusage. They are all local to your system.

- Rotkehlchen is **opensource**. You don't need to wonder what it does with your data, how it calculates what it does or even believe us at all. Just go to the [source](https://github.com/rotkehlchenio/rotkehlchen) and verify that what we are saying here is true.

- Rotkehlchen keeps all data **encrypted** locally. Your data is yours and encrypted locally with a password of your choice when you make your account.

- Rotkehlchen is **transparent** and **auditable**. Since everything is open you will never have to question why something has been calculated as it is and neither will your accountant or your tax authority or whomever you choose to share your data with.

# Our Vision

Our vision for tracking, accounting and analytics of finance is one of transparency, openness and empowering of the individual. The development of Rotkehlchen and our roadmap reflects those values. We want to enable you to **take ownership of your financial data**.

## Planned Features

This is a rough outline of some of the features we have planned for Rotkehlchen both in the near but also long-term future.

### Tighter integration with DeFi

A very hot topic in Ethereum these days is Decentralized Finance (DeFi). From lending protocols, decentralized exchanges, derivatives there is a lot of ways to get involved.

It is our goal to slowly but steadily integrate Rotkehlchen with as much of the DeFi ecosystem as possible so that you can track, analyze and interact with it through the privacy of Rotkehlchen's local application.


### Frontend rewrite in Vue.js

As seen [here](https://github.com/rotkehlchenio/rotkehlchen/issues/354) the frontend of the application will be rewritten in Vue.js. This will allow for prettier and more usable frontend and also better maintanability of the frontend code.

### Track other financial assets

Rotkehlchen started as a crypto asset tracking and analytics application. But some of our users have also asked for the ability to track other more traditional assets such as stocks, real estate ... even so far down as tracking every day expenses.

We would like to cater to most people's needs and as such will slowly roll out support for extra assets as long as time and resources allow.

### Android companion application

The need to check a portfolio on the-go or to add and track expenses arises pretty often. At the moment as a user you would have to wait until you get to your computer to open the Rotkehlchen application.

In order to solve this problem we would like to, in the long term, offer an android companion application that will allow tracking of every day expenses, monitoring of all your crypto assets and syncing with the main application.

### Integrating with more Exchanges

There are so many exchanges out there that it's hard to integrate with all of them. Each integration requires quite a bit of coding time in order to make sure that the API is integrated properly and that all assets offered by the exchange are supported.

We want to support as many exchanges as possible and so far [these](https://github.com/rotkehlchenio/rotkehlchen/issues?q=is%3Aissue+is%3Aopen+label%3A%22Exchange+Addition+Request%22) are the exchange support requests we have gotten.

<img class="post_image" src="{{'/public/post1/exchange_support_requests.png' | relative_url}}" />

We will prioritize on what most users need, judged by the number of thumbs up in each issue. If you would like to see Rotkehlchen support an exchange please put a thumbs up on the respective issue or create a new one if no issue exists for the exchange you would like to see supported.

### Multiple cryptocurrency price sources.

At the moment we are solely relying on [cryptocompare](https://www.cryptocompare.com/) for cryptocurrency historical price data. They are by far the most advanced data provider out there but fallbacks are needed.

As can be seen by [this](https://github.com/rotkehlchenio/rotkehlchen/issues/224) issue we will integrate other data providers such as [coin paprika](https://coinpaprika.com/) and no longer rely on a single soure for price data.

## What features do you need?

If there is something else that you would like to see added to Rotkehlchen please visit our [issue tracker](https://github.com/rotkehlchenio/rotkehlchen/issues) and open a feature request.

We want to build an application that you will find useful. Help us make Rotkehlchen an application you would love to use on a daily basis.

# Supporting us

The vision of data ownership and transparency in accounting is something we strongly believe in. That is the reason we are an opensource local application, so that we can enable you to take ownership of your data and that you can transparently see what is being calculated and how.

## Rotkehlchen Premium

Funding an opensource project is not an easy task. Our approach to funding and to at the same time maintaining our values is to offer a premium subscription on top of the normal Rotkehlchen experience.

With a premium subscription you get statistics, graphs and analytics, data sync between devices and more. For more information and to also purchase a premium subscription go [here](https://rotkehlchen.io/products/).

By purchasing a premium Rotkehlchen subscription not only do you get to enjoy extra features but you are funding opensource without the use of any middlemen! We accept both fiat and crypto currencies. 

Please help us develop Rotkehlchen and protect your financial privacy.

## Donations

If for some reason you don't want to purchase a premium subscription but would still like to support us we accept cryptocurrency donations in ETH and BTC at the addresses seen [here](https://github.com/rotkehlchenio/rotkehlchen#donations).

## Tipping on Brave Browser

If you are using brave you can tip us with BAT both at our [website](http://rotkehlchen.io) and our [twitter](https://twitter.com/rotkehlchenio). For more information on brave tipping check the [documentation](https://support.brave.com/hc/en-us/articles/360021123971-How-do-I-tip-websites-and-Content-Creators-in-Brave-Rewards-).

# Conclusion

Do **not** give in to the ease of use that some centralized services offer you in exchange for all of your financial data and a steeper price tag. **Take ownership of your financial data** today by using Rotkehlchen.

 - Get the latest version [here](https://github.com/rotkehlchenio/rotkehlchen/releases)
 - For information on actually using Rotkehlchen please check the [documentation](https://rotkehlchen.readthedocs.io/en/latest/).
 - For updates follow us on twitter:
     - [rotkehlchen](https://twitter.com/rotkehlchenio)
     - [lefterisjp](https://twitter.com/lefterisjp)


