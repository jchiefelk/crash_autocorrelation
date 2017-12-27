import React from 'react';

import { Chart } from 'react-google-charts';



class MarketGraph {

	constructor(){

	}

	renderBitcoinCorrelationView(data){

			let cor_data = [["AutoCorrelation","Lag Times"]];
			let history = 'daily';
			for(let x=0;x<data.length;x++){
				cor_data.push([x, data[x]]);
			};
			let options = {
				    	title: "Bitcoin Price Autocorrelation",
						titleTextStyle: {
							color: 'black',    // any HTML string color ('red', '#cc00cc')
							fontName: 'Arial', // i.e. 'Times New Roman'
							fontSize: 18, // 12, 18 whatever you want (don't specify px)
							bold: false,    // true or false
							italic: false   // true of false
						},
						legend: "none",
						backgroundColor: 'transparent',
						vAxis: {
							title: "",	
							titleTextStyle: { color: 'black' },
				            
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 5,
						    	color: 'silver'
						   	}
				        },
					 	hAxis: {
							title: "",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'silver',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 5,
						    	color: 'transparent',
						    	opacity: '0.6'
						   	},
						   	format:	null
					 	}
		};

		return(

				<div className="cryptoexchangeview">
						<Chart
							chartType="LineChart"
							data={cor_data}
							width="100%"
							height="100%"
							options={options}
						/>
				</div>
		
		);
	}


	setBitcoinGraph(data){
		/** Quandl Data Structure
	     [ 'Date',
        'Open',
        'High',
        'Low',
        'Close',
        'Volume (BTC)',
        'Volume (Currency)',
        'Weighted Price' ],

		**/
			let plotdata = {
				crashonehistory:  [["DATE","Price"]],
				crashonecorrelation: [["AutoCorrelation","Lag Times"]],
				crashtwohistory:  [["DATE","Price"]],
				crashtwocorrelation: [["AutoCorrelation","Lag Times"]],
				crashthreehistory:  [["DATE","Price"]],
				crashthreecorrelation: [["AutoCorrelation","Lag Times"]]
			};
			for(let x=0;x<data.one.history.length;x++){
				plotdata.crashonehistory.push([new Date(data.one.history[x][0]), data.one.history[x][4]]);
				plotdata.crashonecorrelation.push([x, data.one.correlation[x]]);
			};



			for(let x=0;x<data.two.history.length; x++){
				plotdata.crashtwohistory.push([new Date(data.two.history[x][0]), data.two.history[x][4]]);
				plotdata.crashtwocorrelation.push([x, data.two.correlation[x]]);

			};


			for(let x=0;x<data.three.history.length; x++){
				plotdata.crashthreehistory.push([new Date(data.three.history[x][0]), data.three.history[x][4]]);
				plotdata.crashthreecorrelation.push([x, data.three.correlation[x]]);
			};


			let history_options = {
				    	title: "BTC/USD",
						titleTextStyle: {
							color: 'black',    // any HTML string color ('red', '#cc00cc')
							fontName: 'Arial', // i.e. 'Times New Roman'
							fontSize: 16, // 12, 18 whatever you want (don't specify px)
							bold: false,    // true or false
							italic: false   // true of false
						},
						legend: "none",
						backgroundColor: 'transparent',
						vAxis: {
							title: "",	
							titleTextStyle: { color: 'black' },
				            
				            viewWindowMode:'explicit',
				            /**
				            viewWindow:{
				                max: max,
				                min: min
				            },
							**/
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 2,
						    	color: 'silver'
						   	}
				        },
					 	hAxis: {
							title: "",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 5,
						    	color: 'transparent'
						   	},
						   	format:	null
					 	}
			};
			history_options.format = 'MMM d, y';

			let correlation_options = {
				    	title: "Bitcoin Price Autocorrelation",
						titleTextStyle: {
							color: 'black',    // any HTML string color ('red', '#cc00cc')
							fontName: 'Arial', // i.e. 'Times New Roman'
							fontSize: 16, // 12, 18 whatever you want (don't specify px)
							bold: false,    // true or false
							italic: false   // true of false
						},
						legend: "none",
						backgroundColor: 'transparent',
						vAxis: {
							title: "",	
							titleTextStyle: { color: 'black' },
				            
							baselineColor: 'transparent',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 5,
						    	color: 'silver'
						   	}
				        },
					 	hAxis: {
							title: "Lag (Trading Days)",	
							titleTextStyle: { color: 'black' },
							baselineColor: 'silver',
				        	textStyle: {
				        		fontSize: 12,
				        		fontName: 'Arial',
				        		color: 'black',
				        		fontWeight: 700,
				       
				        	},
				        	gridlines: {
						    	count: 5,
						    	color: 'transparent',
						    	opacity: '0.6'
						   	},
						   	format:	null
					 	}
		};

			return (
			<div>
				<div className="bitcoingraph">
					<Chart
						chartType="LineChart"
						data={plotdata.crashonehistory}
						width="100%"
						height="100%"
						options={history_options}
						/>
				</div>

				<div className="cryptoexchangeview">
						<Chart
							chartType="LineChart"
							data={plotdata.crashonecorrelation}
							width="100%"
							height="100%"
							options={correlation_options}
						/>
				</div>

				<div className="bitcoingraph">
					<Chart
						chartType="LineChart"
						data={plotdata.crashtwohistory}
						width="100%"
						height="100%"
						options={history_options}
						/>
				</div>

				<div className="cryptoexchangeview">
						<Chart
							chartType="LineChart"
							data={plotdata.crashtwocorrelation}
							width="100%"
							height="100%"
							options={correlation_options}
						/>
				</div>

				<div className="bitcoingraph">
					<Chart
						chartType="LineChart"
						data={plotdata.crashthreehistory}
						width="100%"
						height="100%"
						options={history_options}
						/>
				</div>

				<div className="cryptoexchangeview">
						<Chart
							chartType="LineChart"
							data={plotdata.crashtwocorrelation}
							width="100%"
							height="100%"
							options={correlation_options}
						/>
				</div>

			</div>
			);
	}

	setLoadingAnimation(){
		return (<div className="loader"></div>);
	}
}


module.exports = new MarketGraph();