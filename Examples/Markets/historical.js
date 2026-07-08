// DOCUMENTATION:
// http://docs.tradingeconomics.com

// Package Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const MarketsHistExample = async () => {
  try {
    // Login with your API key. Subscribe to a plan at https://tradingeconomics.com/api/pricing.aspx to get an API key.
    await te.login();

    //Get Historical data from markets by symbol, you can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)
    const data = await te.getHistoricalMarkets(symbol = ['aapl:us','gac:com'])
    const data1 = await te.getHistoricalMarkets(symbol = 'aapl:us',start_date = '2017-08-01',end_date = '2017-08-08')
    

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

MarketsHistExample();


