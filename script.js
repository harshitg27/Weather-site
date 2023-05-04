// const url = 'https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=Seattle';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'ccaa4dd712mshb5a81489b6c6bc8p1028b4jsnb9414f66402b',
// 		'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
// 	}
// };
var city = 'Delhi' ;
const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city ;
// const url = 'https://api.api-ninjas.com/v1/weather?city=' + city ;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ccaa4dd712mshb5a81489b6c6bc8p1028b4jsnb9414f66402b',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

// const response = fetch(url, options);
// response.then((value) =>{
// 	return value.json();
// }).then((value) =>{
// 	console.log(value) ;
// })


try {
    async function run(){
        const response = await fetch(url, options);
	    const result = await response.json();
	    console.log(result);
    }

    run() ;
	
} catch (error) {
	console.error(error);
}
