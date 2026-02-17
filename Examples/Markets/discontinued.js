const te = require('../../tradingeconomics');

// Login with your API key
te.login('API_KEY');

// Get all discontinued markets
te.getDiscontinuedMarkets().then(function(data){
  console.log(data);
});