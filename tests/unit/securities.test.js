jest.mock('node-fetch');
const nodeFetch = require('node-fetch');
const te = require('tradingeconomics');

const TEST_KEY = 'testkey:testsecret';
const B = 'https://api.tradingeconomics.com';

beforeAll(() => { te.login(TEST_KEY); });
beforeEach(() => {
    nodeFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
    global.symbol = null;
    global.ticker = null;
    global.country = null;
    global.start_date = null;
    global.end_date = null;
});
afterEach(() => { jest.clearAllMocks(); });

describe('getDividends', () => {
    test('no arguments', async () => {
        await te.getDividends();
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/dividends/?c=' + TEST_KEY);
    });
    test('with symbol', async () => {
        await te.getDividends(symbol = 'aapl:us');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/dividends/symbol/aapl%3Aus?c=' + TEST_KEY);
    });
    test('with symbol and start_date', async () => {
        await te.getDividends(symbol = 'aapl:us', start_date = '2018-01-01');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/dividends/symbol/aapl%3Aus?c=' + TEST_KEY + '&d1=2018-01-01');
    });
    test('with symbol, start_date and end_date', async () => {
        await te.getDividends(symbol = 'aapl:us', start_date = '2018-01-01', end_date = '2019-01-01');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/dividends/symbol/aapl%3Aus?c=' + TEST_KEY + '&d1=2018-01-01&d2=2019-01-01');
    });
});

describe('getIpo', () => {
    test('no arguments', async () => {
        await te.getIpo();
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/ipo/?c=' + TEST_KEY);
    });
    test('with ticker', async () => {
        await te.getIpo(ticker = 'SWIN');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/ipo/ticker/SWIN?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getIpo(country = 'United States');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/ipo/country/United%20States?c=' + TEST_KEY);
    });
    test('with ticker and dates', async () => {
        await te.getIpo(ticker = 'SWIN', start_date = '2023-09-01', end_date = '2023-12-01');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/ipo/ticker/SWIN?c=' + TEST_KEY + '&d1=2023-09-01&d2=2023-12-01');
    });
});

describe('getStockSplits', () => {
    test('no arguments', async () => {
        await te.getStockSplits();
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/splits/?c=' + TEST_KEY);
    });
    test('with ticker', async () => {
        await te.getStockSplits(ticker = 'MMET');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/splits/ticker/MMET?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getStockSplits(country = 'United States');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/splits/country/United%20States?c=' + TEST_KEY);
    });
    test('with dates', async () => {
        await te.getStockSplits(start_date = '2023-09-01', end_date = '2023-12-01');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/splits/?c=' + TEST_KEY + '&d1=2023-09-01&d2=2023-12-01');
    });
});
