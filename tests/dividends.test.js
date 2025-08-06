const te = require('tradingeconomics');
const fetch = require('node-fetch')

te.login('guest:guest');

test('getDividends no arguments', async () => {
    a = await te.getDividends();
    b = await fetch('https://api.tradingeconomics.com/dividends?c=guest:guest&f=json');
    c = await b.json();

    expect(a).toEqual(c);
}, 20000);

test('getDividends with symbol argument', async () => {
    a = await te.getDividends(symbol='aapl:us');
    b = await fetch('https://api.tradingeconomics.com/dividends/symbol/aapl:us?c=guest:guest&f=json');
    c = await b.json();

    expect(a).toEqual(c);
}, 20000);

test('getDividends with symbol and start_date arguments', async () => {
    a = await te.getDividends(symbol='aapl:us', start_date='2018-01-01');
    b = await fetch('https://api.tradingeconomics.com/dividends/symbol/aapl:us?c=guest:guest&f=json&d1=2018-01-01');
    c = await b.json();

    expect(a).toEqual(c);
}, 20000);

test('getDividends with symbol, start_date and end_date arguments', async () => {
    a = await te.getDividends(symbol='aapl:us', start_date='2018-01-01', end_date='2019-01-01');
    b = await fetch('https://api.tradingeconomics.com/dividends/symbol/aapl:us?c=guest:guest&f=json&d1=2018-01-01&d2=2019-01-01');
    c = await b.json();

    expect(a).toEqual(c);
}, 20000);
