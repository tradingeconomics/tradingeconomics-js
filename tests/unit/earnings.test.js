jest.mock('https');
const https = require('https');
const te = require('tradingeconomics');

const TEST_KEY = 'testkey:testsecret';

beforeAll(() => { te.login(TEST_KEY); });
beforeEach(() => {
    https.get.mockImplementation((url, callback) => {
        const res = { on: jest.fn((ev, fn) => { if (ev === 'data') fn(JSON.stringify([])); if (ev === 'end') fn(); return res; }) };
        callback(res);
        return { on: jest.fn() };
    });
    global.symbol = null;
    global.country = null;
    global.type = null;
    global.start_date = null;
    global.end_date = null;
    global.index = null;
    global.sector = null;
});
afterEach(() => { jest.clearAllMocks(); });

describe('getEarnings', () => {
    test('no arguments', async () => {
        await te.getEarnings();
        expect(https.get.mock.calls[0][0]).toBe('https://api.tradingeconomics.com/earnings-revenues?c=' + TEST_KEY);
    });
    test('with symbol', async () => {
        await te.getEarnings(symbol = 'CMCSA:US');
        expect(https.get.mock.calls[0][0]).toBe('https://api.tradingeconomics.com/earnings-revenues/symbol/CMCSA%3AUS?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getEarnings(country = 'united states');
        expect(https.get.mock.calls[0][0]).toBe('https://api.tradingeconomics.com/earnings-revenues/country/united%20states?c=' + TEST_KEY);
    });
    test('with symbol and dates', async () => {
        await te.getEarnings(symbol = 'FARM:US', start_date = '2018-02-01', end_date = '2018-03-01');
        expect(https.get.mock.calls[0][0]).toBe('https://api.tradingeconomics.com/earnings-revenues/symbol/FARM%3AUS?c=' + TEST_KEY + '&d1=2018-02-01&d2=2018-03-01');
    });
});
