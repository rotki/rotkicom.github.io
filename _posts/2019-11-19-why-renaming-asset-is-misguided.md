---
layout: post
title: Why creating a new asset in an immutable ledger should not reuse an old name
description: This post analyzes why the renaming by MakerDAO of the old DAI to SAI in the immutable Ethereum ledger is a mistake and what does Rotki do in order to support the renaming of DAI to SAI and the new Multi-collateral DAI.

tags:
- Rotki

keywords:
- dai
- makerdao
- rotki
- ethereum
- bitcoin
- cryptocurrency-portfolio-tracker
- portfolio-tracking
- asset-renaming
---


# Introduction

Yesterday MakerDAO [reached](https://blog.makerdao.com/multi-collateral-dai-is-live/) a very important milestone. It introduced a new type of `DAI` stablecoin that can have multiple underlying assets used for collateral as opposed to the old `DAI` which could only be supported by collateralizing `ETH`.

Unfortunately at the same time they decided that they were so attached to the name `DAI` that they wanted to give the same name to the new token. And they could only do this by renaming the old token. Which is exactly what MakerDAO went with as you can see [here](https://blog.makerdao.com/what-to-expect-with-the-launch-of-multi-collateral-dai/).

<img class="post_image_not_set_size with_border" src="{{'/public/post4/maker_new_terminology.jpg' | relative_url}}" />

This post is going to explain in detail why from a user's or an application's perspective the decision to change the name is quite bluntly put **idiotic**. Renaming  `DAI` to `SAI` has zero advantages and introduces a long list of problems as seen below.


# Problems introduced by renaming

In this section we will see a writeup of all the problems that the renaming is introducing along with a short explanation for each one.

## Token Symbol

A contract deployed in the Ethereum blockchain is immutable. The `DAI` contract is [here](https://etherscan.io/address/0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359#readContract). If you try to read the `symbol` attribute it will be `DAI`. The `symbol` attribute is part of the ERC20 interface and ignoring it breaks that interface. You can not arbitrarily decide to now call the token by a different name (`SAI`) while the `symbol` of the token is `DAI`.

<img class="post_image_not_set_size with_border" src="{{'/public/post4/dai_symbol.png' | relative_url}}" />

## Centralized Exchanges

Right now centralized exchanges are in a tough spot. They have to perform `DAI` to `MCDAI` upgrades for their users and then decide on how to name the new assets. If an exchange intends to keep both tokens listed then the naming becomes a problem.

<img class="post_image_not_set_size with_border" src="{{'/public/post4/kraken_deposit.png' | relative_url}}" />

In the end the problem is pushed to the users as can be seen from above. For users `SAI` is `DAI` but if as a user you attempt to deposit what you think is `DAI` to Kraken you will lose it. If that does not constitute a UX nightmare I honestly do not know what does.

## Decentralized Exchanges

Decentralized exchanges do not have much of a choice. They do not hold the tokens for their users so they will not be able to automatically upgrade `DAI` for them. They need to offer trades in both tokens and then the naming does indeed become a problem.

## Software libraries

Software needs to be making assumptions for some basic things. One of these assumptions that software in our field make is on the immutability of contracts and by extension the token contract symbols.

Software libraries that made correct assumptions in the past will now break.
As an example, one of the most used javascript libraries in crypto UI applications is [cryptocurrency-icons](https://github.com/atomiclabs/cryptocurrency-icons). It pulls icons for crypto assets based on the symbol name.

At the moment, the `DAI` symbol returns the old logo of `DAI` and the `SAI` symbol will return an error. All projects using this library (and it's a lot) will have to update whenever a new version comes out. At the moment there is no version supporting the new naming so all projects using it are displaying the wrong icons.

## External APIS

A lot of APIs, for example price feeds such as [cryptocompare](https://www.cryptocompare.com/coins/dai/overview) have had `DAI` listed. Now they need to update their APIs in order to point `DAI` to the price of the new multicollateral `DAI` and create a new entry for the `SAI` token which points to the old `DAI` price. And that is hoping that there is no other cryptocurrency with the `SAI` symbol. I am pretty sure not every one of these price feeds will follow the new naming and then end-user applications will have to maintain converters between different price feeds using different symbols. It's a mess.

## End user applications

Every single end-user application that deals with crypto and `DAI` has to adjust. As an example we can take Rotki. If we go with renaming `DAI` to `SAI` we have to create a new release that will upgrade the user's databases renaming the assets and rewritting history. If we do not we will confuse our users.

# What is the solution?

At this point nothing can be done. The renaming has to go through since it has already started. But due to all the reasons outlined above it was a terrible decision.

The proper solution would have been a very simple one. `DAI` stays as `DAI` and is the symbol of the single collateral `DAI`. And then the new multi-collateral token is called `MCDAI` or well ... anything other than the same name as the previous token.

# Conclusion

Despite all the problems with the renaming the achievement of having a multicollateral `DAI` is something to be proud of.

All of the above problems in isolation do not sound really bad but if you sum them all up it ends up as a nightmare for all actors involved. It's a mess for application developers, a mess for users and a mess for service providers. And all of these could have been avoided by simply doing the obvious thing and providing a **new** name for a **new** token!

For Rotki a blog post will follow explaining how we will handle the switch from `SAI` to `DAI` and how it will be reflected in the databases of our users. If you liked this post and have not tried Rotki yet you can get the latest release from [here](https://github.com/rotki/rotki/releases). By using Rotki you can take ownership of your financial data! Please try it out and provide us with feedback so that the software can improve.
