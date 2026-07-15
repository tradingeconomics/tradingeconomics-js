const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

// For live market endpoints (prices update every second), compare structure only.
// Verifies the method hits the correct URL and returns the right data shape.
const compareStructure = (a, c) => {
    expect(Array.isArray(a)).toBe(true);
    expect(a.length).toBe(c.length);
    if (a.length > 0) {
        expect(Object.keys(a[0]).sort()).toEqual(Object.keys(c[0]).sort());
    }
};

// getMarketSnap renames `unit` -> `Unit` and `frequency` -> `Frequency`.
// Apply the same transform to the direct-fetch response before comparing.
const transformMarketData = (data) => data.map(obj => {
    obj.Unit = obj.unit;
    obj.Frequency = obj.frequency;
    delete obj.unit;
    delete obj.frequency;
    return obj;
});

describeIntegration('getMarketSnap', () => {

    beforeEach(() => {
        global.country = null;
        global.symbol = null;
        global.marketsField = null;
        global.peers_symbol = null;
        global.components_symbol = null;
        global.search_term = null;
        global.category = null;
        global.cross = null;
        global.type = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getMarketSnap with marketsField=index', async () => {
        a = await te.getMarketSnap(marketsField = 'index');
        b = await fetch('https://api.tradingeconomics.com/markets/index?c=');
        c = transformMarketData(await b.json());
        compareStructure(a, c);
    }, 60000);

    test('getMarketSnap with marketsField=commodities', async () => {
        a = await te.getMarketSnap(marketsField = 'commodities');
        b = await fetch('https://api.tradingeconomics.com/markets/commodities?c=');
        c = transformMarketData(await b.json());
        compareStructure(a, c);
    }, 60000);

    test('getMarketSnap with marketsField=currency', async () => {
        a = await te.getMarketSnap(marketsField = 'currency');
        b = await fetch('https://api.tradingeconomics.com/markets/currency?c=');
        c = transformMarketData(await b.json());
        compareStructure(a, c);
    }, 60000);

    test('getMarketSnap with marketsField=bond', async () => {
        a = await te.getMarketSnap(marketsField = 'bond');
        b = await fetch('https://api.tradingeconomics.com/markets/bond?c=');
        c = transformMarketData(await b.json());
        compareStructure(a, c);
    }, 60000);

    test('getMarketSnap with marketsField=crypto', async () => {
        a = await te.getMarketSnap(marketsField = 'crypto');
        b = await fetch('https://api.tradingeconomics.com/markets/crypto?c=');
        c = transformMarketData(await b.json());
        compareStructure(a, c);
    }, 60000);

    test('getMarketSnap with symbol argument', async () => {
        a = await te.getMarketSnap(symbol = 'aapl:us');
        b = await fetch('https://api.tradingeconomics.com/markets/symbol/aapl:us?c=');
        c = transformMarketData(await b.json());
        compareStructure(a, c);
    }, 60000);

    test('getMarketSnap with peers_symbol argument', async () => {
        a = await te.getMarketSnap(peers_symbol = 'aapl:us');
        b = await fetch('https://api.tradingeconomics.com/markets/peers/aapl:us?c=');
        c = transformMarketData(await b.json());
        compareStructure(a, c);
    }, 60000);

    test('getMarketSnap with components_symbol argument', async () => {
        a = await te.getMarketSnap(components_symbol = 'psi20:ind');
        b = await fetch('https://api.tradingeconomics.com/markets/components/psi20:ind?c=');
        c = transformMarketData(await b.json());
        compareStructure(a, c);
    }, 60000);

    test('getMarketSnap with search_term argument', async () => {
        a = await te.getMarketSnap(search_term = 'japan');
        b = await fetch('https://api.tradingeconomics.com/markets/search/japan?c=');
        c = transformMarketData(await b.json());
        compareStructure(a, c);
    }, 60000);

    test('getMarketSnap with marketsField=bond and type argument', async () => {
        a = await te.getMarketSnap(marketsField = 'bond', type = '5Y');
        b = await fetch('https://api.tradingeconomics.com/markets/bond?c=&type=5Y');
        c = transformMarketData(await b.json());
        compareStructure(a, c);
    }, 60000);

    test('getMarketSnap with marketsField=bond and country argument', async () => {
        a = await te.getMarketSnap(marketsField = 'bond', country = 'Japan');
        b = await fetch('https://api.tradingeconomics.com/markets/bond?c=&country=Japan');
        c = transformMarketData(await b.json());
        compareStructure(a, c);
    }, 60000);

    test('getMarketSnap with cross argument', async () => {
        a = await te.getMarketSnap(cross = 'eur');
        b = await fetch('https://api.tradingeconomics.com/markets/currency/?c=&cross=eur');
        c = transformMarketData(await b.json());
        compareStructure(a, c);
    }, 60000);

});

describeIntegration('getMarketsByCountry', () => {

    beforeEach(() => {
        global.country = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getMarketsByCountry with country argument', async () => {
        a = await te.getMarketsByCountry(country = 'united states');
        b = await fetch('https://api.tradingeconomics.com/markets/country/united states?c=');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);

});

describeIntegration('getDiscontinuedMarkets', () => {

    beforeEach(() => {
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getDiscontinuedMarkets with no arguments', async () => {
        a = await te.getDiscontinuedMarkets();
        b = await fetch('https://api.tradingeconomics.com/markets/discontinued/?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getMarketsIntraday', () => {

    beforeEach(() => {
        global.symbol = null;
        global.start_date = null;
        global.end_date = null;
        global.agr = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getMarketsIntraday with symbol argument', async () => {
        a = await te.getMarketsIntraday(symbol = 'aapl:us');
        b = await fetch('https://api.tradingeconomics.com/markets/intraday/aapl:us?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getMarketsIntraday with symbol and start_date arguments', async () => {
        a = await te.getMarketsIntraday(symbol = 'aapl:us', start_date = '2018-02-02');
        b = await fetch('https://api.tradingeconomics.com/markets/intraday/aapl:us?d1=2018-02-02&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getMarketsIntraday with symbol, start_date and end_date arguments', async () => {
        a = await te.getMarketsIntraday(symbol = 'indu:ind', start_date = '2018-02-01', end_date = '2025-03-01');
        b = await fetch('https://api.tradingeconomics.com/markets/intraday/indu:ind?d1=2018-02-01&d2=2025-03-01&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getMarketsIntraday with symbol, agr, start_date and end_date arguments', async () => {
        a = await te.getMarketsIntraday(symbol = 'indu:ind', agr = '10m', start_date = '2018-02-01', end_date = '2025-02-02');
        b = await fetch('https://api.tradingeconomics.com/markets/intraday/indu:ind?agr=10m&d1=2018-02-01&d2=2025-02-02&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getHistoricalMarkets', () => {

    beforeEach(() => {
        global.symbol = null;
        global.start_date = null;
        global.end_date = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getHistoricalMarkets with symbol argument', async () => {
        a = await te.getHistoricalMarkets(symbol = 'aapl:us');
        b = await fetch('https://api.tradingeconomics.com/markets/historical/aapl:us?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getHistoricalMarkets with symbol and start_date arguments', async () => {
        a = await te.getHistoricalMarkets(symbol = 'aapl:us', start_date = '2018-02-02');
        b = await fetch('https://api.tradingeconomics.com/markets/historical/aapl:us?d1=2018-02-02&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getHistoricalMarkets with symbol, start_date and end_date arguments', async () => {
        a = await te.getHistoricalMarkets(symbol = 'indu:ind', start_date = '2018-02-02', end_date = '2019-02-02');
        b = await fetch('https://api.tradingeconomics.com/markets/historical/indu:ind?d1=2018-02-02&d2=2019-02-02&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

