// DOCUMENTATION:
// http://docs.tradingeconomics.com

// Package Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const ComtradeExample = async () => {
  try {
    // Login with your API key. Subscribe to a plan at https://tradingeconomics.com/api/pricing.aspx to get an API key.
    await te.login();

    // Get detailed information about Comtrade. Can be: categories, updates or countries
    const data = await te.getComtrade(category = 'categories')

    // Get data about trading of one country or between two countries
    const data1 = await te.getComtrade(country = 'china')
    const data2 = await te.getComtrade(country = 'united states', country1 = 'china')

    // Get information about one country or between two countries with a specific type of trade
    const data3 = await te.getCmtCountryFilterByType(country1 = 'Portugal', country2 = 'Spain', type = 'import')
    const data4 = await te.getCmtCountryFilterByType(country1 = 'United States', type = 'export')

    // Get information about one country or between two countries with a specific type of trade
    const data5 = await te.getCmtCountryByCategory(country = 'United States', type = 'export', category = 'live animals')

    // Get Total trade information by type and country. Type cna be Import or Export
    const data6 = await te.getComtradeTotalByType(country = 'Portugal', type = 'import')

   // Get historical data by symbol
   const data7 = await te.getComtrade(symbol = 'PRTESP24031')

  //Get total imports by category
  const data8 = await te.getComtradeTotalByType(country = 'Portugal', type = 'import')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

ComtradeExample();
