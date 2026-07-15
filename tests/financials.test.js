const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getFinancialsData', () => {

    beforeEach(() => {
        global.symbol = null;
        global.country = null;
        global.category = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getFinancialsData with no arguments', async () => {
        a = await te.getFinancialsData();
        b = await fetch('https://api.tradingeconomics.com/financials/companies?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getFinancialsData with symbol argument', async () => {
        a = await te.getFinancialsData(symbol = 'aapl:us');
        b = await fetch('https://api.tradingeconomics.com/financials/symbol/aapl:us?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getFinancialsData with country argument', async () => {
        a = await te.getFinancialsData(country = 'china');
        b = await fetch('https://api.tradingeconomics.com/financials/companies?country=china&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getFinancialsCategoryList', () => {

    beforeEach(() => {
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getFinancialsCategoryList with no arguments', async () => {
        a = await te.getFinancialsCategoryList();
        b = await fetch('https://api.tradingeconomics.com/financials/categories?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getFinancialsDataByCategory', () => {

    beforeEach(() => {
        global.category = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getFinancialsDataByCategory with category argument', async () => {
        a = await te.getFinancialsDataByCategory(category = 'debt');
        b = await fetch('https://api.tradingeconomics.com/financials/category/debt?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getFinancialsDataByCategory with category=assets argument', async () => {
        a = await te.getFinancialsDataByCategory(category = 'assets');
        b = await fetch('https://api.tradingeconomics.com/financials/category/assets?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getSectors', () => {

    beforeEach(() => {
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getSectors with no arguments', async () => {
        a = await te.getSectors();
        b = await fetch('https://api.tradingeconomics.com/sectors?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getFinancialsHistorical', () => {

    beforeEach(() => {
        global.symbol = null;
        global.category = null;
        global.start_date = null;
        global.end_date = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getFinancialsHistorical with symbol and category arguments', async () => {
        a = await te.getFinancialsHistorical(symbol = 'aapl:us', category = 'assets');
        b = await fetch('https://api.tradingeconomics.com/financials/historical/aapl:us:assets?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getFinancialsHistorical with symbol, category, start_date and end_date arguments', async () => {
        a = await te.getFinancialsHistorical(symbol = 'aapl:us', category = 'assets', start_date = '2018-01-01', end_date = '2022-01-01');
        b = await fetch('https://api.tradingeconomics.com/financials/historical/aapl:us:assets?c=&d1=2018-01-01&d2=2022-01-01');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

