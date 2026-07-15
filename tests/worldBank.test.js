const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getWorldBank', () => {

    beforeEach(() => {
        global.country = null;
        global.category = null;
        global.series_code = null;
        global.URL = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getWorldBank with no arguments', async () => {
        a = await te.getWorldBank();
        b = await fetch('https://api.tradingeconomics.com/worldBank/categories?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getWorldBank with category argument', async () => {
        a = await te.getWorldBank(category = 'Education');
        b = await fetch('https://api.tradingeconomics.com/worldBank/category/Education?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getWorldBank with country argument', async () => {
        a = await te.getWorldBank(country = 'united states');
        b = await fetch('https://api.tradingeconomics.com/worldBank/country/united states?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getWorldBank with series_code argument', async () => {
        a = await te.getWorldBank(series_code = 'fr.inr.rinr');
        b = await fetch('https://api.tradingeconomics.com/worldBank/indicator?s=fr.inr.rinr&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

describeIntegration('getWorldBankHistorical', () => {

    beforeEach(() => {
        global.series_code = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getWorldBankHistorical with series_code argument', async () => {
        a = await te.getWorldBankHistorical(series_code = 'usa.fr.inr.rinr');
        b = await fetch('https://api.tradingeconomics.com/worldBank/historical?s=usa.fr.inr.rinr&c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

