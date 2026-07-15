const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getSymbology', () => {

    beforeEach(() => {
        global.symbol = null;
        global.ticker = null;
        global.isin = null;
        global.country = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getSymbology with symbol argument', async () => {
        a = await te.getSymbology(symbol = 'aapl:us');
        b = await fetch('https://api.tradingeconomics.com/markets/symbology/symbol/aapl:us?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getSymbology with ticker argument', async () => {
        a = await te.getSymbology(ticker = 'aapl');
        b = await fetch('https://api.tradingeconomics.com/markets/symbology/ticker/aapl?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getSymbology with isin argument', async () => {
        a = await te.getSymbology(isin = 'US0378331005');
        b = await fetch('https://api.tradingeconomics.com/markets/symbology/isin/us0378331005?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

