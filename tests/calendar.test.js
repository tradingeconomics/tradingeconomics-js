const te = require('tradingeconomics');
const fetch = require('node-fetch');

te.login('guest:guest');

describe('getCalendar', () => {

    beforeEach(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    });

    test('getCalendar with country and start_date and end_date argument', async () => {
        let a = await te.getCalendar(country=['united states', 'china'], start_date='2016-02-01', end_date='2016-02-10');
        let b = await fetch('https://api.tradingeconomics.com/calendar/country/united states,china/2016-02-01/2016-02-10?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendar with country, indicator,start_date and end_date argument', async () => {
        let a = await te.getCalendar(country='united states', indicator=['Initial Jobless Claims'], start_date='2024-02-01', end_date='2024-03-30');
        let b = await fetch('https://api.tradingeconomics.com/calendar/country/united states/indicator/Initial Jobless Claims/2024-02-01/2024-03-30?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendar with country and indicator argument', async () => {
        let a = await te.getCalendar(country=['united states'], indicator=['Initial Jobless Claims']);
        let b = await fetch('https://api.tradingeconomics.com/calendar/country/united states/indicator/Initial Jobless Claims?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendar with indicator and start_date and end_date argument', async () => {
        let a = await te.getCalendar(indicator='inflation rate', start_date='2016-03-01', end_date='2016-03-03');
        let b = await fetch('https://api.tradingeconomics.com/calendar/indicator/inflation rate/2016-03-01/2016-03-03?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendar indicator argument', async () => {
        let a = await te.getCalendar(indicator='inflation rate');
        let b = await fetch('https://api.tradingeconomics.com/calendar/indicator/inflation rate?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendar with ticker and start_date and end_date argument', async () => {
        let a = await te.getCalendar(ticker='IJCUSA', start_date='2016-02-01', end_date='2016-02-10');
        let b = await fetch('https://api.tradingeconomics.com/calendar/ticker/IJCUSA/2016-02-01/2016-02-10?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendar with multiple id argument', async () => {
        let a = await te.getCalendar(id=['174108','160025','160030']);
        let b = await fetch('https://api.tradingeconomics.com/calendar/calendarid/174108,160025,160030?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendar with id argument', async () => {
        let a = await te.getCalendar(id='174108');
        let b = await fetch('https://api.tradingeconomics.com/calendar/calendarid/174108?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendar with ticker argument', async () => {
        let a = await te.getCalendar(ticker = 'IJCUSA');
        let b = await fetch('https://api.tradingeconomics.com/calendar/ticker/IJCUSA?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendar with multiple ticker argument', async () => {
        let a = await te.getCalendar(ticker=['IJCUSA', 'SPAINFACORD', 'BAHRAININFNRATE']);
        let b = await fetch('https://api.tradingeconomics.com/calendar/ticker/IJCUSA,SPAINFACORD,BAHRAININFNRATE?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendar with multiple countries', async () => {
        let a = await te.getCalendar(country=['united states', 'china']);
        let b = await fetch('https://api.tradingeconomics.com/calendar/country/united states,china?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendar with start_date and end_date argument', async () => {
        a = await te.getCalendar(start_date = '2016-02-01', end_date = '2016-02-10');
        b = await fetch('https://api.tradingeconomics.com/calendar/country/All/2016-02-01/2016-02-10?c=guest:guest&f=json');
        c = await b.json();

        expect(a).toEqual(c);
    }, 10000);
    
    test('getCalendar with country argument', async () => {
        let a = await te.getCalendar(country=['united states']);
        let b = await fetch('https://api.tradingeconomics.com/calendar/country/united states?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);
    

    test('getCalendar no arguments', async () => {
        let a = await te.getCalendar();
        let b = await fetch('https://api.tradingeconomics.com/calendar?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('get calendar event with country and event argument', async () => {
        let a = await te.getCalendar(country=['United States'], event='GDP Growth Rate QoQ Final', start_date='2016-12-01', end_date='2024-02-25');

        let b = await fetch('https://api.tradingeconomics.com/calendar/country/united states/event/GDP Growth Rate QoQ Final/2016-12-01/2024-02-25?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('get calendar event with events argument', async () => {
        let a = await te.getCalendar(country='United States', event='GDP Growth Rate QoQ Final', start_date='2016-12-01', end_date='2024-02-25');
        let b = await fetch('https://api.tradingeconomics.com/calendar/country/united states/event/GDP Growth Rate QoQ Final/2016-12-01/2024-02-25?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('get calendar event with multiple events argument', async () => {
        let a = await te.getCalendar(country='United States', event=['GDP Growth Rate QoQ Final'], start_date='2016-12-01', end_date='2024-02-25');
        let b = await fetch('https://api.tradingeconomics.com/calendar/country/united states/event/GDP Growth Rate QoQ Final/2016-12-01/2024-02-25?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendar with importance and values argument', async () => {
        const te = require('tradingeconomics');
        event = null;
        let a = await te.getCalendar(importance='1', values=true);
        let b = await fetch('https://api.tradingeconomics.com/calendar?c=guest:guest&f=json&importance=1&values=true');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

})

describe('getCalendarEventsByGroup', () => {
    beforeEach(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    });

    test('getCalendarEventsByGroup with start_date argument', async () => {
        let a = await te.getCalendarEventsByGroup(group='bonds', start_date='2023-01-01');
        let b = await fetch('https://api.tradingeconomics.com/calendar/group/bonds/2023-01-01?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendarEventsByGroup with end_date argument', async () => {
        let a = await te.getCalendarEventsByGroup(group='bonds', end_date='2023-01-01');
        let b = await fetch('https://api.tradingeconomics.com/calendar/group/bonds/2023-01-01?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);
    
    test('getCalendarEventsByGroup', async () => {
        let a = await te.getCalendarEventsByGroup(group='bonds');
        let b = await fetch('https://api.tradingeconomics.com/calendar/group/bonds?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendarEventsByGroup with country arguments', async () => {
        let a = await te.getCalendarEventsByGroup(group='bonds', country=['united states']);
        let b = await fetch('https://api.tradingeconomics.com/calendar/country/united states/group/bonds/?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);
    
    test('getCalendarEventsByGroup with dates arguments', async () => {
        let a = await te.getCalendarEventsByGroup(group='bonds', start_date='2023-01-01', end_date='2023-12-01');
        let b = await fetch('https://api.tradingeconomics.com/calendar/group/bonds/2023-01-01/2023-12-01?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendarEventsByGroup with country and dates arguments', async () => {
        let a = await te.getCalendarEventsByGroup(group='bonds', country='united states', end_date='2023-12-01', start_date='2023-01-01');
        let b = await fetch('https://api.tradingeconomics.com/calendar/country/united states/group/bonds/2023-01-01/2023-12-01?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendarEventsByGroup with invalid group argument', async () => {
        try{
            await te.getCalendarEventsByGroup(group=123);
        }catch (error){
            expect(error).toEqual('Error! Wrong group argument: 123');
        }
    }, 10000);

    test('getCalendarEventsByGroup setting start_date bigger than end_date', async () => {
        try{
            await te.getCalendarEventsByGroup(group='bonds', start_date='2023-12-01', end_date='2023-01-01');
        }catch (error){
            expect(error).toEqual(thrownError = new Error("Start date cannot be bigger than end date"));
        }
    }, 10000);
    
})

describe('getCalendarEvents', () => {
    beforeEach(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    });

    test('getCalendarEvents', async () => {
        let a = await te.getCalendarEvents();
        let b = await fetch('https://api.tradingeconomics.com/calendar/events?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    test('getCalendarEvents with country argument', async () => {
        let a = await te.getCalendarEvents(country='United States');
        let b = await fetch('https://api.tradingeconomics.com/calendar/events/country/united states?c=guest:guest&f=json');
        let c = await b.json();

        expect(a).toEqual(c);
    }, 10000);

    
})