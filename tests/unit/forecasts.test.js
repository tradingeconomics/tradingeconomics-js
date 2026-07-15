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
    global.init_date = null;
    global.symbol = null;
    global.category = null;
});
afterEach(() => { jest.clearAllMocks(); });

describe('getForecasts', () => {
    test('with country', async () => {
        await te.getForecasts(country = 'mexico');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/forecast/country/mexico?c=' + TEST_KEY);
    });
    test('with multiple countries', async () => {
        await te.getForecasts(country = ['mexico', 'sweden']);
        expect(nodeFetch).toHaveBeenCalledWith(B + '/forecast/country/mexico,sweden?c=' + TEST_KEY);
    });
    test('with indicator', async () => {
        await te.getForecasts(indicator = 'gdp');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/forecast/indicator/gdp?c=' + TEST_KEY);
    });
    test('with multiple indicators', async () => {
        await te.getForecasts(indicator = ['gdp', 'population']);
        expect(nodeFetch).toHaveBeenCalledWith(B + '/forecast/indicator/gdp,population?c=' + TEST_KEY);
    });
    test('with country and indicator', async () => {
        await te.getForecasts(country = 'mexico', indicator = 'gdp');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/forecast/country/mexico/indicator/gdp?c=' + TEST_KEY);
    });
    test('with ticker', async () => {
        await te.getForecasts(ticker = 'usurtot');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/forecast/ticker/usurtot?c=' + TEST_KEY);
    });
    test('throws when no arguments', () => {
        expect(() => te.getForecasts()).toThrow('At least one of the parameters must be set');
    });
});

describe('getForecastsUpdates', () => {
    test('no arguments', async () => {
        await te.getForecastsUpdates();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/forecast/updates?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getForecastsUpdates(country = ['china', 'portugal']);
        expect(nodeFetch).toHaveBeenCalledWith(B + '/forecast/updates?c=' + TEST_KEY + '&country=china,portugal');
    });
    test('with country and init_date', async () => {
        await te.getForecastsUpdates(country = ['china', 'portugal'], init_date = '2024-11-01');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/forecast/updates?c=' + TEST_KEY + '&country=china,portugal&init_date=2024-11-01');
    });
});

describe('getMarketsForecast', () => {
    test('with category', async () => {
        await te.getMarketsForecast(category = 'index');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/forecasts/index?c=' + TEST_KEY);
    });
    test('with symbol', async () => {
        await te.getMarketsForecast(symbol = 'AAPL:US');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/markets/forecasts/symbol/AAPL:US?c=' + TEST_KEY);
    });
});
