import {
    clearSearchOnUI,
    setActive,
    addOnUISelectedCitiesList,
    weatherOnUI,
} from './view.js';
//---------------------------------------------------------//
import {
    DEFAULT_UI_ELEMENTS,
    DEFAULT_CITY,
} from './const.js';
//---------------------------------------------------------//
import {
    addEvent,
} from './utilities.js';
//---------------------------------------------------------//
import {
    getCurrentCityFromStorage,
    pushCityInSelectedList,
    getSelectedListFromStorage
} from './storage.js';
//---------------------------------------------------------//
const currentCity = getCurrentCityFromStorage() || DEFAULT_CITY;
const selectedList = getSelectedListFromStorage().values();

for (let city of selectedList) {
    addOnUISelectedCitiesList(city);
}

weatherOnUI(currentCity);

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
        const addedCityNotInList = !getSelectedListFromStorage().has(addedCity);

        if (addedCityNotInList) {
            addOnUISelectedCitiesList(addedCity);
            pushCityInSelectedList(addedCity);
        } else {
            throw new Error('City is already in the list of favorites!');
        }
        
    } catch (error) {
        alert(error.message);
    }
}