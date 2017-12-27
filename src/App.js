import React, {Component} from 'react';
var MarketGraph = require('./marketgraph');
var API = require('./api_utls');
require('./css/main.css');

export default class App extends Component {
	
	constructor(){
		super();
		this.state = {
			crashdata: null
		}
	}

	componentDidMount(){
		API.getCrashAnalysis()
		.then((data)=>{
			this.setState({crashdata: data})
		})
	}

	renderBitcoinHistory(){
		if(this.state.crashdata==null){
			return MarketGraph.setLoadingAnimation(this.state.crashdata);

		} else if (this.state.crashdata!=null) {
			return MarketGraph.setBitcoinGraph(this.state.crashdata);
		}

	}

	render(){


		return (
			<div className="marketpage">
				{this.renderBitcoinHistory()}
			</div>
		);
	}

};