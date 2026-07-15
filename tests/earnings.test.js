const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

// The earnings-revenues endpoint returns a very large dataset.
// Compare structure only to avoid timeout and live-data differences.
const compareStructure = (a, c) => {
    expect(Array.isArray(a)).toBe(true);
    expect(a.length).toBe(c.length);
    if (a.length > 0) {
        expect(Object.keys(a[0]).sort()).toEqual(Object.keys(c[0]).sort());
    }
};

describeIntegration('getEarnings', () => {

    beforeEach(() => {
        global.symbol = null;
        global.country = null;
        global.type = null;
        global.start_date = null;
        global.end_date = null;
        global.index = null;
        global.sector = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getEarnings with no arguments', async () => {
        a = await te.getEarnings();
        b = await fetch('https://api.tradingeconomics.com/earnings-revenues?c=');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);

    test('getEarnings with symbol argument', async () => {
        a = await te.getEarnings(symbol = 'CMCSA:US');
        b = await fetch('https://api.tradingeconomics.com/earnings-revenues/symbol/CMCSA%3AUS?c=');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);

    test('getEarnings with country argument', async () => {
        a = await te.getEarnings(country = 'united states');
        b = await fetch('https://api.tradingeconomics.com/earnings-revenues/country/united%20states?c=');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);

    test('getEarnings with symbol, start_date and end_date arguments', async () => {
        a = await te.getEarnings(symbol = 'FARM:US', start_date = '2018-02-01', end_date = '2018-03-01');
        b = await fetch('https://api.tradingeconomics.com/earnings-revenues/symbol/FARM%3AUS?c=&d1=2018-02-01&d2=2018-03-01');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);

});

