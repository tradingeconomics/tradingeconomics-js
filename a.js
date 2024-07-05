const te = require('./tradingeconomics');
te.login();

data = te.getMarketsByCountry(country = 'nigeria').then(function(data){
    console.log(data)     
  });
  