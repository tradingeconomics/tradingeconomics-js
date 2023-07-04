// DOCUMENTATION:
// http://docs.tradingeconomics.com

// Package Installation: npm install tradingeconomics
const te = require("tradingeconomics");

const WBExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    // Get the categories available to use on Worldbank
    const data = await te.getWorldBank();

    // Get world bank data by category, series code, country or by URL
    const data1 = await te.getWorldBank(category = "education");
    const data2 = await te.getWorldBank(series_code = "fr.inr.rinr");
    const data3 = await te.getWorldBank(country = "united states");
    const data4 = await te.getWorldBank(URL = "/united-states/real-interest-rate-percent-wb-data.html");

    // Get worldbank historical data
    const data5 = await te.getWorldBankHistorical(series_code = "usa.fr.inr.rinr");

    console.log(data); //Place one of the variables to test

  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

WBExample();
