const API_Key = `a3d920588979b5918618869e7058b5f4`;
const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryE1 = document.getElementById('country');
const weatherForecastE1 = document.getElementById('weather-forecast');
const currentTempE1 = document.getElementById('current-temp');

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

setInterval(() =>{
        const time = new Date();
        const month = time.getMonth();
        const date  = time.getDate();
        const day = time.getDay();
        const hour = time.getHours();
        const hoursIn12HrFormat = hour >= 13 ? hour %12 : hour;
        const minutes = time.getMinutes();
        const ampm = hour >=12 ? 'PM' : 'AM';


        timeE1.innerHTML = (hoursIn12HrFormat <10? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ":" + (minutes <10? '0'+ minutes:minutes) + '' +`<span id="am-pm">${ampm}</span>`;

        dateE1.innerHTML = days[day] +' ,' + date + ' ' + months[month]

},1000);


function getWeqatherData() {
    navigator.geolocation.getCurrentPosition((success)=>{
       let{latitude, longitude } = success.coords;
       fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_Key}`).then(res => res.json()).then(data =>{
           console.log(data)
           showWeatherData(data);
       })
    })
}
getWeqatherData()

function showWeatherData (data){
    let{humidity, pressure, sunrise, sunset, wind_speed,} = data.current;


    timezoneinnerHTML = data.timezone;
    countryE1.innerHTML = data.lat + 'N ' + data.lon + 'E'

    currentWeatherItemsE1.innerHTML = `<div class="weather-items">
    <div class="humidity">Humidity</div>
    <div>${humidity} %rh</div>
</div>
<div class="weather-items">
    <div class="pressure">pressure</div>
    <div>${pressure} hPa</div>
</div>
<div class="weather-items">
    <div class="w-speed">wind speed</div>
    <div>${wind_speed} m/s</div>
</div>
<div class="weather-items">
    <div class="w-speed">Sun Rise</div>
    <div>${window.moment(sunrise*1000).format(`hh:mm a`)}</div>
</div>
<div class="weather-items">
    <div class="w-speed">SUn Set</div>
    <div>${window.moment(sunset*1000).format(`hh:mm a`)}</div>
</div>`;

let otherDayForecast = '';

data.daily.forEach((day, idx)=>{
    if(idx==0){
        currentTempE1.innerHTML = `
        <div class="today" id="current-temp">
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather-icon" class="w-icon">
                
                <div class="other">
                   
                    <div class="day">${window.moment(day.dt*1000).format(`ddd`)}</div>
                    <div class="temp">Night -${day.temp.night}&#176;C</div>
                    <div class="temp">Day - ${day.temp.day}&#176;C</div>
                </div>
              
        `
    }else{
        otherDayForecast += ` <div class="weather-forecast-item" id="weather-forecast">
        <div class="day">${window.moment(day.dt*1000).format(`ddd`)}</div>    
         <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" alt="weather-icon" class="w-icon">
        <div class="temp">Night - ${day.temp.night}&#176;C</div>
         <div class="temp">Day - ${day.temp.day}&#176;C</div>

    </div>
    `
    }
})
weatherForecastE1.innerHTML = otherDayForecast;
    
}

