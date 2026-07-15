const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

describeIntegration('getCalendarUpdates', () => {

    beforeEach(() => {
        return new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getCalendarUpdates with no arguments', async () => {
        a = await te.getCalendarUpdates();
        b = await fetch('https://api.tradingeconomics.com/calendar/updates/?c=');
        c = await b.json();
        // Calendar updates are live data â€” compare structure, not exact values
        expect(Array.isArray(a)).toBe(true);
        expect(a.length).toBe(c.length);
        if (a.length > 0) {
            expect(Object.keys(a[0]).sort()).toEqual(Object.keys(c[0]).sort());
        }
    }, 60000);

});

