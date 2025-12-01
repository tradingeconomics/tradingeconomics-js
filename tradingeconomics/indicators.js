"use strict";

const auth = require("./auth.js");
const func = require("./functions.js");
const fetch = require("node-fetch");

//setting global variables to be used outside this module
global.country = null;
global.indicator = null;
global.ticker = null;
global.group = null;
global.calendar = null;
global.start_date = null;
global.date = null;

//This function builds the path to get the API request:
/****************************************************************  
   WITHOUT PARAMETERS A LIST OF ALL INDICATORS WILL BE PROVIDED
   parameters:
    String or list: country, indicator, ticker

   example:

        my_data = getIndicatorData();
        my_data = getIndicatorData(country = ['china', 'portugal']);
        my_data = getIndicatorData(indicator ='gdp');        
        my_data = getIndicatorData(ticker ='usurtot');
        my_data = getIndicatorData(country ='china', group = 'housing');             
        my_data = getIndicatorData(calendar = 1);

*******************************************************************/
function getIndicatorData() {
  try {
    var url = "";
    var Data = "";

    if (country != null) {
      url = "/country/" + country;
    }
    if (indicator != null && country == null) {
      url = "/country/all/" + indicator;
    }
    if (ticker != null) {
      url = "/country/ticker/" + ticker;
    }
    if (country != null && group != null) {
      url = "/country/" + country + "?c=" + apikey + "&group=" + group;
    }
    if (country === null && indicator === null && ticker === null) {
      url = "/indicators";
    }

    if (url.includes(group)) {
      Data = url_base + url.replace(" ", "%20");
    } else {
      Data = url_base + url + "?c=" + apikey.replace(" ", "%20");
    }

    if (calendar != null) {
      Data = url_base + "/indicators?c=" + apikey + "&calendar=" + calendar;
      if (country != null) Data = Data + "&country=" + country;
    }
    // console.log(Data)

    return func.makeTheRequest(Data);
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

//This function builds the path to get the API request:
/****************************************************************  
   WITHOUT PARAMETERS A LIST OF DISCONTINUED SERIES FOR ALL COUNTRIES WILL BE PROVIDED
   
   parameters:
    String or list: country

   example:

        my_data = getDiscontinuedIndicators();
        my_data = getDiscontinuedIndicators(country= 'united states')
        my_data = getDiscontinuedIndicators(country = ['china', 'portugal']);
    
*******************************************************************/
function getDiscontinuedIndicators(country = null) {
  try {
    var d = {
      url_base: "https://api.tradingeconomics.com/country",
      country: "/all",
      discontinued_tag: "/discontinued",
      key: `?c=${apikey}`,
      output_type: "",
    };

    var data = "";

    if (country != null) {
      d.country = `/${country}`;
    }
    data = `${d.url_base}${d.country}${d.discontinued_tag}${d.key}`;

    // return fetch(data.replace(' ', '%20'))
    // .then(func.handleErrors)
    // .then(function(response) {
    //     return response.json(); // process it inside the `then` when calling the function
    // }).catch(function (err) {
    //     return err.message;
    // });
    return func.makeTheRequest(data);
  } catch (error) {
    throw error;
  }
}

/****************************************************************  
   Example:

        my_data = getHistoricalUpdates();

*******************************************************************/

function getHistoricalUpdates() {
  try {
    var url = "/historical/updates";
    var Data = "";

    Data = url_base + url + "?c=" + apikey.replace(" ", "%20");

    // return fetch(Data)
    // .then(func.handleErrors)
    // .then(function(response) {
    //     return response.json(); // process it inside the `then` when calling the function
    // }).catch(function (err) {
    //     return err.message;
    // });
    return func.makeTheRequest(Data);
  } catch (error) {
    throw error;
  }
}

/****************************************************************  
   WITHOUT PARAMETERS A LIST OF THE LATEST CREDIT RATING UPDATES WILL BE PROVIDED

   Example:
        my_data = getCreditRatingsUpdates();

*******************************************************************/
function getCreditRatingsUpdates() {
  try {
    var url = "/credit-ratings/updates";
    var Data = "";

    Data = url_base + url + "?c=" + apikey.replace(" ", "%20");

    return func.makeTheRequest(Data);
  } catch (error) {
    throw error;
  }
}

/****************************************************************  
   Example:
        my_data = getHistoricalLatest(country='united states');
        my_data = getHistoricalLatest(country=['united states', 'brazil']);
        my_data = getHistoricalLatest(country=['united states', 'brazil'], date='2025-08-27');
        my_data = getHistoricalLatest();

*******************************************************************/

function getHistoricalLatest() {
  try {
    var url = "/historical/latest";
    var Data = "";

    Data = url_base + url + "?c=" + apikey.replace(" ", "%20");

    if (date != null) {
      Data += "&date=" + date;
    }

    if (country != null) {
      Data += "&country=" + country;
    }

    return func.makeTheRequest(Data);
  } catch (error) {
    throw error;
  }
}

/****************************************************************  
   A LIST OF ALL COUNTRIES WILL BE PROVIDED
   parameters:
    
   example:

        countries = getAllCountries();
                    
*******************************************************************/
function getAllCountries() {
  try {
    var url_base = "https://api.tradingeconomics.com/country";

    var url = url_base + "?c=" + apikey.replace(" ", "%20");

    // return fetch(url)
    // .then(func.handleErrors)
    // .then(function(response) {
    //     return response.json(); // process it inside the `then` when calling the function
    // }).catch(function (err) {
    //     return err.message;
    // });
    return func.makeTheRequest(url);
  } catch (error) {
    throw error;
  }
}

//This function builds the path to get the API request:
/****************************************************************  
   WITHOUT PARAMETERS A LIST OF ALL RECENT INDICATOR CHANGES WILL BE PROVIDED
   parameters:
    String or list: start_date

   example:

        my_data = getIndicatorChanges();
        my_data = getIndicatorChanges(start_date = '2024-10-01']);

*******************************************************************/
function getIndicatorChanges() {
  try {
    var url = "https://api.tradingeconomics.com/changes";

    if (start_date != null) {
      url += "/" + start_date;
    }

    url = url + "?c=" + apikey.replace(" ", "%20");
    return func.makeTheRequest(url);
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

// module.exports.getAllCountries = getAllCountries;
// module.exports.getIndicatorData = getIndicatorData;
// module.exports.getDiscontinuedIndicators = getDiscontinuedIndicators
// module.exports.getHistoricalUpdates = getHistoricalUpdates
// module.exports.getHistoricalLatest = getHistoricalLatest

module.exports = {
  getAllCountries,
  getIndicatorData,
  getDiscontinuedIndicators,
  getHistoricalUpdates,
  getHistoricalLatest,
  getCreditRatingsUpdates,
};
