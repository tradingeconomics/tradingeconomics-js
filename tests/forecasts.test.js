const te = require('tradingeconomics');
const fetch = require('node-fetch')

te.login('guest:guest');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
        sleep(3000)
        b = await fetch('https://api.tradingeconomics.com//forecast/updates?c=guest:guest');
        sleep(3000)
        c = await b.json();

        expect(a).toEqual(c);
        sleep(3000)
    }, 100000);

    test('get forecasts updates with country argument', async () => {
        a = await te.getForecastsUpdates(country = ['china', 'portugal']);
        sleep(3000)
        b = await fetch('https://api.tradingeconomics.com//forecast/updates?c=guest:guest&country=china,portugal');
        sleep(3000)
        c = await b.json();

        expect(a).toEqual(c);
        sleep(3000)
    }, 100000);

    test('get forecasts updates with country argument and date', async () => {
        a = await te.getForecastsUpdates(country = ['china', 'portugal'], init_date='2024-11-01');
        sleep(3000)
        b = await fetch('https://api.tradingeconomics.com//forecast/updates?c=guest:guest&country=china,portugal&date=2024-11-01');
        sleep(3000)
        c = await b.json();

        expect(a).toEqual(c);
        sleep(3000)
    }, 100000);
    
});
