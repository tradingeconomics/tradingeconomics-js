jest.mock('node-fetch');
const nodeFetch = require('node-fetch');
const te = require('tradingeconomics');

const TEST_KEY = 'testkey:testsecret';
const B = 'https://api.tradingeconomics.com';

beforeAll(() => { te.login(TEST_KEY); });
beforeEach(() => {
    nodeFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
    global.country = null;
    global.symbol = null;
    global.marketsField = null;
    global.peers_symbol = null;
    global.components_symbol = null;
    global.search_term = null;
    global.category = null;
    global.cross = null;
    global.type = null;
    global.start_date = null;
    global.end_date = null;
    global.agr = null;
    global.ticker = null;
    global.isin = null;
});
afterEach(() => { jest.clearAllMocks(); });

describe('getMarketSnap', () => {
    test('marketsField=index', async () => {
        await te.getMarketSnap(marketsField = 'index');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/index?c=' + TEST_KEY);
    });
    test('marketsField=commodities', async () => {
        await te.getMarketSnap(marketsField = 'commodities');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/commodities?c=' + TEST_KEY);
    });
    test('marketsField=currency', async () => {
        await te.getMarketSnap(marketsField = 'currency');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/currency?c=' + TEST_KEY);
    });
    test('marketsField=bond', async () => {
        await te.getMarketSnap(marketsField = 'bond');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/bond?c=' + TEST_KEY);
    });
    test('marketsField=crypto', async () => {
        await te.getMarketSnap(marketsField = 'crypto');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/crypto?c=' + TEST_KEY);
    });
    test('with symbol', async () => {
        await te.getMarketSnap(symbol = 'aapl:us');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/symbol/aapl:us?c=' + TEST_KEY);
    });
    test('with peers_symbol', async () => {
        await te.getMarketSnap(peers_symbol = 'aapl:us');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/peers/aapl:us?c=' + TEST_KEY);
    });
    test('with components_symbol', async () => {
        await te.getMarketSnap(components_symbol = 'psi20:ind');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/components/psi20:ind?c=' + TEST_KEY);
    });
    test('with search_term', async () => {
        await te.getMarketSnap(search_term = 'japan');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/search/japan?c=' + TEST_KEY);
    });
    test('with bond and type', async () => {
        await te.getMarketSnap(marketsField = 'bond', type = '5Y');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/bond?c=' + TEST_KEY + '&type=5Y');
    });
    test('with bond and country', async () => {
        await te.getMarketSnap(marketsField = 'bond', country = 'Japan');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/bond?c=' + TEST_KEY + '&country=Japan');
    });
    test('throws for missing parameters', () => {
        expect(() => te.getMarketSnap()).toThrow('Missing parameters.');
    });
});

describe('getMarketsByCountry', () => {
    test('with country', async () => {
        await te.getMarketsByCountry(country = 'united states');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/country/united states?c=' + TEST_KEY);
    });
    test('throws when no country', () => {
        expect(() => te.getMarketsByCountry()).toThrow('Missing country parameters.');
    });
});

describe('getDiscontinuedMarkets', () => {
    test('no arguments', async () => {
        await te.getDiscontinuedMarkets();
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/markets/discontinued/?c=' + TEST_KEY);
    });
});

describe('getMarketsIntraday', () => {
    test('with symbol', async () => {
        await te.getMarketsIntraday(symbol = 'aapl:us');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/intraday/aapl:us?c=' + TEST_KEY);
    });
    test('with symbol and start_date', async () => {
        await te.getMarketsIntraday(symbol = 'aapl:us', start_date = '2018-02-02');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/intraday/aapl:us?d1=2018-02-02&c=' + TEST_KEY);
    });
    test('with symbol, start_date and end_date', async () => {
        await te.getMarketsIntraday(symbol = 'indu:ind', start_date = '2018-02-01', end_date = '2025-03-01');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/intraday/indu:ind?d1=2018-02-01&d2=2025-03-01&c=' + TEST_KEY);
    });
    test('with agr', async () => {
        await te.getMarketsIntraday(symbol = 'indu:ind', agr = '10m', start_date = '2018-02-01', end_date = '2025-02-02');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/intraday/indu:ind?agr=10m&d1=2018-02-01&d2=2025-02-02&c=' + TEST_KEY);
    });
});

describe('getHistoricalMarkets', () => {
    test('with symbol', async () => {
        await te.getHistoricalMarkets(symbol = 'aapl:us');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/historical/aapl:us?c=' + TEST_KEY);
    });
    test('with symbol and start_date', async () => {
        await te.getHistoricalMarkets(symbol = 'aapl:us', start_date = '2018-02-02');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/historical/aapl:us?d1=2018-02-02&c=' + TEST_KEY);
    });
    test('with symbol, start_date and end_date', async () => {
        await te.getHistoricalMarkets(symbol = 'indu:ind', start_date = '2018-02-02', end_date = '2019-02-02');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/historical/indu:ind?d1=2018-02-02&d2=2019-02-02&c=' + TEST_KEY);
    });
});

describe('getMarketStockDescriptions', () => {
    test('with symbol', async () => {
        await te.getMarketStockDescriptions(symbol = 'aapl:us');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/markets/stockdescriptions/symbol/aapl:us?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getMarketStockDescriptions(country = 'china');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/markets/stockdescriptions/country/china?c=' + TEST_KEY);
    });
});

describe('getSymbology', () => {
    test('with symbol', async () => {
        await te.getSymbology(symbol = 'aapl:us');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/symbology/symbol/aapl:us?c=' + TEST_KEY);
    });
    test('with ticker', async () => {
        await te.getSymbology(ticker = 'aapl');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/symbology/ticker/aapl?c=' + TEST_KEY);
    });
    test('with isin', async () => {
        await te.getSymbology(isin = 'US0378331005');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/symbology/isin/us0378331005?c=' + TEST_KEY);
    });
});
