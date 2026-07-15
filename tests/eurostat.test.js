const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getEurostatData', () => {

    beforeEach(() => {
        global.country = null;
        global.category = null;
        global.category_group = null;
        global.lists = null;
        global.symbol = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getEurostatData with lists=categories argument', async () => {
        a = await te.getEurostatData(lists = 'categories');
        b = await fetch('https://api.tradingeconomics.com/eurostat/categories?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getEurostatData with lists=countries argument', async () => {
        a = await te.getEurostatData(lists = 'countries');
        b = await fetch('https://api.tradingeconomics.com/eurostat/countries?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getEurostatData with country argument', async () => {
        a = await te.getEurostatData(country = 'Denmark');
        b = await fetch('https://api.tradingeconomics.com/eurostat/country/Denmark?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getEurostatData with symbol argument', async () => {
        a = await te.getEurostatData(symbol = '51640');
        b = await fetch('https://api.tradingeconomics.com/eurostat/symbol/51640?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getEurostatData with category_group argument', async () => {
        a = await te.getEurostatData(category_group = 'Poverty');
        b = await fetch('https://api.tradingeconomics.com/eurostat?c=&category_group=Poverty');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getEurostatData with category argument', async () => {
        a = await te.getEurostatData(category = 'People at risk of income poverty after social transfers');
        b = await fetch('https://api.tradingeconomics.com/eurostat?c=&category=People at risk of income poverty after social transfers');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getEurostatData with country and category_group arguments', async () => {
        a = await te.getEurostatData(country = 'Denmark', category_group = 'Poverty');
        b = await fetch('https://api.tradingeconomics.com/eurostat/country/Denmark?c=&category_group=Poverty');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getEurostatHistorical', () => {

    beforeEach(() => {
        global.id = null;
        global.start_date = null;
        global.end_date = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getEurostatHistorical with id argument', async () => {
        a = await te.getEurostatHistorical(id = '24804');
        b = await fetch('https://api.tradingeconomics.com/eurostat/historical/24804?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getEurostatHistorical with id and start_date arguments', async () => {
        a = await te.getEurostatHistorical(id = '24804', start_date = '2017-01-01');
        b = await fetch('https://api.tradingeconomics.com/eurostat/historical/24804?d1=2017-01-01&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getEurostatHistorical with id, start_date and end_date arguments', async () => {
        a = await te.getEurostatHistorical(id = '24804', start_date = '2017-01-01', end_date = '2020-05-05');
        b = await fetch('https://api.tradingeconomics.com/eurostat/historical/24804?d1=2017-01-01&d2=2020-05-05&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

