const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

// News articles are live — descriptions update between the two sequential calls.
// For no-args (whole feed), compare structure; for filtered endpoints, exact compare.
const compareStructure = (a, c) => {
    expect(Array.isArray(a)).toBe(true);
    expect(a.length).toBe(c.length);
    if (a.length > 0) {
        expect(Object.keys(a[0]).sort()).toEqual(Object.keys(c[0]).sort());
    }
};

describeIntegration('getNews', () => {

    beforeEach(() => {
        global.country = null;
        global.indicator = null;
        global.limit = null;
        global.start = null;
        global.start_date = null;
        global.end_date = null;
        global.type = null;
        global.ticker = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getNews with no arguments', async () => {
        a = await te.getNews();
        b = await fetch('https://api.tradingeconomics.com/news?c=');
        c = await b.json();
        compareStructure(a, c); // live feed — content updates between calls
    }, 60000);

    test('getNews with country argument', async () => {
        a = await te.getNews(country = 'united states');
        b = await fetch('https://api.tradingeconomics.com/news/country/united states?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getNews with indicator argument', async () => {
        a = await te.getNews(indicator = 'inflation rate');
        b = await fetch('https://api.tradingeconomics.com/news/indicator/inflation rate?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getNews with country and indicator arguments', async () => {
        a = await te.getNews(country = 'united states', indicator = 'inflation rate');
        b = await fetch('https://api.tradingeconomics.com/news/country/united states/inflation rate?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getNews with start_date and end_date arguments', async () => {
        a = await te.getNews(start_date = '2021-02-02', end_date = '2021-03-03');
        b = await fetch('https://api.tradingeconomics.com/news?c=&d1=2021-02-02&d2=2021-03-03');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getNews with type argument', async () => {
        a = await te.getNews(type = 'article');
        b = await fetch('https://api.tradingeconomics.com/news/?type=article&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

