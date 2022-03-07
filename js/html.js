export function setAdditionalHTMLOptions() {
    const tabs = document.body.querySelectorAll('a');
    for (let tab of tabs) {
        tab.addEventListener('click', setActive);
    }
}

function setActive(event) {
    if (transitionNow.classList.contains('active_tab')) {
        transitionNow.classList.remove('active_tab')
    }
    else {
        if (transitionDetails.classList.contains('active_tab')) {
            transitionDetails.classList.remove('active_tab')
        }
        else transitionForecast.classList.remove('active_tab')
    }
    event.currentTarget.classList.add('active_tab');
}

export function clearSearchOnUI() {
    searchCity.value = '';
}

export function weatherTabs(answer) {
    if (answer.cod === '404') {
        return new Promise(function (resolve, reject) {
            reject(new Error('city not found'))
        })
    }
    weatherNow(answer)
}

function weatherNow(answer) {
    nowTemprature.textContent = `${(answer.main.temp - 273.15).toFixed(1)}°`;
    currentCity.textContent = `${answer.name}`;
    switch (answer.weather[0].main) {
        case 'Clear': backGround(iconWeather['clear sky']);
            break;
        case 'Clouds': backGround(iconWeather['scattered clouds']);
            break;
        case 'Drizzle': backGround(iconWeather['shower rain']);
            break;
        case 'Rain': backGround(iconWeather['rain']);
            break;
        case 'Thunderstorm': backGround(iconWeather['thunderstorm']);
            break;
        case 'Snow': backGround(iconWeather['snow']);
            break;
        default: backGround(iconWeather['mist']);
            break;
    }
}

function backGround(url) {
    Now.style = `background: url(${url}) 50% 50%/80px 80px no-repeat`;
}

const iconWeather = {
    'clear sky': 'http://openweathermap.org/img/wn/01d@2x.png',
    'scattered clouds': 'http://openweathermap.org/img/wn/03d@2x.png',
    'shower rain': 'http://openweathermap.org/img/wn/09d@2x.png',
    'rain': 'http://openweathermap.org/img/wn/10d@2x.png',
    'thunderstorm': 'http://openweathermap.org/img/wn/11d@2x.png',
    'snow': 'http://openweathermap.org/img/wn/13d@2x.png',
    'mist': 'http://openweathermap.org/img/wn/50n@2x.png',
}

