jest.mock('node-fetch');
const nodeFetch = require('node-fetch');
const te = require('tradingeconomics');

const TEST_KEY = 'testkey:testsecret';
const B = 'https://api.tradingeconomics.com';

beforeAll(() => { te.login(TEST_KEY); });
beforeEach(() => {
    nodeFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
    global.symbol = null;
    global.country = null;
    global.category = null;
    global.start_date = null;
    global.end_date = null;
});
afterEach(() => { jest.clearAllMocks(); });

describe('getFinancialsData', () => {
    test('no arguments', async () => {
        await te.getFinancialsData();
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/financials/companies?c=' + TEST_KEY);
    });
    test('with symbol', async () => {
        await te.getFinancialsData(symbol = 'aapl:us');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/financials/symbol/aapl:us?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getFinancialsData(country = 'china');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/financials/companies?country=china&c=' + TEST_KEY);
    });
});

describe('getFinancialsCategoryList', () => {
    test('no arguments', async () => {
        await te.getFinancialsCategoryList();
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/financials/categories?c=' + TEST_KEY);
    });
});

describe('getFinancialsDataByCategory', () => {
    test('with category', async () => {
        await te.getFinancialsDataByCategory(category = 'debt');
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/financials/category/debt?c=' + TEST_KEY);
    });
});

describe('getSectors', () => {
    test('no arguments', async () => {
        await te.getSectors();
        expect(nodeFetch).toHaveBeenCalledWith('https://api.tradingeconomics.com/sectors?c=' + TEST_KEY);
    });
});

describe('getFinancialsHistorical', () => {
    test('with symbol and category', async () => {
        await te.getFinancialsHistorical(symbol = 'aapl:us', category = 'assets');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/financials/historical/aapl:us:assets?c=' + TEST_KEY);
    });
    test('with symbol, category and dates', async () => {
        await te.getFinancialsHistorical(symbol = 'aapl:us', category = 'assets', start_date = '2018-01-01', end_date = '2022-01-01');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/financials/historical/aapl:us:assets?c=' + TEST_KEY + '&d1=2018-01-01&d2=2022-01-01');
    });
});
