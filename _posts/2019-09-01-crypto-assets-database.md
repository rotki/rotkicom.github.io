---
layout: post
title: Dealing with ambiguity in token symbols
description: How does Rotki decide which assets to support and how does it deal with same crypto assets? This post explains the Rotki approach to recognizing and support crypto assets.

tags:
- Rotkehlchen

keywords:
- rotki
- ethereum
- bitcoin
- asset-database
- crypto-database
- crypto-list
- asset-list
---


# Introduction


<img class="post_image with_border" src="{{'/public/post2/whatis_acc.png' | relative_url}}" />

This post tries to explain why Rotki's approach to dealing with ambiguity in crypto assets is needed and why other approaches are error prone and most probably lead to broken results.

We will see what Rotki does in detail and what challenges exist when interfacing with multiple exchanges and other external services.


# Understanding The Problem

The best way to understand the problem is by example. Take the cryptoasset with the symbol `KEY`. Most of our competitors would simply see you have a `KEY` balance and query for its price at any given moment from a website such as [cryptocompare.com](https://www.cryptocompare.com/).

The problem is that as of the writing of this post three different tokens exist that use that symbol.

- [SelfKey](https://coinmarketcap.com/currencies/selfkey/)
- [Bihu Key](https://coinmarketcap.com/currencies/key/)
- [KeyCoin](https://coinmarketcap.com/currencies/keycoin/)


To make matters worse, price aggregator websites such as cryptocompare and coinpaprika have different representations.

For example:

- SelfKey is known as [KEY](https://www.cryptocompare.com/coins/key/overview) in cryptocompare
- Bihu Key is known as [BIHU](https://www.cryptocompare.com/coins/bihu/overview) cryptocompare
- KeyCoin is known as [KEYC](https://www.cryptocompare.com/coins/keyc/overview) in cryptocompare

- SelfKey is known as [key-selfkey](https://api.coinpaprika.com/v1/coins/key-selfkey) in coinpaprika
- BihuKey is known as [key-key](https://api.coinpaprika.com/v1/coins/key-key) in coinpaprika
- KeyCoin is not known in coinpaprika


Add different representations for each symbol in different exchanges in the mix and then the whole situations gets even more entangled as we can see with `ETHOS` and `BQX` below.

<img class="post_image with_border" src="{{'/public/post2/ethos_or_bqx.png' | relative_url}}" />

Do you believe that competitor webapps take all these different situations into account? Want a bet? Let's go and check their implementation ... oh wait ... we can't. Not only do they need you to upload all your data to them but their sourcecode is not open and thus you can't audit their calculations.

Your SelfKey could be priced as Keycoin or viceversa, or worse bail out since it can't find a price and not consider it in any profit/loss calculations.

# Solving the Problem

The only way to handle this problem is by maintaing a database of all assets that are supported. Rotki does this by maintaining the [all_assets.json](https://github.com/rotkehlchenio/rotkehlchen/blob/master/rotkehlchen/data/all_assets.json) file.

What are the rules for an asset to get listed? Rather simple actually:

1. If a user asks for an asset it will be added as long as a price for it exists in a supported price aggregator website (for the moment either in coinpaprika or cryptocompare).
2. If it's listed in any of the supported exchanges.
3. In both of the above cases historical prices need to also be discoverable in a price aggregator website. The lack of price discovery is for example why the [STL token PR](https://github.com/rotkehlchenio/rotkehlchen/pull/476) is blocked as of the time of writing this post.


For assets with identical symbols like `KEY` we end up with the following in [assets.json](https://github.com/rotkehlchenio/rotkehlchen/blob/master/rotkehlchen/data/all_assets.json#L4702)

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

## Asset Entry

All entries are comprised of a unique asset identifier, which is the key in the above JSON object. The identifier is always the symbol of the asset, and if an asset with the same symbol already exists then the identifier get a number prefix as seen above.

The rest of the attributes will be explored below. The attributes of an asset may change in future iterations of Rotki but as of v1.0.3 it's the following:

### name

This is a required attribute. It's the name by which the asset is commonly known.

### symbol

This is a required attribute. It's the symbol the asset has. This is not guaranteed to be unique across all the supported assets as is also made clear by the `KEY` token example.

### type

This is a required attribute. It's the type of asset this is. Determines if it's a blockchain asset and if yes on which chain it is. Valid values as of writing this post can be seen [here](https://github.com/rotkehlchenio/rotkehlchen/blob/07e014fe6121a92608638ef517350d03aaa78f34/rotkehlchen/assets/resolver.py#L7):
{% highlight python linenos %}
asset_type_mapping = {
    'fiat': AssetType.FIAT,
    'own chain': AssetType.OWN_CHAIN,
    'ethereum token and own chain': AssetType.OWN_CHAIN,
    'ethereum token and more': AssetType.ETH_TOKEN_AND_MORE,
    'ethereum token': AssetType.ETH_TOKEN,
    'omni token': AssetType.OMNI_TOKEN,
    'neo token': AssetType.NEO_TOKEN,
    'counterparty token': AssetType.XCP_TOKEN,
    'bitshares token': AssetType.BTS_TOKEN,
    'ardor token': AssetType.ARDOR_TOKEN,
    'nxt token': AssetType.NXT_TOKEN,
    'Ubiq token': AssetType.UBIQ_TOKEN,
    'Nubits token': AssetType.NUBITS_TOKEN,
    'Burst token': AssetType.BURST_TOKEN,
    'waves token': AssetType.WAVES_TOKEN,
    'qtum token': AssetType.QTUM_TOKEN,
    'stellar token': AssetType.STELLAR_TOKEN,
    'tron token': AssetType.TRON_TOKEN,
    'ontology token': AssetType.ONTOLOGY_TOKEN,
    'exchange specific': AssetType.EXCHANGE_SPECIFIC,
    'vechain token': AssetType.VECHAIN_TOKEN,
    'binance token': AssetType.BINANCE_TOKEN,
}
{% endhighlight %}

### active

The active attribute is optional. If missing, a `true` value is implied. It signifies if the asset is actively traded in any exchange and has a price.

### ended

This is an optional attribute but is required if an asset is not active. If an asset is not active this attribute signifies the timestamp at which all trading (and thus price) ceased for the asset.

### ethereum_address

If the type of the asset is `ethereum_token` or related then it should also contain this entry. This entry contains the EIP55 encoded address of the token's contract address in the main ethereum chain.

### ethereum_token_decimals

Just like the previous entry if the asset is an ethereum token we also need to know its decimals in order to know how to display it to the user.

### forked

This is an optional attribute. If the asset is a fork of another asset then the originating asset before the fork should be shown here.

For example `BCH` has the `BTC` forked attribute since it's a fork off Bitcoin.

### swapped_for

This is an optional attribute. If the asset ceased to exist but was swapped for another asset then this attribute points to the new asset.

For example `SCJX` was a counterparty token which got swapped for the `STORJ` ethereum token.


## Conversions

With our list of assets at hand we need to be able to interact with other websites such as price aggregators or exchanges. The idea is that we maintain the Rotki database of assets which is our local "truth". And when serializing our assets to communicate with another website or deserializing the assets we read from a website we need converters.

This is where the [assets/converters.py](https://github.com/rotkehlchenio/rotkehlchen/blob/07e014fe6121a92608638ef517350d03aaa78f34/rotkehlchen/assets/converters.py) module comes in.

For all incoming assets we convert to the Rotki format when necessary:

{% highlight python linenos %}
def asset_from_kraken(kraken_name: str) -> Asset:
    if not isinstance(kraken_name, str):
        raise DeserializationError(f'Got non-string type {type(kraken_name)} for kraken asset')
    name = KRAKEN_TO_WORLD.get(kraken_name, kraken_name)
    return Asset(name)


def asset_from_cryptocompare(cc_name: str) -> Asset:
    return Asset(CRYPTOCOMPARE_TO_WORLD[cc_name])


def asset_from_poloniex(poloniex_name: str) -> Asset:
    if not isinstance(poloniex_name, str):
        raise DeserializationError(f'Got non-string type {type(poloniex_name)} for poloniex asset')

    if poloniex_name in UNSUPPORTED_POLONIEX_ASSETS:
        raise UnsupportedAsset(poloniex_name)

    our_name = POLONIEX_TO_WORLD.get(poloniex_name, poloniex_name)
    return Asset(our_name)


def asset_from_bittrex(bittrex_name: str) -> Asset:
    if not isinstance(bittrex_name, str):
        raise DeserializationError(f'Got non-string type {type(bittrex_name)} for bittrex asset')

    if bittrex_name in UNSUPPORTED_BITTREX_ASSETS:
        raise UnsupportedAsset(bittrex_name)

    name = BITTREX_TO_WORLD.get(bittrex_name, bittrex_name)
    return Asset(name)


def asset_from_binance(binance_name: str) -> Asset:
    if not isinstance(binance_name, str):
        raise DeserializationError(f'Got non-string type {type(binance_name)} for binance asset')

    if binance_name in UNSUPPORTED_BINANCE_ASSETS:
        raise UnsupportedAsset(binance_name)

    if binance_name in RENAMED_BINANCE_ASSETS:
        return Asset(RENAMED_BINANCE_ASSETS[binance_name])

    name = BINANCE_TO_WORLD.get(binance_name, binance_name)
    return Asset(name)
{% endhighlight %}

and the [asset.py](https://github.com/rotkehlchenio/rotkehlchen/blob/07e014fe6121a92608638ef517350d03aaa78f34/rotkehlchen/assets/asset.py#L167) module itself has code to export from the Rotki format to all websites that need conversions:

{% highlight python linenos %}
def to_kraken(self) -> str:
    return WORLD_TO_KRAKEN[self.identifier]

def to_bittrex(self) -> str:
    return WORLD_TO_BITTREX.get(self.identifier, self.identifier)

def to_binance(self) -> str:
    return WORLD_TO_BINANCE.get(self.identifier, self.identifier)

def to_cryptocompare(self) -> str:
    cryptocompare_str = WORLD_TO_CRYPTOCOMPARE.get(self.identifier, self.identifier)
    # There is an asset which should not be queried in cryptocompare
    if cryptocompare_str is None:
        if self.identifier == 'MRS':
            raise UnsupportedAsset(
                'Marginless is not in cryptocompare. Asking for MRS '
                'will return MARScoin',
            )
        else:
            raise RuntimeError(
                f'Got {self.identifier} as a cryptocompare query but it is '
                f'documented as returning None and is not handled',
            )

    return cryptocompare_str
{% endhighlight %}


Whenever a new asset is added and a conversion needs to be included then it is appropriately plugged into any of the above modules.

# How to keep this all up to date?

There are two ways to keep all these mappings and the asset database up to date:

1. Automated CI testing. We have tests for every exchange (for example here is [binance](https://github.com/rotkehlchenio/rotkehlchen/blob/master/rotkehlchen/tests/test_binance.py#L195)) which will warn us when an exchange adds or changes something.

2. Our users will be warned when they are trying to interact with something that is not supported or when something breaks and as such are incentivized to [open issues](https://github.com/rotkehlchenio/rotkehlchen/issues/new) at the Rotki repo.

# Why not use other asset databases?

The reason is simple. That would be adding yet another conversion for us to maintain. For a project like Rotki, where certainty for what each symbol means needs to exist the only way to go is to have our own database as most of the currently known token databases out there are either ethereum specific or incomplete.

The only thing that could work is a standardized database of all crypto assets maintained by multiple different entities.

[ITSA](https://itsa.global/data/) is trying to do something similar, but the entire dataset seems to be for "members only" and the way they operate seems to be non-transparent. We believe that any such standardization effort should be open-source and use collaborative tools such as Github.

It would be really neat to see people collaborate on Github in the Rotki database of assets and conversions. If that happens, perhaps it can become a standard that other projects can also use.

# Conclusions

Working with multiple tokens across different websites is a hard problem. The Rotki approach took a lot of work to build but now that it's there maintaining it is not that hard. Our database is [open for everyone](https://github.com/rotkehlchenio/rotkehlchen/blob/master/rotkehlchen/data/all_assets.json) to use and contribute. If you want to edit information on a token or add a new one simply open a [pull request](https://github.com/rotkehlchenio/rotkehlchen/compare).

Finally remember that Rotki is opensource and self-funded software. If you appreciate what we are doing please consider [purchasing a premium subscription](https://rotkehlchen.io/products/) in order to help us keep developing and also enjoy premium only features such as analytics and priority support and feature requests.
