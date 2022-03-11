import {
    backGroundIcon,
    addEvent,
    SELECTED_CITIES,
    dateFromString,
    time,
    temperatureDegrees,
    changeContentOnUI,
    isActiveNow,
    makeInactive,
    target,
    setStyle,
    deleteIcon,
    weatherIconURL,
} from './const.js';
//---------------------------------------------------------//
import {
    serverRequest,
    compilationURLCurrentWeather,
    compilationURLForecast,
} from './server.js'
//---------------------------------------------------------//
export function clearSearchOnUI() {
    searchCity.value = '';
}

export function setActive(event) {
    if (isActiveNow(transitionNow)) {
        makeInactive(transitionNow);
    }
    else {
        if (isActiveNow(transitionDetails)) {
            makeInactive(transitionDetails);
        }
        else makeInactive(transitionForecast);
    }
    setStyle(target(event), 'active_tab');
}

export function weatherOnUI(city) {
    const serverAnswer = serverRequest(compilationURLCurrentWeather(city));
    serverAnswer.then(answer => weatherTabs(answer)).catch(alert);

}

function weatherTabs(answer) {
    const answerIsNotValid = (answer.cod === '404');
    if (answerIsNotValid) {
        return new Promise(function (resolve, reject) {
            reject(new Error('city not found'))
        });
    }
    weatherNow(answer);
    weatherDetails(answer);
    weatherForecast(answer);
}

function weatherNow(answer) {
    changeContentOnUI(nowTemprature, temperatureDegrees(answer.main.temp));
    changeContentOnUI(currentCityNow, answer.name)
    Now.style = backGroundIcon(answer["weather"][0]["icon"]);
}

function weatherDetails(answer) {
    changeContentOnUI(currentCityDetails, answer.name);
    changeContentOnUI(detailsTemprature, temperatureDegrees(answer.main.temp));
    changeContentOnUI(detailsFeelsLike, temperatureDegrees(answer.main.feels_like));
    changeContentOnUI(detailsWeather, answer.weather[0].main);
    changeContentOnUI(detailsSunrise, time(answer.sys.sunrise));
    changeContentOnUI(detailsSunset, time(answer.sys.sunset));
}

function weatherForecast(answer) {
    const serverAnswerForecast = serverRequest(compilationURLForecast(answer));
    serverAnswerForecast.then(answerForecast => forecastOnUi(answerForecast));
}

function forecastOnUi(answer) {
    if (forecastList.hasChildNodes()) {
        forecastList.remove();
        const list = document.createElement('ul');
        list.id = 'forecastList';
        Forecast.append(list);
    }
    changeContentOnUI(currentCityForecast, answer.city.name);
    for (let element of answer.list) {
        forecastElementOnUI(element);
    }
}

function forecastElementOnUI(element) {
    const forecastListElement = document.createElement('li');
    const elementBody = document.createElement('div');
    setStyle(elementBody, 'weather_Time');
    const topLeftElement = document.createElement('div');
    setStyle(topLeftElement, 'top_left');
    changeContentOnUI(topLeftElement, dateFromString(element.dt_txt));
    const bottomLeftElement = document.createElement('div');
    setStyle(bottomLeftElement, 'bottom_left');
    const bottomLeftList = document.createElement('ul');
    const firstBottomLeftListElement = document.createElement('li');
    changeContentOnUI(firstBottomLeftListElement, `Temperature: ${temperatureDegrees(element.main.temp)}°`);
    const secondBottomLeftListElement = document.createElement('li');
    changeContentOnUI(secondBottomLeftListElement, `Feels like: ${temperatureDegrees(element.main.feels_like)}°`);
    bottomLeftList.append(firstBottomLeftListElement, secondBottomLeftListElement);
    bottomLeftElement.append(bottomLeftList);
    const topRightElement = document.createElement('div');
    setStyle(topRightElement, 'top_right');
    changeContentOnUI(topRightElement, `${time(element.dt)}0`);
    const bottomRightElement = document.createElement('div');
    setStyle(bottomRightElement, 'bottom_right');
    const weatherBottomRightElement = document.createElement('span');
    setStyle(weatherBottomRightElement, 'block');
    changeContentOnUI(weatherBottomRightElement, `${element.weather[0].main}`);
    const imageBottomRightElement = document.createElement('img');
    imageBottomRightElement.src = weatherIconURL(element.weather[0].icon);
    bottomRightElement.append(weatherBottomRightElement, imageBottomRightElement);
    elementBody.append(topLeftElement, bottomLeftElement, topRightElement, bottomRightElement);
    forecastListElement.append(elementBody);
    forecastList.append(forecastListElement);
}

export function addOnUISelectedCitiesList(city) {
    const cityElement = document.createElement('li');
    setStyle(cityElement, 'city');
    const cityName = document.createElement('span');
    changeContentOnUI(cityName, city);
    addEvent(cityName, 'click', selectedCityOnUI);
    const removeIcon = document.createElement('img');
    setStyle(removeIcon, 'delete');
    removeIcon.src = deleteIcon;
    addEvent(removeIcon, 'click', removeCityOnUIfromSelectedList);
    cityElement.append(cityName, removeIcon);
    selectedCitiesList.append(cityElement);
}

function removeCityOnUIfromSelectedList(event) {
    const deletedCityName = target(event).previousSibling.textContent;
    SELECTED_CITIES.splice((SELECTED_CITIES.indexOf(deletedCityName)), 1);
    const deletedCityOnUI = target(event).parentElement;
    deletedCityOnUI.remove();
}

function selectedCityOnUI(event) {
    const selectedCity = target(event).textContent;
    weatherOnUI(selectedCity)
}