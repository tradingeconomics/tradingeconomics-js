const te = require('tradingeconomics');
const fetch = require('node-fetch')

te.login('guest:guest');


describe('getForecastsUpdates', () => {
    beforeEach(() => {

        global.country = null;
        global.indicator = null;
        global.ticker = null;
        global.init_date = null;

        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    });

    test('get forecasts updates with no arguments', async () => {
        a = await te.getForecastsUpdates();
        b = await fetch('https://api.tradingeconomics.com//forecast/updates?c=guest:guest');
        c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('get forecasts updates with country argument', async () => {
        a = await te.getForecastsUpdates(country = ['china', 'portugal']);
        b = await fetch('https://api.tradingeconomics.com//forecast/updates?c=guest:guest&country=china,portugal');
        c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('get forecasts updates with country argument and date', async () => {
        a = await te.getForecastsUpdates(country = ['china', 'portugal'], init_date='2024-11-01');
        b = await fetch('https://api.tradingeconomics.com//forecast/updates?c=guest:guest&country=china,portugal&date=2024-11-01');
        c = await b.json();

        expect(a).toEqual(c);
    }, 10000);
    
});
