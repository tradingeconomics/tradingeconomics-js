'use strict'

const auth = require('./auth.js');
const func = require('./functions.js');
const fetch = require('node-fetch');

//setting global variables to be used outside this module
global.country = null;
global.indicator = null;
global.ticker = null;
global.init_date = null;

//This function builds the path to get the API request:
/****************************************************************
   parameters:
    country, indicator, ticker

   example:
    getForecasts(country = ['china', 'portugal']);
    getForecasts(indicator = 'gdp' );        
    getForecasts(ticker ='usurtot' );        
    getForecasts(country ='united states', indicator = 'interest rate');        

******************************************************************/

function getForecasts(){

    try {
        var Data = '';
        var url = '';
       
        if (country != null){    
            url = '/forecast/country/' + country;    
        }
        if (indicator != null){      
            url = '/forecast/indicator/' + indicator;    
        }
        if (ticker != null){     
            url = '/forecast/ticker/' + ticker;    
        }  
        if (country != null && indicator != null){     
            url = '/forecast/country/' + country + '/indicator/' + indicator;
        }

        if (country == null && indicator == null && ticker == null){
            throw new Error('At least one of the parameters must be set');
        }
        
        Data = url_base + url + '?c=' + apikey.replace(' ','%20');
        return func.makeTheRequest(Data)
        // return fetch(Data)
        // .then(func.handleErrors)   
        // .then(function(response) {    
        //     return response.json(); // process it inside the `then` when calling the function       
        // }).catch(function (err) {
        //     return err.message;
        // });
    } catch (error) {
        throw error
    }
   
  
}

//This function builds the path to get the API request:
/****************************************************************
   parameters:
    country, init_date

   example:
        getForecastsUpdates(country = ['mexico', 'portugal']);
        getForecastsUpdates(init_date = '2024-11-01' );
        getForecastsUpdates(country ='united states', init_date = '2024-11-01');       

******************************************************************/

function getForecastsUpdates(){

    try {
        let endpoint = '/forecast/updates';
        let options = '';
       
        if (country != null){    
            options += `&country=${country}`;    
        }
        if (init_date != null){ 
            try {
                let date = new Date(init_date);
                if (date == 'Invalid Date' ){
                    throw new Error('Incorrect init_date format, should be YYYY-MM-DD.');
                }
            }
            catch {
                throw new Error('Incorrect init_date format, should be YYYY-MM-DD.');
            }   
            options += `&init_date=${init_date}`;    
        }
        
        let Data = `${url_base}${endpoint}?c=${apikey.replace(' ','%20')}${options}`;
        return func.makeTheRequest(Data)

    } catch (error) {
        throw error
    }
   
  
}

module.exports.getForecasts = getForecasts;
module.exports.getForecastsUpdates = getForecastsUpdates;









