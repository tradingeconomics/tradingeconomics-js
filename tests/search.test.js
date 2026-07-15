const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(20000);

describeIntegration('getSearch', () => {

    beforeEach(() => {
        global.category = null;
        global.term = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getSearch with no arguments', async () => {
        a = await te.getSearch();
        b = await fetch('https://api.tradingeconomics.com/search/categories/?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 20000);

    test('getSearch with term argument', async () => {
        a = await te.getSearch(term = 'gold');
        b = await fetch('https://api.tradingeconomics.com/search/gold?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 20000);

    test('getSearch with term and category arguments', async () => {
        a = await te.getSearch(term = 'japan', category = 'markets');
        b = await fetch('https://api.tradingeconomics.com/search/japan?category=markets&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 20000);

});
