import {
    backGroundIcon,
    addEvent,
    SELECTED_CITIES,
    date,
    temperatureDegrees,
    changeContentOnUI,
    isActiveNow,
    makeInactive,
    target,
    setStyle,
} from './const.js';
//---------------------------------------------------------//
import {
    serverRequest,
    compilationURL,
} from './server.js'
//---------------------------------------------------------//
export function clearSearchOnUI() {
    searchCity.value = '';
}

export function weatherTabs(answer) {
    const answerIsNotValid = (answer.cod === '404');
    if (answerIsNotValid) {
        return new Promise(function (resolve, reject) {
            reject(new Error('city not found'))
        })
    }
    weatherNow(answer);
    weatherDetails(answer);
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
    changeContentOnUI(detailsSunrise, date(answer.sys.sunrise));
    changeContentOnUI(detailsSunset, date(answer.sys.sunset));
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

export function addOnUISelectedCitiesList(city) {
    const cityElement = document.createElement('li');
    setStyle(cityElement, 'city');
    const cityName = document.createElement('span');
    changeContentOnUI(cityName, city);
    addEvent(cityName, 'click', selectedCityOnUI);
    const removeIcon = document.createElement('img');
    setStyle(removeIcon, 'delete');
    removeIcon.src = './img/delete_icon.svg';
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

export function weatherOnUI(city) {
    const serverAnswer = serverRequest(compilationURL(city));
    serverAnswer.then(answer => console.log(answer));
    serverAnswer.then(answer => weatherTabs(answer)).catch(alert);
}