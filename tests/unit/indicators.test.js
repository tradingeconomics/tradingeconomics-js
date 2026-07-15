jest.mock('node-fetch');
const nodeFetch = require('node-fetch');
const te = require('tradingeconomics');

const TEST_KEY = 'testkey:testsecret';
const B = 'https://api.tradingeconomics.com';

beforeAll(() => { te.login(TEST_KEY); });
beforeEach(() => {
    nodeFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
    global.country = null;
    global.indicator = null;
    global.ticker = null;
    global.group = null;
    global.calendar = null;
    global.start_date = null;
    global.date = null;
});
afterEach(() => { jest.clearAllMocks(); });

describe('getIndicatorData', () => {
    test('no arguments', async () => {
        await te.getIndicatorData();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/indicators?c=' + TEST_KEY);
    });
    test('with indicator', async () => {
        await te.getIndicatorData(indicator = ['gdp']);
        expect(nodeFetch).toHaveBeenCalledWith(B + '/country/all/gdp?c=' + TEST_KEY);
    });
    test('with ticker', async () => {
        await te.getIndicatorData(ticker = ['usurtot']);
        expect(nodeFetch).toHaveBeenCalledWith(B + '/country/ticker/usurtot?c=' + TEST_KEY);
    });
    test('with country and group', async () => {
        await te.getIndicatorData(country = ['sweden'], group = 'housing');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/country/sweden?c=' + TEST_KEY + '&group=housing');
    });
    test('with calendar and country', async () => {
        await te.getIndicatorData(country = ['sweden'], calendar = 1);
        expect(nodeFetch).toHaveBeenCalledWith(B + '/indicators?c=' + TEST_KEY + '&calendar=1&country=sweden');
    });
});

describe('getAllCountries', () => {
    test('no arguments', async () => {
        await te.getAllCountries();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/country?c=' + TEST_KEY);
    });
});

describe('getDiscontinuedIndicators', () => {
    test('no arguments', async () => {
        await te.getDiscontinuedIndicators();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/country/all/discontinued?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getDiscontinuedIndicators(country = ['united states']);
        expect(nodeFetch).toHaveBeenCalledWith(B + '/country/united states/discontinued?c=' + TEST_KEY);
    });
});

describe('getHistoricalUpdates', () => {
    test('no arguments', async () => {
        await te.getHistoricalUpdates();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/historical/updates?c=' + TEST_KEY);
    });
});

describe('getHistoricalLatest', () => {
    test('no arguments', async () => {
        await te.getHistoricalLatest();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/historical/latest?c=' + TEST_KEY);
    });
});
