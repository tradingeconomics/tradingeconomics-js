const func = require('./functions.js');

global.country = null;
global.start_date = null;
global.end_date = null;

//This function builds the path to get the API request:
/****************************************************************************************************************************  
  WITHOUT PARAMETERS A LIST OF ALL CREDIT RATINGS WILL BE PROVIDED BUT NOT WITH KEY guest:guest
  parameters:
    String or list: country

  example:
    getCreditRatings();
    getCreditRatings(country ='china');
    getCreditRatings(country =['china', 'japan']);           
    
******************************************************************************************************************************/

function getCreditRatings(){
    
    try {
     let url = '/credit-ratings';
     let Data = '';
      
     if (country != null){    
        if (typeof country !== 'string') {
            url += '/country/' + encodeURIComponent(country.join(','));
        }
        else {
            url += '/country/' + encodeURIComponent(country);
        }
     }

     
     Data = url_base + url + '?c=' + apikey.replace (' ','%20');
     return func.makeTheRequest(Data)
      } 
      catch (error) {
     throw error
      }
     
}


//This function builds the path to get the API request:
/****************************************************************************************************************************  
  WITHOUT PARAMETERS A LIST OF HISTORICAL CREDIT RATINGS WILL BE PROVIDED
  parameters:
    String or list: country

  example:
    getHistoricalCreditRatings();
    getHistoricalCreditRatings(country ='china');
    getHistoricalCreditRatings(country =['china', 'japan'], start_date = '2018-01-01', end_date = '2019-03-01');
    
******************************************************************************************************************************/

function getHistoricalCreditRatings(){

    try{
        let url = '/credit-ratings/historical';
        let Data = '';

        if (country != null){    
            if (typeof country !== 'string') {
                url += '/country/' + encodeURIComponent(country.join(','));
            }
            else {
                url += '/country/' + encodeURIComponent(country);
            }
        }

        try {
            url += '?c=' + apikey;
            url = func.checkDatesValidity(url, start_date, end_date); 
          } 
        catch (err) {
            if (err instanceof TypeError) {
              throw new LoginError('You need to do login before making any request');
            } else {
              throw err;
            }
        }

        Data = url_base + url 
        return func.makeTheRequest(Data)

    }
    catch (error){
        throw error
    }
}

module.exports.getCreditRatings = getCreditRatings;
module.exports.getHistoricalCreditRatings = getHistoricalCreditRatings;