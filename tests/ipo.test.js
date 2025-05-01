const te = require('tradingeconomics');
const fetch = require('node-fetch')

te.login('guest:guest');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('getIpo', () => {
    beforeEach(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    });

    test('getIpo no arguments', async () => {
        a = await te.getIpo();
        await sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/ipo?c=guest:guest&f=json');
        await sleep(3000)
        c  = await b.json();

        expect(a).toEqual(c);
        await sleep(3000)
    }, 100000);

    test('getIpo with ticker argument', async () => {
        a = await te.getIpo(ticker = 'SWIN');
        await sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/ipo/ticker/SWIN?c=guest:guest&f=json');
        await sleep(3000)
        c  = await b.json();

        expect(a).toEqual(c);
        await sleep(3000)
    }, 100000);

    test('getIpo with country argument', async () => {
        a = await te.getIpo(country = 'United States');
        await sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/ipo/country/United States?c=guest:guest&f=json');
        await sleep(3000)
        c  = await b.json();

        expect(a).toEqual(c);
        await sleep(3000)
    }, 100000);

    test('getIpo with country and date argument', async () => {
        a = await te.getIpo(country = 'United States', start_date = '2023-09-01', end_date = '2023-12-01');
        await sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/ipo/country/United States?c=guest:guest&f=json&d1=2023-09-01&d2=2023-12-01');
        await sleep(3000)
        c  = await b.json();

        expect(a).toEqual(c);
        await sleep(3000)
    }, 100000);

    test('getIpo with ticker and date argument', async () => {
        a = await te.getIpo(ticker = 'SWIN', start_date = '2023-09-01', end_date = '2023-12-01');
        await sleep(3000)
        b = await fetch('https://api.tradingeconomics.com/ipo/ticker/SWIN?c=guest:guest&f=json&d1=2023-09-01&d2=2023-12-01');
        await sleep(3000)
        c  = await b.json();

        expect(a).toEqual(c);
        await sleep(3000)
    }, 100000);

})
