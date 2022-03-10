import {
    clearSearchOnUI,
    setActive,
    addOnUISelectedCitiesList,
    weatherOnUI,
} from './view.js';
//---------------------------------------------------------//
import {
    addEvent,
    DEFAULT_UI_ELEMENTS,
    SELECTED_CITIES,
} from './const.js';
//---------------------------------------------------------//
const DEFAULT_CITY = SELECTED_CITIES[0];

SELECTED_CITIES.forEach(city => addOnUISelectedCitiesList(city))
weatherOnUI(DEFAULT_CITY);

addEvent(DEFAULT_UI_ELEMENTS.UI_FORM, 'submit', outputOnUI);
DEFAULT_UI_ELEMENTS.UI_TRANSITION.forEach(element => addEvent(element, 'click', setActive));
addEvent(DEFAULT_UI_ELEMENTS.UI_SELECTBUTTON, 'click', addOnSelectedCitiesList);

function outputOnUI(event) {
    event.preventDefault();
    const cityName = searchCity.value;
    weatherOnUI(cityName);
    clearSearchOnUI();
}

function addOnSelectedCitiesList() {
    try {
        const addedCity = currentCityNow.textContent.toLowerCase();
        if (SELECTED_CITIES.includes(addedCity)) {
            throw new Error('the city is already in the list of favorites');
        }
        SELECTED_CITIES.push(addedCity);
        addOnUISelectedCitiesList(addedCity);
    } catch (error) {
        alert(error.message);
    }
}