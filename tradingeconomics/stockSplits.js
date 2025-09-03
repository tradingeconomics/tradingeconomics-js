const func = require('./functions.js');


global.ticker = null;
global.country = null;
global.start_date = null;
global.end_date = null;
/******************************************************************************************* 
 * ------------------------ Dividends -----------------------------------------------------*
 parameters:
    String or list: symbol/s
    String or list: country/ies
    String: start_date, end_date

    example:
    getStockSplits();
    getStockSplits(start_date = '2018-02-02');
    getStockSplits(ticker ='CMCSA:US', start_date = '2023-09-01');
    getStockSplits(country =['United States'], start_date = '2023-09-01', end_date = '2023-12-01');

*********************************************************************************************/

function getStockSplits(){
    try {
        let linkAPI = 'https://api.tradingeconomics.com/splits/';

        if (ticker && country) {
            throw new Error('You cannot use both ticker and country parameters together');
        }

        if (ticker) {
          linkAPI += 'ticker/';
          if (typeof ticker !== 'string') {
            linkAPI += encodeURIComponent(ticker.join(','));
          } else {
            linkAPI += encodeURIComponent(ticker);
          }
        }
        else if (country) {
            linkAPI += 'country/';
            if (typeof country !== 'string') {
                linkAPI += encodeURIComponent(country.join(','));
            } else {
                linkAPI += encodeURIComponent(country);
            }
        }

        try {
            linkAPI += '?c=' + apikey;
            linkAPI = func.checkDatesValidity(linkAPI, start_date, end_date); 
          } 
        catch (err) {
            if (err instanceof TypeError) {
              throw new LoginError('You need to do login before making any request');
            } else {
              throw err;
            }
        }

        return func.makeTheRequest(linkAPI)
    }
    catch (error) {
        throw error
    }
}

module.exports.getStockSplits = getStockSplits;