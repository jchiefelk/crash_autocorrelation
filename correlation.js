let Promise = require('bluebird');
const autocorrelation = require('./build/Release/autocorrelation');
const fetch = require('node-fetch');


function Correlation(){
	this.data = {
		date: null,
		close: null,
		volume: null
	};
}; 

let crashHistory = {
	'one': 'https://www.quandl.com/api/v3/datasets/BCHARTS/BITSTAMPUSD.json?api_key=oaWPkjrfz_aQmyPmE-WT&start_date=2012-06-25&end_date=2012-09-21', //0->15
	'two': 'https://www.quandl.com/api/v3/datasets/BCHARTS/BITSTAMPUSD.json?api_key=oaWPkjrfz_aQmyPmE-WT&start_date=2013-02-01&end_date=2013-06-01', //
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

Correlation.prototype.bitcoinaverage_autocorrelation = function(data){

	let object = {	
		'close': []
	};

	for(let key in data.bpi){
		object.close.push(data.bpi[key]);
	};

	//console.log(this.data.close.length);
	return new Promise(function(resolve,reject){
		autocorrelation(object,function(results){
			resolve(results);
		});
	});
};
/* gdax data structure
-time bucket start time
-low lowest price during the bucket interval
-high highest price during the bucket interval
-open opening price (first trade) in the bucket interval
-close closing price (last trade) in the bucket interval
-volume volume of trading activity during the bucket interval
*/

Correlation.prototype.gdax_autocorrelation = function(data){

	let object = {	
		'close': []
	};

	for(let x=0;x<data.length;x++){
		//console.log(data[x][4]);
		object.close.push(data[x][4]);
	};

	return new Promise(function(resolve,reject){
		autocorrelation(object,function(results){
			resolve(results);
		});
	});
};

Correlation.prototype.quandl_autocorrelation = function(data){

	let object = {	
		'close': []
	};

	for(let x=0;x<data.length;x++){
		object.close.push(data[x][4]);
	};

	return new Promise(function(resolve,reject){
		autocorrelation(object,function(results){
			resolve(results);
		});
	});
};


module.exports = new Correlation();

/**
let Autocorrelation = new Correlation();

fetch(crashHistory.one,{
	method: 'get',
	mode: 'cors'
})
.then((response) => typeof response == 'object' ? response.json() : {} )
.then((responseJson)=>{
	crashData.one['history'] = responseJson.dataset.data;
	return Autocorrelation.quandl_autocorrelation(responseJson.dataset.data);
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
	return Autocorrelation.quandl_autocorrelation(responseJson.dataset.data);
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
	return Autocorrelation.quandl_autocorrelation(responseJson.dataset.data)
})
.then((results)=>{
	crashData.three['correlation'] = results;

})
.catch((err)=>{console.log(err)})
***/

//let url = 'https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=daily&?format=json';
/**
let url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-01-01&end=2017-12-01';
fetch(url,{
	method: 'get',
	mode: 'cors'
})
.then((response) => typeof response == 'object' ? response.json() : {} )
.then((responseJson)=>{
	return Autocorrelation.bitcoinaverage_autocorrelation(responseJson);
})
.then((results) => {
	console.log(results);
})
.catch((err) =>{
	console.log(err);
});
**/

/**gdax
let url = 'https://api.gdax.com/products/BTC-USD/candles?format(2015-06-01, 2017-06-01,500000)';
fetch(url,{
	method: 'get',
	mode: 'cors'
})
.then((response) => typeof response == 'object' ? response.json() : {} )
.then((responseJson)=>{
	return Autocorrelation.gdax_autocorrelation(responseJson);
})
.then((results) => {
	// console.log(results);
})
.catch((err) =>{
	console.log(err);
});
**/
    