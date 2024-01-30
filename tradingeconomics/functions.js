'use strict'
const fetch = require('node-fetch');

var checkDates = function(start_date, end_date){

    var start_date;
    var end_date;

    if(start_date > end_date)
        throw new Error("Start date cannot be bigger than end date");
    return;
  }

function checkTime (time){
    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);
    return isValid
}

function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}
function resetGlobalVariables() {

  try {
    
    global.country = null;
    global.indicator = null;
    global.ticker = null;
    global.group = null;
    global.category = null;
    global.category_group = null;
    global.components_symbol = null;
    global.counties = null;
    global.country1 = null;
    global.country2 = null;
    global.county = null;
    global.cross = null;
    global.end_date = null;
    global.group = null;
    global.historical = null;
    global.historical_symbol = null;
    global.id = null;
    global.importance = null;
    global.indicator = null;
    global.isin = null;
    global.limit = null;
    global.lists = null;
    global.marketsField = null;
    global.peers_symbol = null;
    global.search_term = null;
    global.series_code = null;
    global.start = null;
    global.start_date = null;
    global.state = null;
    global.symbol = null;
    global.term = null;
    global.ticker = null;
    global.time = null;
    global.type = null;
    global.utc = null;
    
  } catch (error) {
    throw error
  }
}

class DateError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DateError';
  }
}

function checkDatesValidity(baseLink, start_date = null, end_date = null) {
  if (start_date !== null && end_date === null) {
    try {
      if (isValid(start_date)) {
        throw new DateError('Incorrect initDate format, should be YYYY-MM-DD.');
      }
      // if (start_date > dayjs().format('YYYY-MM-DD')) {
      //   throw new DateError('Initial date out of range.');
      // }
      baseLink += '&d1=' + encodeURIComponent(start_date);
    } catch (err) {
      throw new DateError('Incorrect initDate format, should be YYYY-MM-DD.');
    }
  }

  else if (start_date !== null && end_date !== null) {
    try {
      if (isValid(start_date)) {
        throw new DateError('Incorrect initDate format, should be YYYY-MM-DD.');
      }
      if (isValid(end_date)) {
        throw new DateError('Incorrect endDate format, should be YYYY-MM-DD or MM-DD-YYYY.');
      }
      const startDateObj = new Date(start_date)// isValid(start_date);
      const endDateObj = new Date(end_date);
      if (startDateObj > endDateObj) {
          throw new DateError('Start date must be earlier than end date.');
      }

      // if (dayjs(end_date).diff(start_date, 'days') < 0) {
      //   throw new DateError('Invalid time period.');
      // }
      baseLink += '&d1=' + encodeURIComponent(start_date) + '&d2=' + encodeURIComponent(end_date);
    } catch (err) {
      throw new DateError(err.message);
    }
  }

  else if (start_date === null && end_date !== null) {
    throw new DateError('initDate value is missing');
  }
  
  return baseLink;
}

function isValid(date_text) {
  try {
    try {
      new Date(date_text + 'T00:00:00Z');
    } catch {
      new Date(date_text);
    }
  } catch {
    throw new DateError("Incorrect data format, should be YYYY-MM-DD");
  }
}

function makeTheRequest(Data) {
  return fetch(Data)
    .then(handleErrors)
    .then(resetGlobalVariables())   
    .then(function(response) {
        return response.json(); // process it inside the `then` when calling the function       
    }).catch(function (err) {
        throw err;
    });
}

module.exports.handleErrors = handleErrors;
module.exports.checkDates = checkDates;
module.exports.checkDatesValidity = checkDatesValidity;
module.exports.checkTime = checkTime;
module.exports.makeTheRequest = makeTheRequest;