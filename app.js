const Key = '9e2354523f47742c859113b58b955ac1' ;

const notificationElement = document.querySelector(".notification p");

var temp ;
const kelvin = 273 ;

// navigator.geolocation.getCurrentPosition();

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    console.log(latitude + ' and ' + longitude) ;
    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            console.log(data) ;
            notificationElement.innerHTML = Math.floor(data.main.temp - kelvin)  + '°C ' +  data.name +', ' + data.sys.country;
            // weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            // weather.description = data.weather[0].description;
            // weather.iconId = data.weather[0].icon;
            // weather.city = data.name;
            // weather.country = data.sys.country;
        });
}