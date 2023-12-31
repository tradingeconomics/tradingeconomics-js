const te = require('tradingeconomics');
const fetch = require('node-fetch')

te.login('guest:guest');

test('get stock splits calendar', async () => {
    a = await te.getStockSplits();
    b = await fetch('https://api.tradingeconomics.com/splits?c=guest:guest&f=json');
    c = await b.json();

    expect(a).toEqual(c);
}, 10000);

test('get stock splits calendar with date argument', async () => {
    a = await te.getStockSplits(start_date='2023-09-01', end_date='2023-12-01');
    b = await fetch('https://api.tradingeconomics.com/splits?c=guest:guest&f=json&d1=2023-09-01&d2=2023-12-01');
    c = await b.json();

    expect(a).toEqual(c);
}, 10000);

test('get stock splits calendar with country argument', async () => {
    a = await te.getStockSplits(country='United States');
    b = await fetch('https://api.tradingeconomics.com/splits/country/United States?c=guest:guest&f=json');
    c = await b.json();

    expect(a).toEqual(c);
}, 10000);

test('get stock splits calendar with country and date argument', async () => {
    a = await te.getStockSplits(country='United States', start_date='2023-09-01', end_date='2023-12-01');
    b = await fetch('https://api.tradingeconomics.com/splits/country/United States?c=guest:guest&f=json&d1=2023-09-01&d2=2023-12-01');
    c = await b.json();

    expect(a).toEqual(c);
}, 10000);

test('get stock splits calendar with ticker argument', async () => {
    a = await te.getStockSplits(ticker='MMET');
    b = await fetch('https://api.tradingeconomics.com/splits/ticker/MMET?c=guest:guest&f=json');
    c = await b.json();

    expect(a).toEqual(c);
}, 10000);

test('get stock splits calendar with ticker and date argument', async () => {
    a = await te.getStockSplits(ticker='MMET', start_date='2023-09-01', end_date='2023-12-01');
    b = await fetch('https://api.tradingeconomics.com/splits/ticker/MMET?c=guest:guest&f=json&d1=2023-09-01&d2=2023-12-01');
    c = await b.json();

    expect(a).toEqual(c);
}, 10000);