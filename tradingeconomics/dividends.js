const func = require('./functions.js');


global.symbol = null;
global.start_date = null;
global.end_date = null;
/******************************************************************************************* 
 * ------------------------ Dividends -----------------------------------------------------*
 parameters:
    String or list: symbol/s
    String: start_date, end_date

    example:
    getDividends();
    getDividends(start_date = '2018-02-02');
    getDividends(symbol ='CMCSA:US', start_date = '2018-02-02');
    getDividends(symbol ='FARM:US', start_date = '2018-02-01', end_date = '2018-03-01');

*********************************************************************************************/

function getDividends(){
    try {
        let linkAPI = 'https://api.tradingeconomics.com/dividends/';

        if (symbol) {
          linkAPI += 'symbol/';
          if (typeof symbol !== 'string') {
            linkAPI += encodeURIComponent(symbol.join(','));
          } else {
            linkAPI += encodeURIComponent(symbol);
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

module.exports.getDividends = getDividends;