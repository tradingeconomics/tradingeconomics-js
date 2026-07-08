// DOCUMENTATION:
// http://docs.tradingeconomics.com

// Package Installation: npm install tradingeconomics
const te = require("tradingeconomics");

const SearchExample = async () => {
  try {
    // Login with your API key. Subscribe to a plan at https://tradingeconomics.com/api/pricing.aspx to get an API key.
    await te.login();

    // Get the categories available to use on search
    const data = await te.getSearch();

    // Search for a term or keyword in a category
    const data1 = await te.getSearch(term = "japan", category = "markets");

    // Search for a term or keyword in all categories available
    const data2 = await te.getSearch(term = "gold");

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

SearchExample();
