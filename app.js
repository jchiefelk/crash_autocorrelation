const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
let Correlation = require('./correlation');
app.set('port',process.env.PORT || 3000);
app.use(express.static(path.resolve(__dirname,'./','bundle')));
app.get('*',(req,res)=>{
	res.sendFile(path.resolve(__dirname,'./','bundle'));
});

let crashHistory = {
	'one': 'https://www.quandl.com/api/v3/datasets/BCHARTS/BITSTAMPUSD.json?api_key=oaWPkjrfz_aQmyPmE-WT&start_date=2012-07-30&end_date=2012-08-31', //0->15
	'two': 'https://www.quandl.com/api/v3/datasets/BCHARTS/BITSTAMPUSD.json?api_key=oaWPkjrfz_aQmyPmE-WT&start_date=2013-03-16&end_date=2013-05-16', //
	'three': 'https://www.quandl.com/api/v3/datasets/BCHARTS/BITSTAMPUSD.json?api_key=oaWPkjrfz_aQmyPmE-WT&start_date=2013-07-01&end_date=2015-05-01'
};

let crashData = {
	'one': {
		history: null,
		correlation: null
	},
	'two': {
		history: null,
		correlation: null
	},
	'three': {
		history: null,
		correlation: null
	}
};

app.get('/api', function(req,res){
       
	fetch(crashHistory.one,{
		method: 'get',
		mode: 'cors'
	})
	.then((response) => typeof response == 'object' ? response.json() : {} )
	.then((responseJson)=>{
		crashData.one['history'] = responseJson.dataset.data;
		return Correlation.quandl_autocorrelation(responseJson.dataset.data);
	})
	.then((results)=>{
		crashData.one['correlation'] = results;

		return fetch(crashHistory.two,{
			method: 'get',
			mode: 'cors'
		})
	})
	.then((response) => typeof response == 'object' ? response.json() : {} )
	.then((responseJson)=>{
		crashData.two['history'] = responseJson.dataset.data;
		return Correlation.quandl_autocorrelation(responseJson.dataset.data);
	})
	.then((results)=>{
		// 0->15 crash
		crashData.two['correlation'] = results;
		return fetch(crashHistory.three,{
			method: 'get',
			mode: 'cors'
		})
	})
	.then((response)=> typeof response == 'object' ? response.json() : {} )
	.then((responseJson)=>{
		crashData.three['history'] = responseJson.dataset.data;
		return Correlation.quandl_autocorrelation(responseJson.dataset.data)
	})
	.then((results)=>{
		crashData.three['correlation'] = results;
		res.json({crashdata: crashData}); 
	})
	.catch((err)=>{
		console.log(err);
		res.json({error: error});
		next(error);
	})
       
});


app.listen(app.get('port'), ()=>{
	console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});