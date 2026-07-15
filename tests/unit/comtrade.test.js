jest.mock('node-fetch');
const nodeFetch = require('node-fetch');
const te = require('tradingeconomics');

const TEST_KEY = 'testkey:testsecret';
const B = 'https://api.tradingeconomics.com';

beforeAll(() => { te.login(TEST_KEY); });
beforeEach(() => {
    nodeFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
    global.category = null;
    global.country = null;
    global.country1 = null;
    global.country2 = null;
    global.symbol = null;
    global.type = null;
    global.start_date = null;
});
afterEach(() => { jest.clearAllMocks(); });

describe('getComtrade', () => {
    test('categories', async () => {
        await te.getComtrade(category = 'categories');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/comtrade/categories?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getComtrade(country = 'china');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/comtrade/country/china?c=' + TEST_KEY);
    });
    test('with country and country1', async () => {
        await te.getComtrade(country = 'china', country1 = 'united states');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/comtrade/country/china/united states?c=' + TEST_KEY);
    });
    test('with symbol', async () => {
        await te.getComtrade(symbol = 'PRTESP24031');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/comtrade/historical/PRTESP24031?c=' + TEST_KEY);
    });
});

describe('getCmtLastUpdates', () => {
    test('no arguments', async () => {
        await te.getCmtLastUpdates();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/comtrade/updates/country/all?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getCmtLastUpdates(country = 'china');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/comtrade/updates/country/china?c=' + TEST_KEY);
    });
    test('with country and start_date', async () => {
        await te.getCmtLastUpdates(country = 'china', start_date = '2022-01-01');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/comtrade/updates/country/china?c=' + TEST_KEY + '&from=2022-01-01');
    });
});

describe('getCmtCountryByCategory', () => {
    test('with country and type', async () => {
        await te.getCmtCountryByCategory(country = 'Portugal', type = 'import');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/comtrade/import/Portugal?c=' + TEST_KEY);
    });
    test('with country, type and category', async () => {
        await te.getCmtCountryByCategory(country = 'Portugal', type = 'export', category = 'live animals');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/comtrade/export/Portugal/live%20animals?c=' + TEST_KEY);
    });
});

describe('getCmtCountryFilterByType', () => {
    test('with country1 and type', async () => {
        await te.getCmtCountryFilterByType(country1 = 'Portugal', type = 'import');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/comtrade/country/Portugal?type=import&c=' + TEST_KEY);
    });
    test('with country1, country2 and type', async () => {
        await te.getCmtCountryFilterByType(country1 = 'Portugal', country2 = 'Spain', type = 'import');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/comtrade/country/Portugal/Spain?type=import&c=' + TEST_KEY);
    });
});

describe('getComtradeTotalByType', () => {
    test('with country and type', async () => {
        await te.getComtradeTotalByType(country = 'Portugal', type = 'import');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/comtrade/import/Portugal/totals?c=' + TEST_KEY);
    });
});
