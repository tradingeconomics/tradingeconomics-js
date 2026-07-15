const te = require('tradingeconomics');
const { API_KEY, describeIntegration, fetch } = require('./integrationHelper');

te.login(API_KEY);

jest.setTimeout(60000);

// For endpoints returning live or non-deterministically ordered data, compare
// structure only (same length, same keys) rather than exact values.
const compareStructure = (a, c) => {
    expect(Array.isArray(a)).toBe(true);
    expect(a.length).toBe(c.length);
    if (a.length > 0) {
        expect(Object.keys(a[0]).sort()).toEqual(Object.keys(c[0]).sort());
    }
};

describeIntegration('getForecastsUpdates', () => {
    beforeEach(() => {

        global.country = null;
        global.indicator = null;
        global.ticker = null;
        global.init_date = null;

        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 5000);
        });
    });

    test('get forecasts updates with no arguments', async () => {
        a = await te.getForecastsUpdates();
        b = await fetch('https://api.tradingeconomics.com//forecast/updates?c=');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);

    test('get forecasts updates with country argument', async () => {
        a = await te.getForecastsUpdates(country = ['china', 'portugal']);
        b = await fetch('https://api.tradingeconomics.com//forecast/updates?c=&country=china,portugal');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);

    test('get forecasts updates with country argument and date', async () => {
        a = await te.getForecastsUpdates(country = ['china', 'portugal'], init_date='2024-11-01');
        b = await fetch('https://api.tradingeconomics.com//forecast/updates?c=&country=china,portugal&date=2024-11-01');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);
    
});

describeIntegration('getForecastsMarkets', () => {
    beforeEach(() => {

        global.symbol = null;
        global.category = null;

        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 5000);
        });
    });

    test('get market forecasts by category', async () => {
        a = await te.getMarketsForecast(category='index');
        b = await fetch('https://api.tradingeconomics.com/markets/forecasts/index?c=');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);

    test('get market forecasts by symbol', async () => {
        a = await te.getMarketsForecast(symbol ='AAPL:US');
        b = await fetch('https://api.tradingeconomics.com/markets/forecasts/symbol/AAPL:US?c=');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);

    test('get market forecasts by symbols', async () => {
        a = await te.getMarketsForecast(symbol =['AAPL:US,DAX:IND,INDU:IND']);
        b = await fetch('https://api.tradingeconomics.com/markets/forecasts/symbol/AAPL:US,DAX:IND,INDU:IND?c=');
        c = await b.json();
        compareStructure(a, c);
    }, 60000);

});

describeIntegration('get Forecasts Indicators', () => {
    beforeEach(() => {
        
        global.country = null;
        global.indicator = null;
        global.category = null;
        global.ticker = null;
        
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 5000);

        });
    }

    );

    test('get indicators forecasts by country', async () => {
        a = await te.getForecasts(country='mexico');
        b = await fetch('https://api.tradingeconomics.com/forecast/country/mexico?c=');
        c = await b.json();

        expect(a).toEqual(c);
    }, 60000);

    test('get indicators forecasts by countries', async () => {
        a = await te.getForecasts(country=['mexico', 'sweden']);
        b = await fetch('https://api.tradingeconomics.com/forecast/country/mexico,sweden?c=');
        c = await b.json();

        expect(a).toEqual(c);
    }, 60000);

    test('get indicators forecasts by indicator', async () => {
        a = await te.getForecasts(indicator='gdp');
        b = await fetch('https://api.tradingeconomics.com/forecast/indicator/gdp?c=');
        c = await b.json();

        expect(a).toEqual(c);
    }, 60000);

    test('get indicators forecasts by indicators', async () => {
        a = await te.getForecasts(indicator=['gdp', 'population']);
        b = await fetch('https://api.tradingeconomics.com/forecast/indicator/gdp,population?c=');
        c = await b.json();

        expect(a).toEqual(c);
    }, 60000);

    test('get indicators forecasts by country and indicator', async () => {
        a = await te.getForecasts(country='mexico', indicator='gdp');
        b = await fetch('https://api.tradingeconomics.com/forecast/country/mexico/indicator/gdp?c=');
        c = await b.json();

        expect(a).toEqual(c);
    }, 60000);

    test('get indicators forecasts by country and indicators', async () => {
        a = await te.getForecasts(country='mexico', indicator=['gdp', 'population']);
        b = await fetch('https://api.tradingeconomics.com/forecast/country/mexico/indicator/gdp,population?c=');
        c = await b.json();

        expect(a).toEqual(c);
    }, 60000);

    test('get indicators forecasts by countries and indicator', async () => {
        a = await te.getForecasts(country=['mexico', 'sweden'], indicator='gdp');
        b = await fetch('https://api.tradingeconomics.com/forecast/country/mexico,sweden/indicator/gdp?c=');
        c = await b.json();

        expect(a).toEqual(c);
    }, 60000);

    test('get indicators forecasts by countries and indicators', async () => {
        a = await te.getForecasts(country=['mexico', 'sweden'], indicator=['gdp', 'population']);
        b = await fetch('https://api.tradingeconomics.com/forecast/country/mexico,sweden/indicator/gdp,population?c=');
        c = await b.json();

        expect(a).toEqual(c);
    }, 60000);

    test('get indicators forecasts by ticker', async () => {

        a = await te.getForecasts(ticker = 'usurtot');
        b = await fetch('https://api.tradingeconomics.com/forecast/ticker/usurtot?c=');
        c = await b.json();

        expect(a).toEqual(c);
    }, 60000);

    test('get indicators forecasts by tickers', async () => {
        a = await te.getForecasts(ticker = ['usurtot','wgdpchin']);
        b = await fetch('https://api.tradingeconomics.com/forecast/ticker/usurtot,wgdpchin?c=');
        c = await b.json();
        expect(a).toEqual(c);
    }, 60000);
});



