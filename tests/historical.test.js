const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getHistoricalData', () => {

    beforeEach(() => {
        global.country = null;
        global.indicator = null;
        global.ticker = null;
        global.start_date = null;
        global.end_date = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getHistoricalData with country and indicator arguments', async () => {
        a = await te.getHistoricalData(country = 'china', indicator = 'gdp');
        b = await fetch('https://api.tradingeconomics.com/historical/country/china/indicator/gdp?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getHistoricalData with country, indicator and start_date arguments', async () => {
        a = await te.getHistoricalData(country = 'china', indicator = 'gdp', start_date = '2018-02-02');
        b = await fetch('https://api.tradingeconomics.com/historical/country/china/indicator/gdp/2018-02-02?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getHistoricalData with country, indicator, start_date and end_date arguments', async () => {
        a = await te.getHistoricalData(country = 'china', indicator = 'gdp', start_date = '2018-02-02', end_date = '2019-02-02');
        b = await fetch('https://api.tradingeconomics.com/historical/country/china/indicator/gdp/2018-02-02/2019-02-02?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getHistoricalData with ticker and start_date arguments', async () => {
        a = await te.getHistoricalData(ticker = 'usurtot', start_date = '2018-02-02');
        b = await fetch('https://api.tradingeconomics.com/historical/ticker/usurtot/2018-02-02?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

