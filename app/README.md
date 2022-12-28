# Climate Score
Climate Score is website to calculate the **environmental impact** of living in a certain house, and **offer potential improvements**.

A **score** will be given out of **one hundred**, with a lower score indicating a larger negative enviornmental impact, while a higher score indicates a lower impact.

The current sources for data include: 
* [WattBuy](https://wattbuy.readme.io/) 
* [WalkScore](https://www.walkscore.com/)
* more coming soon!



## Installation
First create a secrets folder including an api_keys.ts file with api keys for WalkScore, PositionStack, and WattBuy. 

```bash
# install the backend
npm install

# install the client
npm run client-install
```



## Running the app
```bash
# only run the client
npm run serve:client

# only run the server
npm run serve:server

# run both the client and server
npm run dev
```