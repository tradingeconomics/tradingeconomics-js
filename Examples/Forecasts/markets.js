// DOCUMENTATION:
// http://docs.tradingeconomics.com

// Package Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const MarketsForecExample = async () => {
  try {
    // Login with your API key. Subscribe to a plan at https://tradingeconomics.com/api/pricing.aspx to get an API key.
    await te.login();

    // Get markets forecasts by category. Can be: index, currency, commodity and bond
    const data = await te.getMarketsForecast(category = 'index')

    // Get markets forecasts by symbol/symbols. For multiple symbols use: symbol = ['aapl:us', 'indu:ind']
    const data1 = await te.getMarketsForecast(symbol = 'aapl:us')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

MarketsForecExample();
