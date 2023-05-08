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

currentTime.innerHTML = "As of " + time + " IST"

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
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}`;
    let forcastApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${Key}` ;
    

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
        });
}

function setCondition(data){
    city1.innerHTML = city ;
    feelLike.innerHTML = ' ' + Math.floor(data.list[0].main.feels_like - kelvin) + '° ';
    highLow.innerHTML = Math.floor(data.list[0].main.temp_max - kelvin)  + '°C /' +  Math.floor(data.list[0].main.temp_min - kelvin)  + '°C ' ;
    sunrise.innerHTML = data.city.sunrise ;
    sunset.innerHTML = data.city.sunset ;
    wind.innerHTML =  data.list[0].wind.speed + ' km/h'; 
    humidity.innerHTML = data.list[0].main.humidity + "%" ;
    pressure.innerHTML = data.list[0].main.pressure + " mb" ;
    visibility.innerHTML = data.list[0].visibility ;

}