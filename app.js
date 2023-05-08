const Key = '9e2354523f47742c859113b58b955ac1' ;

const liveTempAndCity = document.querySelector(".liveTempAndCity p");
const currentLocation = document.querySelector(".currentConditionHeader h1");
const currentTime = document.querySelector(".currentConditionHeader span");
const tempHeading = document.getElementById('temp');
const liveCond = document.getElementById('condition');
const minTemp = document.getElementById('minTemp');
const maxTemp = document.getElementById('maxTemp');
const conditionImg = document.getElementById('conditionImg');

// condition section

const city1 = document.querySelector("#showWeather h3 span");
const feelLike = document.getElementById('feel');
const highLow = document.getElementById('highLow');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');

const kelvin = 273 ;
var city = "Delhi" ;
var temp = 27 ;
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() ;
currentTime.innerHTML = "As of " + time + " IST" ;

setInterval(()=>{
    today = new Date();
    time = today.getHours() + ":" + today.getMinutes() ;
    currentTime.innerHTML = "As of " + time + " IST" ;
} , 1000)


// navigator.geolocation.getCurrentPosition();

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    liveTempAndCity.style.display = "block";
    liveTempAndCity.innerHTML = "Browser doesn't Support Geolocation";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    console.log(latitude + ' and ' + longitude) ;
    getWeather(latitude, longitude);
}

function showError(error){
    liveTempAndCity.style.display = "block";
    liveTempAndCity.innerHTML = ` ${error.message} `;
}

function getWeather(latitude, longitude){
    // let api = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${Key}`;
    let forcastApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${Key}` ;
    
    // fetch(api)
    //     .then(function(response){
    //         let data = response.json();
    //         return data;
    //     })
    //     .then(function(data){
    //         console.log(data) ;
    //     })


    fetch(forcastApi)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        // console.log("new Forcast " + data.list) ;
            // console.log(data) ;
        console.log(data) ;
        temp = Math.floor(data.list[0].main.temp - kelvin)  + '°C ' ;
        city = data.city.name +', ' + data.city.country;
        liveTempAndCity.innerHTML = temp + city;
        currentLocation.innerHTML = city  ;
        tempHeading.innerHTML = temp ;
        liveCond.innerHTML = data.list[0].weather[0].main ;
        minTemp.innerHTML = 'Min Temp : ' + Math.floor(data.list[0].main.temp_min - kelvin)  + '°C ' ;
        maxTemp.innerHTML = 'Max Temp : ' + Math.floor(data.list[0].main.temp_max - kelvin)  + '°C ' ;
        conditionImg.src = "img/icons/" + data.list[0].weather[0].icon +".png"
        setCondition(data);
        setHourlyForcast(data);
    });
}

function setCondition(data){
    city1.innerHTML = city ;
    feelLike.innerHTML = ' ' + Math.floor(data.list[0].main.feels_like - kelvin) + '° ';
    highLow.innerHTML = Math.floor(data.list[0].main.temp_max - kelvin)  + '°C /' +  Math.floor(data.list[0].main.temp_min - kelvin)  + '°C ' ;
    wind.innerHTML =  data.list[0].wind.speed + ' km/h'; 
    humidity.innerHTML = data.list[0].main.humidity + "%" ;
    pressure.innerHTML = data.list[0].main.pressure + " mb" ;
    visibility.innerHTML = data.list[0].visibility ;

    var timestamp = data.city.sunrise ;
    var timestamp1 = data.city.sunset ;

    var date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var sunriseTime = hours + ':' + minutes.substr(-2) ;

    date = new Date(timestamp1 * 1000);
    // Hours part from the timestamp
    hours = date.getHours();
    // Minutes part from the timestamp
    minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var sunsetTime = hours + ':' + minutes.substr(-2) ;

    sunrise.innerHTML = sunriseTime ;
    sunset.innerHTML = sunsetTime ;

}

function setHourlyForcast(data){
    const forcastTime = document.getElementsByClassName('forcastTime');
    const forcastTemp = document.getElementsByClassName('forcastTemp');
    const forcastCondition = document.getElementsByClassName('forcastCondition');
    const forcastHumidity = document.getElementsByClassName('forcastHumidity');

    for(let i = 0 ; i<5 ; i++){
        forcastTemp[i].innerHTML = Math.floor(data.list[i].main.temp - kelvin)  + '°C ' ;
        forcastCondition[i].src = "img/icons/" + data.list[i].weather[0].icon +".png" ;
        forcastHumidity[i].innerHTML = data.list[i].main.humidity  + "%" ;
        let text = data.list[i].dt_txt ;
        let timeinH =  text.substring(10, text.length -3);
        forcastTime[i].innerHTML = timeinH;

    }

}