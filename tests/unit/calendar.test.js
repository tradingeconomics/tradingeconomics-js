jest.mock('node-fetch');
const nodeFetch = require('node-fetch');
const te = require('tradingeconomics');

const TEST_KEY = 'testkey:testsecret';
const B = 'https://api.tradingeconomics.com';

beforeAll(() => { te.login(TEST_KEY); });
beforeEach(() => {
    nodeFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
    global.country = null;
    global.indicator = null;
    global.ticker = null;
    global.id = null;
    global.event = null;
    global.start_date = null;
    global.end_date = null;
    global.utc = null;
    global.importance = null;
    global.values = null;
    global.group = null;
    global.calendar = null;
});
afterEach(() => { jest.clearAllMocks(); });

describe('getCalendar', () => {
    test('no arguments', async () => {
        await te.getCalendar();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getCalendar(country = ['united states']);
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar/country/united states?c=' + TEST_KEY);
    });
    test('with multiple countries', async () => {
        await te.getCalendar(country = ['united states', 'china']);
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar/country/united states,china?c=' + TEST_KEY);
    });
    test('with country and dates', async () => {
        await te.getCalendar(country = ['united states', 'china'], start_date = '2016-02-01', end_date = '2016-02-10');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar/country/united states,china/2016-02-01/2016-02-10?c=' + TEST_KEY);
    });
    test('with indicator', async () => {
        await te.getCalendar(indicator = 'inflation rate');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar/indicator/inflation rate?c=' + TEST_KEY);
    });
    test('with ticker', async () => {
        await te.getCalendar(ticker = 'IJCUSA');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar/ticker/IJCUSA?c=' + TEST_KEY);
    });
    test('with dates only', async () => {
        await te.getCalendar(start_date = '2016-02-01', end_date = '2016-02-10');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar/country/All/2016-02-01/2016-02-10?c=' + TEST_KEY);
    });
    test('with importance', async () => {
        await te.getCalendar(importance = '1');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar?c=' + TEST_KEY + '&importance=1');
    });
    test('with importance and values=true', async () => {
        await te.getCalendar(importance = '1', values = true);
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar?c=' + TEST_KEY + '&importance=1&values=true');
    });
});

describe('getCalendarEventsByGroup', () => {
    test('with group only', async () => {
        await te.getCalendarEventsByGroup(group = 'bonds');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar/group/bonds/?c=' + TEST_KEY);
    });
    test('with group and start_date', async () => {
        await te.getCalendarEventsByGroup(group = 'bonds', start_date = '2023-01-01');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar/group/bonds/2023-01-01?c=' + TEST_KEY);
    });
    test('with group and both dates', async () => {
        await te.getCalendarEventsByGroup(group = 'bonds', start_date = '2023-01-01', end_date = '2023-12-01');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar/group/bonds/2023-01-01/2023-12-01?c=' + TEST_KEY);
    });
    test('rejects invalid group type', async () => {
        await expect(te.getCalendarEventsByGroup(group = 123)).rejects.toEqual('Error! Wrong group argument: 123');
    });
});

describe('getCalendarEvents', () => {
    test('no arguments', async () => {
        await te.getCalendarEvents();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar/events?c=' + TEST_KEY);
    });
    test('with country', async () => {
        await te.getCalendarEvents(country = 'United States');
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar/events/country/United States?c=' + TEST_KEY);
    });
});

describe('getCalendarUpdates', () => {
    test('no arguments', async () => {
        await te.getCalendarUpdates();
        expect(nodeFetch).toHaveBeenCalledWith(B + '/calendar/updates/?c=' + TEST_KEY);
    });
});
