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
    global.limit = null;
    global.start = null;
    global.start_date = null;
    global.end_date = null;
    global.type = null;
    global.ticker = null;
    global.id = null;
    global.series_code = null;
    global.URL = null;
    global.historical = null;
    global.category = null;
    global.category_group = null;
    global.lists = null;
    global.symbol = null;
    global.term = null;
});
afterEach(() => { jest.clearAllMocks(); });

describe('getNews', () => {
    test('no arguments', async () => {
        await te.getNews();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/news?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getNews(country = 'united states');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/news/country/united states?c=' + TEST_KEY);
    });
    test('with indicator', async () => {
        await te.getNews(indicator = 'inflation rate');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/news/indicator/inflation rate?c=' + TEST_KEY);
    });
    test('with country and indicator', async () => {
        await te.getNews(country = 'united states', indicator = 'inflation rate');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/news/country/united states/inflation rate?c=' + TEST_KEY);
    });
    test('with type', async () => {
        await te.getNews(type = 'article');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/news/?type=article&c=' + TEST_KEY);
    });
    test('with dates', async () => {
        await te.getNews(start_date = '2021-02-02', end_date = '2021-03-03');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/news?c=' + TEST_KEY + '&d1=2021-02-02&d2=2021-03-03');
    });
});

describe('getArticles', () => {
    test('no arguments', async () => {
        await te.getArticles();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/articles?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getArticles(country = 'portugal');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/articles/country/portugal?c=' + TEST_KEY);
    });
    test('with id', async () => {
        await te.getArticles(id = '20580');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/articles/id/20580?c=' + TEST_KEY);
    });
    test('with limit and start', async () => {
        await te.getArticles(limit = '4', start = '2');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/articles?lim=4&start=2&c=' + TEST_KEY);
    });
});

describe('getSearch', () => {
    test('no arguments', async () => {
        await te.getSearch();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/search/categories/?c=' + TEST_KEY);
    });
    test('with term', async () => {
        await te.getSearch(term = 'gold');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/search/gold?c=' + TEST_KEY);
    });
    test('with term and category', async () => {
        await te.getSearch(term = 'japan', category = 'markets');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/search/japan?category=markets&c=' + TEST_KEY);
    });
});
