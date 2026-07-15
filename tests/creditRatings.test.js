const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getCreditRatings', () => {

    beforeEach(() => {
        global.country = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getCreditRatings with no arguments', async () => {
        a = await te.getCreditRatings();
        b = await fetch('https://api.tradingeconomics.com/credit-ratings?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getCreditRatings with country argument', async () => {
        a = await te.getCreditRatings(country = 'china');
        b = await fetch('https://api.tradingeconomics.com/credit-ratings/country/china?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getCreditRatings with multiple countries argument', async () => {
        a = await te.getCreditRatings(country = ['china', 'japan']);
        b = await fetch('https://api.tradingeconomics.com/credit-ratings/country/china%2Cjapan?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getHistoricalCreditRatings', () => {

    beforeEach(() => {
        global.country = null;
        global.start_date = null;
        global.end_date = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getHistoricalCreditRatings with no arguments', async () => {
        a = await te.getHistoricalCreditRatings();
        b = await fetch('https://api.tradingeconomics.com/credit-ratings/historical?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getHistoricalCreditRatings with country argument', async () => {
        a = await te.getHistoricalCreditRatings(country = 'china');
        b = await fetch('https://api.tradingeconomics.com/credit-ratings/historical/country/china?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getHistoricalCreditRatings with multiple countries, start_date and end_date arguments', async () => {
        a = await te.getHistoricalCreditRatings(country = ['china', 'japan'], start_date = '2018-01-01', end_date = '2019-03-01');
        b = await fetch('https://api.tradingeconomics.com/credit-ratings/historical/country/china%2Cjapan?c=&d1=2018-01-01&d2=2019-03-01');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

