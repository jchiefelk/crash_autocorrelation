
class API {
	

	getCrashAnalysis(){
		return fetch('/api',{
			method: 'get',
			mode: 'cors'
		})
		.then((response) => {return response.json()} )
		.then((data)=> {return data.crashdata})
		.catch((err)=> {console.log(err)})
	}

}

module.exports = new API();