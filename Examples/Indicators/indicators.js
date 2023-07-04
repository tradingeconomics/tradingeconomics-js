// DOCUMENTATION:
// http://docs.tradingeconomics.com

// Package Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const IndicatorsExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    
    //Get a list of all countries
    const data = await te.getAllCountries()

    // Get a list of all indicators
    const data1 = await te.getIndicatorData()

    // Get an indicators list by country/countries, you can pass group to get more specific data
    const data2 = await te.getIndicatorData(country = ['mexico', 'sweden'])
    const data3 = await te.getIndicatorData(country = 'mexico', group = 'gdp')

    // Get specific indicator for all countries
    const data4 = await te.getIndicatorData(indicator = 'gdp')

    // Get a list of indicators by ticker
    const data5 = await te.getIndicatorData(ticker = 'usurtot')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

IndicatorsExample();
