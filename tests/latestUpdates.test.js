const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

// Latest updates are a live feed — items change and reorder between calls.
// Compare structure only (same length, same keys).
const compareStructure = (a, c) => {
    expect(Array.isArray(a)).toBe(true);
    expect(a.length).toBe(c.length);
    if (a.length > 0) {
        expect(Object.keys(a[0]).sort()).toEqual(Object.keys(c[0]).sort());
    }
};

describeIntegration('getLatestUpdates', () => {

    beforeEach(() => {
        global.start_date = null;
        global.country = null;
        global.time = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getLatestUpdates with no arguments', async () => {
        a = await te.getLatestUpdates();
        b = await fetch('https://api.tradingeconomics.com/updates?c=');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);

    test('getLatestUpdates with start_date argument', async () => {
        a = await te.getLatestUpdates(start_date = '2018-02-02');
        b = await fetch('https://api.tradingeconomics.com/updates/2018-02-02?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getLatestUpdates with country argument', async () => {
        a = await te.getLatestUpdates(country = 'china');
        b = await fetch('https://api.tradingeconomics.com/updates/country/china?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getLatestUpdates with start_date and country arguments', async () => {
        a = await te.getLatestUpdates(start_date = '2018-02-02', country = 'china');
        b = await fetch('https://api.tradingeconomics.com/updates/country/china/2018-02-02?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getLatestUpdates with start_date and time arguments', async () => {
        a = await te.getLatestUpdates(start_date = '2021-10-18', time = '15:20');
        b = await fetch('https://api.tradingeconomics.com/updates/2021-10-18?c=&time=15:20');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);

});

