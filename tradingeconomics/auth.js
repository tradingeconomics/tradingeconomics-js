"use strict";

global.url_base = "https://api.tradingeconomics.com";
global.apikey;

function login(apikey = null) {
  if (apikey == null) {
    if (process.env.apikey) {
      apikey = process.env.apikey;
    } else {
      apikey = "";
    }
  }

  if(apikey === ""){
    return console.log("Please subscribe to a plan at https://tradingeconomics.com/api/pricing.aspx to get an API key.")
  }

  if(apikey.indexOf(":") < 0){
    return console.log("Invalid credentials.")
  }
  
  global.apikey = apikey;
  // return console.log("Logged with " + apikey.split(':')[0]);
}

module.exports.login = login;
