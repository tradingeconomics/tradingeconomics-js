const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getMarketStockDescriptions', () => {

    beforeEach(() => {
        global.symbol = null;
        global.country = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getMarketStockDescriptions with symbol argument', async () => {
        a = await te.getMarketStockDescriptions(symbol = 'aapl:us');
        b = await fetch('https://api.tradingeconomics.com/markets/stockdescriptions/symbol/aapl:us?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getMarketStockDescriptions with country argument', async () => {
        a = await te.getMarketStockDescriptions(country = 'china');
        b = await fetch('https://api.tradingeconomics.com/markets/stockdescriptions/country/china?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

