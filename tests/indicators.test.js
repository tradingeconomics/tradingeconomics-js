const te = require('tradingeconomics');
const fetch = require('node-fetch')

te.login('guest:guest');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('getIndicatorData', () => {
    beforeEach(() => {

        global.country = null;
        global.indicator = null;
        global.ticker = null;
        global.group = null;
        global.calendar = null;

        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    });

    test('get Indicators Data with no arguments', async () => {
        a = await te.getIndicatorData();
        sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/indicators?c=guest:guest');
        sleep(3000)
        c = await b.json();

        expect(a).toEqual(c);
        sleep(3000)
    }, 100000);

    // test('get Indicators Data with calendar argument', async () => {
    //     a = await te.getIndicatorData(calendar = 1);
    //     b = await fetch('https://api.tradingeconomics.com/indicators?c=guest:guest&calendar=1');
    //     c = await b.json();

    //     expect(a).toEqual(c);
    // }, 10000);

    // test('get Indicators Data with countries argument', async () => {
    //     a = await te.getIndicatorData(country = ['sweden']);
    //     b = await fetch('https://api.tradingeconomics.com/country/sweden?c=guest:guest');
                         
    //     c = await b.json();

    //     expect(a).toEqual(c);
    // }, 10000);

    test('get Indicators Data with country and calendar argument', async () => {
        a = await te.getIndicatorData(country = ['sweden'], calendar = 1);
        sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/indicators?calendar=1&country=sweden&c=guest:guest');
        sleep(3000)
        c = await b.json();

        expect(a).toEqual(c);
        sleep(3000)
    }, 100000);

    test('get Indicators Data with indicators argument', async () => {
        a = await te.getIndicatorData(indicator = ['gdp']);
        sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/country/all/gdp?c=guest:guest');
        sleep(3000)
        c = await b.json();

        expect(a).toEqual(c);
        sleep(3000)
    }, 100000);

    test('get Indicators Data with ticker', async () => {
        a = await te.getIndicatorData(ticker = ['usurtot']);
        sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/country/ticker/usurtot?c=guest:guest');
        sleep(3000)
        c = await b.json();

        expect(a).toEqual(c);
        sleep(3000)
    }, 100000);

    test('get Indicators Data with country and group argument', async () => {
        a = await te.getIndicatorData(country = ['sweden'], group = 'housing');
        sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/country/sweden?c=guest:guest&group=housing');
        sleep(3000)
        c = await b.json();

        expect(a).toEqual(c);
        sleep(3000)
    }, 100000);
});

describe('getIndicatorGroups', () => {
    beforeEach(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    });

    test('get Discontinued Indicators', async () => {
        a = await te.getDiscontinuedIndicators();
        sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/country/all/discontinued?c=guest:guest');
        sleep(3000)
        c = await b.json();

        expect(a).toEqual(c);
        sleep(3000)
    }, 100000);

    test('get Disconnect Indicators with country argument', async () => {
        a = await te.getDiscontinuedIndicators(country = ['united states']);
        sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/country/united states/discontinued?c=guest:guest');
        sleep(3000)
        c = await b.json();

        expect(a).toEqual(c);
        sleep(3000)
    }, 100000);
});

describe('getHistoricalUpdates', () => {
    beforeEach(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    });

    test('get Historical updates', async () => {
        a = await te.getHistoricalUpdates();
        sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/historical/updates?c=guest:guest');
        sleep(3000)
        c = await b.json();

        expect(a).toEqual(c);
        sleep(3000)
    }, 100000);
});

describe('getHistoricalLatest', () => {
    beforeEach(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    });

    test('get latest historical', async () => {
        a = await te.getHistoricalLatest();
        sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/historical/latest?c=guest:guest');
        sleep(3000)
        c = await b.json();

        expect(a).toEqual(c);
        sleep(3000)
    }, 100000);
});

describe('getAllCountries', () => {
    beforeEach(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    });


test('get all countries', async () => {
    a = await te.getAllCountries();
    sleep(3000)
    b = await fetch('https://api.tradingeconomics.com/country?c=guest:guest');
    sleep(3000)
    c = await b.json();

    expect(a).toEqual(c);
    sleep(3000)
}, 100000);

});