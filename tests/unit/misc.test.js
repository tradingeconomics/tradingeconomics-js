jest.mock('node-fetch');
const nodeFetch = require('node-fetch');
const te = require('tradingeconomics');

const TEST_KEY = 'testkey:testsecret';
const B = 'https://api.tradingeconomics.com';

beforeAll(() => { te.login(TEST_KEY); });
beforeEach(() => {
    nodeFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
    global.country = null;
    global.category = null;
    global.series_code = null;
    global.URL = null;
    global.historical = null;
    global.start_date = null;
    global.end_date = null;
    global.ticker = null;
    global.symbol = null;
    global.county = null;
    global.counties = null;
    global.state = null;
    global.historical_symbol = null;
    global.time = null;
    global.id = null;
    global.category_group = null;
    global.lists = null;
});
afterEach(() => { jest.clearAllMocks(); });

describe('getWorldBank', () => {
    test('no arguments', async () => {
        await te.getWorldBank();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/worldBank/categories?c=' + TEST_KEY);
    });
    test('with category', async () => {
        await te.getWorldBank(category = 'Education');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/worldBank/category/Education?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getWorldBank(country = 'united states');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/worldBank/country/united states?c=' + TEST_KEY);
    });
    test('with series_code', async () => {
        await te.getWorldBank(series_code = 'fr.inr.rinr');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/worldBank/indicator?s=fr.inr.rinr&c=' + TEST_KEY);
    });
});

describe('getWorldBankHistorical', () => {
    test('with series_code', async () => {
        await te.getWorldBankHistorical(series_code = 'usa.fr.inr.rinr');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/worldBank/historical?s=usa.fr.inr.rinr&c=' + TEST_KEY);
    });
});

describe('getRatings', () => {
    test('no arguments', async () => {
        await te.getRatings();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/ratings?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getRatings(country = 'china');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/ratings/china?c=' + TEST_KEY);
    });
    test('with historical', async () => {
        await te.getRatings(historical = 'united states');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/ratings/historical/united states?c=' + TEST_KEY);
    });
});

describe('getHistoricalData', () => {
    test('with country and indicator', async () => {
        await te.getHistoricalData(country = 'china', indicator = 'gdp');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/historical/country/china/indicator/gdp?c=' + TEST_KEY);
    });
    test('with country, indicator and dates', async () => {
        await te.getHistoricalData(country = 'china', indicator = 'gdp', start_date = '2018-02-02', end_date = '2019-02-02');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/historical/country/china/indicator/gdp/2018-02-02/2019-02-02?c=' + TEST_KEY);
    });
    test('with ticker and start_date', async () => {
        await te.getHistoricalData(ticker = 'usurtot', start_date = '2018-02-02');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/historical/ticker/usurtot/2018-02-02?c=' + TEST_KEY);
    });
});

describe('getFred', () => {
    test('no arguments', async () => {
        await te.getFred();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/fred/states?c=' + TEST_KEY);
    });
    test('with symbol', async () => {
        await te.getFred(symbol = 'ALLMARGATTN');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/fred/snapshot/symbol/ALLMARGATTN?c=' + TEST_KEY);
    });
    test('with historical_symbol', async () => {
        await te.getFred(historical_symbol = 'RACEDISPARITY005007');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/fred/historical/RACEDISPARITY005007?c=' + TEST_KEY);
    });
    test('with historical_symbol and start_date', async () => {
        await te.getFred(historical_symbol = 'RACEDISPARITY005007', start_date = '2017-05-01');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/fred/historical/RACEDISPARITY005007?c=' + TEST_KEY + '&d1=2017-05-01');
    });
});

describe('getLatestUpdates', () => {
    test('no arguments', async () => {
        await te.getLatestUpdates();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/updates?c=' + TEST_KEY);
    });
    test('with start_date', async () => {
        await te.getLatestUpdates(start_date = '2018-02-02');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/updates/2018-02-02?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getLatestUpdates(country = 'china');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/updates/country/china?c=' + TEST_KEY);
    });
});

describe('getEurostatData', () => {
    test('with lists=categories', async () => {
        await te.getEurostatData(lists = 'categories');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/eurostat/categories?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getEurostatData(country = 'Denmark');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/eurostat/country/Denmark?c=' + TEST_KEY);
    });
    test('with category_group', async () => {
        await te.getEurostatData(category_group = 'Poverty');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/eurostat?c=' + TEST_KEY + '&category_group=Poverty');
    });
});

describe('getEurostatHistorical', () => {
    test('with id', async () => {
        await te.getEurostatHistorical(id = '24804');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/eurostat/historical/24804?c=' + TEST_KEY);
    });
    test('with id and dates', async () => {
        await te.getEurostatHistorical(id = '24804', start_date = '2017-01-01', end_date = '2020-05-05');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/eurostat/historical/24804?d1=2017-01-01&d2=2020-05-05&c=' + TEST_KEY);
    });
});

describe('getPeers', () => {
    test('with ticker', async () => {
        await te.getPeers(ticker = 'CPI YOY');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/peers/CPI%20YOY?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getPeers(country = 'united states');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/peers/country/united%20states?c=' + TEST_KEY);
    });
});

describe('getCreditRatings', () => {
    test('no arguments', async () => {
        await te.getCreditRatings();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/credit-ratings?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getCreditRatings(country = 'china');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/credit-ratings/country/china?c=' + TEST_KEY);
    });
});

describe('getHistoricalCreditRatings', () => {
    test('no arguments', async () => {
        await te.getHistoricalCreditRatings();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/credit-ratings/historical?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getHistoricalCreditRatings(country = 'china');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/credit-ratings/historical/country/china?c=' + TEST_KEY);
    });
    test('with countries and dates', async () => {
        await te.getHistoricalCreditRatings(country = ['china', 'japan'], start_date = '2018-01-01', end_date = '2019-03-01');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/credit-ratings/historical/country/china%2Cjapan?c=' + TEST_KEY + '&d1=2018-01-01&d2=2019-03-01');
    });
});
