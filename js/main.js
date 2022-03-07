import {
    setAdditionalHTMLOptions,
    clearSearchOnUI,
    weatherNow,
} from './html.js';

import {
    addEvent,
} from './view.js';

import {
    lastCity,
    serverRequest,
    compilationURL,
} from './server.js'

setAdditionalHTMLOptions();
defaultUI(lastCity);

addEvent(searchForm,'submit',outputOnUI);

function outputOnUI(event){
    event.preventDefault();
    const cityName = searchCity.value;
    const serverAnswer=serverRequest(compilationURL(cityName));
    serverAnswer.then(answer=>console.log(answer));
    serverAnswer.then(answer=>weatherNow(answer));
    clearSearchOnUI();
}

function defaultUI(defaultCity){
    const serverAnswer=serverRequest(compilationURL(defaultCity));
    serverAnswer.then(answer=>console.log(answer));
    serverAnswer.then(answer=>weatherNow(answer));
}