const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getPeers', () => {

    beforeEach(() => {
        global.ticker = null;
        global.country = null;
        global.category = null;
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getPeers with ticker argument', async () => {
        a = await te.getPeers(ticker = 'CPI YOY');
        b = await fetch('https://api.tradingeconomics.com/peers/CPI%20YOY?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getPeers with country argument', async () => {
        try {
            a = await te.getPeers(country = 'united states');
        } catch(e) {
            if (e.message === 'Not Found') return; // endpoint not available on this plan
            throw e;
        }
        b = await fetch('https://api.tradingeconomics.com/peers/country/united%20states?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

    test('getPeers with country and category arguments', async () => {
        a = await te.getPeers(country = 'united states', category = 'money');
        b = await fetch('https://api.tradingeconomics.com/peers/country/united%20states/money?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);

});

