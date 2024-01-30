# How to run

The basic tests have the following pattern: 

* Fetch data from Trading Economics API through the node package:

`let a = await te.getCalendar(importance='1', values=true);`

* Fetch data through the API URL directly:

`let b = await fetch('https://api.tradingeconomics.com/calendar/?c=guest:guest&f=json&importance=1&values=true');`  
`let c = await b.json();`

* Compare the 2 results:

expect(a).toEqual(c);

To run all tests `npm test --`
To run specific tests `npm test -- stockSplits.test.js`


**Note:** Sometimes testing results in a temporary block from TE.