const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getFred', () => {

    beforeEach(() => {
        global.counties = null;
        global.country = null;
        global.symbol = null;
        global.county = null;
        global.state = null;
        global.URL = null;
        global.historical_symbol = null;
        global.start_date = null;
        global.end_date = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getFred with no arguments', async () => {
        a = await te.getFred();
        b = await fetch('https://api.tradingeconomics.com/fred/states?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getFred with counties argument', async () => {
        a = await te.getFred(counties = 'arkansas');
        b = await fetch('https://api.tradingeconomics.com/fred/counties/arkansas?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getFred with country argument', async () => {
        a = await te.getFred(country = 'united states');
        b = await fetch('https://api.tradingeconomics.com/fred/snapshot/country/united states?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getFred with symbol argument', async () => {
        a = await te.getFred(symbol = 'ALLMARGATTN');
        b = await fetch('https://api.tradingeconomics.com/fred/snapshot/symbol/ALLMARGATTN?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getFred with state argument', async () => {
        a = await te.getFred(state = 'tennessee');
        b = await fetch('https://api.tradingeconomics.com/fred/snapshot/state/tennessee?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getFred with county argument', async () => {
        a = await te.getFred(county = 'pike');
        b = await fetch('https://api.tradingeconomics.com/fred/snapshot/county/pike?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getFred with historical_symbol argument', async () => {
        a = await te.getFred(historical_symbol = 'RACEDISPARITY005007');
        b = await fetch('https://api.tradingeconomics.com/fred/historical/RACEDISPARITY005007?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getFred with historical_symbol and start_date arguments', async () => {
        a = await te.getFred(historical_symbol = 'RACEDISPARITY005007', start_date = '2017-05-01');
        b = await fetch('https://api.tradingeconomics.com/fred/historical/RACEDISPARITY005007?c=&d1=2017-05-01');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getFred with historical_symbol, start_date and end_date arguments', async () => {
        a = await te.getFred(historical_symbol = 'RACEDISPARITY005007', start_date = '2017-05-01', end_date = '2025-12-31');
        b = await fetch('https://api.tradingeconomics.com/fred/historical/RACEDISPARITY005007?c=&d1=2017-05-01&d2=2025-12-31');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

