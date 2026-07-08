## tradingeconomics
[![npm version](https://img.shields.io/npm/v/tradingeconomics.svg)](https://www.npmjs.com/package/tradingeconomics) ![Unit Tests](https://github.com/tradingeconomics/tradingeconomics-js/actions/workflows/tests.yml/badge.svg) 
#

## Description
The Trading Economics NPM package provides direct access to our data. It allows you to request millions of rows of economic historical data, to query our real-time economic calendar and to subscribe to updates. 

#


## QuickStart

```javascript
npm install tradingeconomics
```

#

## Usage
  
 - ### Import the package. 

```javascript
const te = require('tradingeconomics');
```
 -  ### Authentication
    - Login with your API key.
    - Subscribe to a plan at https://tradingeconomics.com/api/pricing.aspx to get an API key. 

```javascript
te.login();
```
or
```javascript
te.login('key:secret');
```

  - ### Authentication using environment variable
```javascript
apikey="key:secret" node app.js
```
 - ### Request data
    - Use the functions to get data from Markets, Indicators, Economic Calendar, Forecasts, World Bank, Comtrade, Federal Reserve, and even the latest news.
    - Know more about other methods on our [docs](https://docs.tradingeconomics.com)
```javascript
te.getCalendar().then((data) => console.log(data));
```

#

## Examples

https://github.com/tradingeconomics/tradingeconomics-js/tree/main/Examples

#

## Documentation
https://docs.tradingeconomics.com

#

## Learn More

https://tradingeconomics.com/analytics/api.aspx
