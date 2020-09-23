# JSSP-Experian-Business-Search

## JSSP Broker for Experian Business Search
Sample K2 JSSP Broker connecting K2 to Experian services based on **Experian Business Search API** (/businessinformation/businesses/v1/search). This is only a sample broker and is not supported by the product team.

***Use this code at your own risk, Happy Coding.***

## Features
This broker currently supports the followings:

### OAuth 2.0
- Experian API’s use OAuth 2.0 protocol for authentication and authorization. Experian API’s supports the OAuth 2.0 two-legged authentication code flow.

Additional Information:  [API Reference](https://developer.experian.com/tutorial/oauth-20-tutorial)

### Business Search
- The Business Search API allows you to leverage Experian's powerful search match technology to find information on a business. The Search API presents a list of business to the business you are searching for, ranked by match reliability code. Each business returned in the list will include the legal name, address, and phone number of the business Experian has on file, and optionally business geocode data. Additionally, several depth indicators show the businesses trade line activity and the availability of other key data, each of which help provide confidence in having the best matching business based on your search input.

Additional Information:  [API Reference](https://developer.experian.com/businesses/apis/post/v1/search)

### Commercial Scores
- The Commercial Scores API allows you to request Experian's Intelliscore Plus, our premier business credit score model, and our Financial Stability Risk score to be delivered directly into your application. Each score is returned with the top four score factors and with score trends to help you assess whether the score was stable, improved, fluctuated, or declined over the previous 12 months.

Additional Information:  [API Reference](https://developer.experian.com/businesses/apis/post/v1/scores)

## What is required to create a K2 Service Instance:
Visit the [Experian Quick Start Guide](https://developer.experian.com/tutorial/quick-start-guide)

- Step 1: Create an account
- Step 2: Register your first application

## To deploy the broker to a K2 Nexus platform
To deploy this broker you can use the bundled JS file under dist folder. Follow the [product documentation here](https://help.k2.com/onlinehelp/platform/userguide/current/default.htm#../Subsystems/Default/Content/Extend/JS-Broker/JSSPRegister.htm%3FTocPath%3DDevelop%7CExtending%2520the%2520K2%2520Nexus%2520Platform%7CCustom%2520Service%2520Types%2520with%2520the%2520JavaScript%2520Service%2520Provider%2520(JSSP)%7C_____8) to deploy the bundled js file to your K2 Nexus instance

## To modify this broker for your use cases:
1. Download this repository
2. Run "npm install"
3. Modify the code in index.ts under the src folder
4. Then run "npm run build" to generate a new bundled JS file for deployment.
