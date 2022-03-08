import {
    addEvent,
    clearSearchOnUI,
    weatherTabs,
    setActive,
} from './view.js';

import {
    serverRequest,
    compilationURL,
} from './server.js'

import {
    DEFAULT_CITY,
    DEFAULT_UI_ELEMENTS,
} from './const.js';

defaultUI(DEFAULT_CITY);

addEvent(DEFAULT_UI_ELEMENTS.UI_FORM, 'submit', outputOnUI);
DEFAULT_UI_ELEMENTS.UI_TRANSITION.forEach(elem => addEvent(elem, 'click', setActive));

function outputOnUI(event) {
    event.preventDefault();
    const cityName = searchCity.value;
    const serverAnswer = serverRequest(compilationURL(cityName));
    serverAnswer.then(answer => console.log(answer))
    serverAnswer.then(answer => weatherTabs(answer)).catch(error => alert(error.message));
    clearSearchOnUI();
}

function defaultUI(defaultCity) {
    const serverAnswer = serverRequest(compilationURL(defaultCity));
    serverAnswer.then(answer => weatherTabs(answer));
}