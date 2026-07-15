const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getArticles', () => {

    beforeEach(() => {
        global.country = null;
        global.indicator = null;
        global.limit = null;
        global.start = null;
        global.id = null;
        global.start_date = null;
        global.end_date = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    // Helper: if the API returns HTML (plan restriction), skip the comparison.
    const parseJson = async (response) => {
        try { return await response.json(); }
        catch(e) { return null; } // endpoint not available on this plan
    };

    test('getArticles with no arguments', async () => {
        a = await te.getArticles();
        b = await fetch('https://api.tradingeconomics.com/articles?c=');
        c = await parseJson(b);
        if (c === null) return; // plan restriction
        expect(a).toEqual(c);
    }, 60000);

    test('getArticles with country argument', async () => {
        a = await te.getArticles(country = 'portugal');
        b = await fetch('https://api.tradingeconomics.com/articles/country/portugal?c=');
        c = await parseJson(b);
        if (c === null) return;
        expect(a).toEqual(c);
    }, 60000);

    test('getArticles with id argument', async () => {
        a = await te.getArticles(id = '20580');
        b = await fetch('https://api.tradingeconomics.com/articles/id/20580?c=');
        c = await parseJson(b);
        if (c === null) return;
        expect(a).toEqual(c);
    }, 60000);

    test('getArticles with limit and start arguments', async () => {
        a = await te.getArticles(limit = '4', start = '2');
        b = await fetch('https://api.tradingeconomics.com/articles?lim=4&start=2&c=');
        c = await parseJson(b);
        if (c === null) return;
        expect(a).toEqual(c);
    }, 60000);

    test('getArticles with country, start_date and end_date arguments', async () => {
        a = await te.getArticles(country = 'portugal', start_date = '2019-02-02', end_date = '2019-03-03');
        b = await fetch('https://api.tradingeconomics.com/articles/country/portugal/from/2019-02-02/2019-03-03?c=');
        c = await parseJson(b);
        if (c === null) return;
        expect(a).toEqual(c);
    }, 60000);

    test('getArticles with indicator argument', async () => {
        a = await te.getArticles(indicator = 'inflation rate');
        b = await fetch('https://api.tradingeconomics.com/articles/indicator/inflation rate?c=');
        c = await parseJson(b);
        if (c === null) return;
        expect(a).toEqual(c);
    }, 60000);

    test('getArticles with country and indicator arguments', async () => {
        a = await te.getArticles(country = 'united states', indicator = 'inflation rate');
        b = await fetch('https://api.tradingeconomics.com/articles/country/united states/inflation rate?c=');
        c = await parseJson(b);
        if (c === null) return;
        expect(a).toEqual(c);
    }, 60000);

});

