# climate-score
A website to calculate the environmental impact of living in a certain house, and offer potential improvements.

The score will be give out of one hundred, with a lower score indicating a larger negative enviornmental impact, while a higher score indicates a lower impact.
Current sources include: https://wattbuy.readme.io/ and https://www.walkscore.com/ more will be added in the future.

Uses yarn and npm as package managers, only because this is my first time using yarn, so I want to make sure any bugs are problems with my code, not yarn.
Once this is finished, I'll remobe npm.
 
To start, first create a secrets folder including an api_keys.ts file with api keys for WalkScore, PositionStack, and WattBuy. 

Then install run using:

        npm install yarn --global
        
Then run:

        yarn build
     
and

        yarn run dev
