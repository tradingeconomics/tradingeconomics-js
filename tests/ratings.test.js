const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getRatings', () => {

    beforeEach(() => {
        global.country = null;
        global.historical = null;
        global.start_date = null;
        global.end_date = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getRatings with no arguments', async () => {
        a = await te.getRatings();
        b = await fetch('https://api.tradingeconomics.com/ratings?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getRatings with country argument', async () => {
        a = await te.getRatings(country = 'china');
        b = await fetch('https://api.tradingeconomics.com/ratings/china?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getRatings with historical argument', async () => {
        a = await te.getRatings(historical = 'united states');
        b = await fetch('https://api.tradingeconomics.com/ratings/historical/united states?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getRatings with historical and start_date arguments', async () => {
        a = await te.getRatings(historical = 'united states', start_date = '2020-01-01');
        b = await fetch('https://api.tradingeconomics.com/ratings/historical/united states/2020-01-01?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getRatings with historical, start_date and end_date arguments', async () => {
        a = await te.getRatings(historical = 'united states', start_date = '2020-01-01', end_date = '2023-01-01');
        b = await fetch('https://api.tradingeconomics.com/ratings/historical/united states/2020-01-01/2023-01-01?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

