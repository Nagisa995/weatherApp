export function addCurrentCityInStorage(city) {
    localStorage.setItem('currentCity', city);
}

export function getCurrentCityFromStorage() {
    return localStorage.getItem('currentCity');
}

export function pushCityInSelectedList(city) {
    const SELECTED_LIST = getSelectedListFromStorage() || [];
    SELECTED_LIST.push(city);
    localStorage.setItem('selectedList', JSON.stringify(SELECTED_LIST));
}

export function removeCityInSelectedList(city) {
    const SELECTED_LIST = getSelectedListFromStorage();
    SELECTED_LIST.splice((SELECTED_LIST.indexOf(city)), 1);
    localStorage.setItem('selectedList', JSON.stringify(SELECTED_LIST));
}

export function getSelectedListFromStorage(){
    return JSON.parse(localStorage.getItem('selectedList'));
}