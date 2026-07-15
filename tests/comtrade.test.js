const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getComtrade', () => {

    beforeEach(() => {
        global.category = null;
        global.country = null;
        global.country1 = null;
        global.symbol = null;
        global.start_date = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getComtrade with category=categories argument', async () => {
        a = await te.getComtrade(category = 'categories');
        b = await fetch('https://api.tradingeconomics.com/comtrade/categories?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getComtrade with country argument', async () => {
        a = await te.getComtrade(country = 'china');
        b = await fetch('https://api.tradingeconomics.com/comtrade/country/china?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getComtrade with country and country1 arguments', async () => {
        a = await te.getComtrade(country = 'china', country1 = 'united states');
        b = await fetch('https://api.tradingeconomics.com/comtrade/country/china/united states?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getComtrade with symbol argument', async () => {
        a = await te.getComtrade(symbol = 'PRTESP24031');
        b = await fetch('https://api.tradingeconomics.com/comtrade/historical/PRTESP24031?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getCmtLastUpdates', () => {

    beforeEach(() => {
        global.country = null;
        global.start_date = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getCmtLastUpdates with no arguments', async () => {
        a = await te.getCmtLastUpdates();
        b = await fetch('https://api.tradingeconomics.com/comtrade/updates/country/all?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getCmtLastUpdates with country argument', async () => {
        a = await te.getCmtLastUpdates(country = 'china');
        b = await fetch('https://api.tradingeconomics.com/comtrade/updates/country/china?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getCmtLastUpdates with country and start_date arguments', async () => {
        a = await te.getCmtLastUpdates(country = 'china', start_date = '2022-01-01');
        b = await fetch('https://api.tradingeconomics.com/comtrade/updates/country/china?c=&from=2022-01-01');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getCmtCountryByCategory', () => {

    beforeEach(() => {
        global.country = null;
        global.type = null;
        global.category = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getCmtCountryByCategory with country and type arguments', async () => {
        a = await te.getCmtCountryByCategory(country = 'Portugal', type = 'import');
        b = await fetch('https://api.tradingeconomics.com/comtrade/import/Portugal?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getCmtCountryByCategory with country, type and category arguments', async () => {
        a = await te.getCmtCountryByCategory(country = 'Portugal', type = 'export', category = 'live animals');
        b = await fetch('https://api.tradingeconomics.com/comtrade/export/Portugal/live animals?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getCmtCountryFilterByType', () => {

    beforeEach(() => {
        global.country1 = null;
        global.country2 = null;
        global.type = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getCmtCountryFilterByType with country1 and type arguments', async () => {
        a = await te.getCmtCountryFilterByType(country1 = 'Portugal', type = 'import');
        b = await fetch('https://api.tradingeconomics.com/comtrade/country/Portugal?type=import&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getCmtCountryFilterByType with country1, country2 and type arguments', async () => {
        a = await te.getCmtCountryFilterByType(country1 = 'Portugal', country2 = 'Spain', type = 'import');
        b = await fetch('https://api.tradingeconomics.com/comtrade/country/Portugal/Spain?type=import&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getComtradeTotalByType', () => {

    beforeEach(() => {
        global.country = null;
        global.type = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getComtradeTotalByType with country and type=import arguments', async () => {
        a = await te.getComtradeTotalByType(country = 'Portugal', type = 'import');
        b = await fetch('https://api.tradingeconomics.com/comtrade/import/Portugal/totals?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getComtradeTotalByType with country and type=export arguments', async () => {
        a = await te.getComtradeTotalByType(country = 'United States', type = 'export');
        b = await fetch('https://api.tradingeconomics.com/comtrade/export/United States/totals?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

