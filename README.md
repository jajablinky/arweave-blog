# Arweave-Blog-Tool

A simple tool for fetching blogs from mirror.xyz via their graphQL endpoint, using the power of Arweave.

## Getting Started

These instructions will guide you on how to use this tool to fetch blogs from mirror.xyz.

### Prerequisites

- React
- Javascript
- No wallets required

### Installing

1. Clone this repository using `git clone https://github.com/jajablinky/arweave-blogs.git`
2. Install the dependencies by running `yarn install`
3. Change 'contributor' to the eth address you want to pull from

### Usage

1. Run `yarn dev` to start
2. Run http://localhost:5173/

## Built With

- [Arweave QUERY](https://arweave.net/graphql) - API query endpoint
- [Arweave SDK](https://github.com/ArweaveTeam/arweave-js) - Using transactionID to retrieve data of particular transactions.
- [Moment.js](https://momentjs.com/) - Handling time to find out when someone has posted

## Authors

- [Geoffrey Millar (jajablinky)](https://github.com/jajablinky)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
