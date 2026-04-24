// DOCUMENTATION:
// http://docs.tradingeconomics.com

// Package Installation: npm install tradingeconomics
const te = require("tradingeconomics");

const IndicatorsExample = async () => {
  try {
    // Login with your API key. Subscribe to a plan at https://tradingeconomics.com/api/pricing.aspx to get an API key.
    await te.login();

    //Get latest updates
    const data = await te.getLatestUpdates()

    //Get lastest updates by country or starting date (date format is yyyy/mm/dd)
    const data1 = await te.getLatestUpdates(start_date = '2018-01-01')
    const data2 = await te.getLatestUpdates(country = 'portugal')
    const data3 = await te.getLatestUpdates(country = 'portugal', start_date = '2018-01-01')

    //Get lastest updates by date (date format is yyyy/mm/dd) and time (hh:mm)
    const data4 = await te.getLatestUpdates(start_date = '2021-10-18', time='15:20')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

IndicatorsExample();
