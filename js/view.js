import {
    backGroundIcon,
    addEvent,
    dateFromString,
    time,
    temperatureDegrees,
    changeElementContentOnUI,
    isActiveNow,
    makeInactive,
    target,
    setStyle,
    weatherIconURL,
} from './utilities.js';
//---------------------------------------------------------//
import {
    serverRequest,
    compilationURLCurrentWeather,
    compilationURLForecast,
} from './server.js'
//---------------------------------------------------------//
import {
    deleteIcon,
} from './const.js'
//---------------------------------------------------------//
import {
    addCurrentCityInStorage,
    removeCityInSelectedList,
} from './storage.js'
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

export async function weatherOnUI(city) {
    try{
        const serverAnswer = await serverRequest(compilationURLCurrentWeather(city));
        
        await weatherTabs(serverAnswer);
    }catch(error){
        alert(error.message);
    }    
}

async function weatherTabs(answer) {
    const answerIsNotValid = (answer.cod === '404');

    if (answerIsNotValid) {
        throw new Error('city not found');
    }

    weatherNow(answer);
    weatherDetails(answer);
    weatherForecast(answer);

    addCurrentCityInStorage(answer.name);
}

function weatherNow(answer) {
    changeElementContentOnUI(nowTemprature, temperatureDegrees(answer.main.temp));
    changeElementContentOnUI(currentCityNow, answer.name);
    Now.style = backGroundIcon(answer["weather"][0]["icon"]);
}

function weatherDetails(answer) {
    changeElementContentOnUI(currentCityDetails, answer.name);
    changeElementContentOnUI(detailsTemprature, temperatureDegrees(answer.main.temp));
    changeElementContentOnUI(detailsFeelsLike, temperatureDegrees(answer.main.feels_like));
    changeElementContentOnUI(detailsWeather, answer.weather[0].main);
    changeElementContentOnUI(detailsSunrise, time(answer.sys.sunrise));
    changeElementContentOnUI(detailsSunset, time(answer.sys.sunset));
}

async function weatherForecast(answer) {
    const serverAnswerForecast = await serverRequest(compilationURLForecast(answer));

    await forecastOnUi(serverAnswerForecast);
}

function forecastOnUi(answer) {
    const forecastIsNotEmpty = forecastList.hasChildNodes();

    if (forecastIsNotEmpty) {
        forecastList.innerHTML = '';
    }

    changeElementContentOnUI(currentCityForecast, answer.city.name);

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
            changeElementContentOnUI(topLeftElement, dateFromString(element.dt_txt));

            const bottomLeftElement = document.createElement('div');
            setStyle(bottomLeftElement, 'bottom_left');

                const bottomLeftList = document.createElement('ul');
                    
                    const firstBottomLeftListElement = document.createElement('li');
                    changeElementContentOnUI(firstBottomLeftListElement, `Temperature: ${temperatureDegrees(element.main.temp)}°`);
                    
                    const secondBottomLeftListElement = document.createElement('li');
                    changeElementContentOnUI(secondBottomLeftListElement, `Feels like: ${temperatureDegrees(element.main.feels_like)}°`);
                
                bottomLeftList.append(firstBottomLeftListElement, secondBottomLeftListElement);
            
            bottomLeftElement.append(bottomLeftList);

            const topRightElement = document.createElement('div');
            setStyle(topRightElement, 'top_right');
            changeElementContentOnUI(topRightElement, `${time(element.dt)}0`);

            const bottomRightElement = document.createElement('div');
            setStyle(bottomRightElement, 'bottom_right');

                const weatherBottomRightElement = document.createElement('span');
                setStyle(weatherBottomRightElement, 'block');
                changeElementContentOnUI(weatherBottomRightElement, `${element.weather[0].main}`);

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
        changeElementContentOnUI(cityName, city);
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
    removeCityInSelectedList(deletedCityName);
    
    const deletedCityOnUI = target(event).parentElement;
    deletedCityOnUI.remove();
}

function selectedCityOnUI(event) {
    const selectedCity = target(event).textContent;
    weatherOnUI(selectedCity);
}