export const SELECTED_CITIES = ['moscow', 'amur', 'london', 'tomsk', 'novosibirsk'];
export const SERVER_URL = 'http://api.openweathermap.org/data/2.5';
export const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';
export const DEFAULT_UI_ELEMENTS = {
    UI_FORM: document.body.querySelector('#searchForm'),
    UI_TRANSITION: document.body.querySelectorAll('a'),
    UI_SELECTBUTTON: document.body.querySelector('#selectIcon'),
}
export const deleteIcon = './img/delete_icon.svg';
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//---------------------------------------------------------//
export function addEvent(element, event, action) {
    element.addEventListener(event, action);
}

export function time(seconds) {
    const timeMiliseconds = new Date(seconds * 1000);
    const timeOnUI = `${timeMiliseconds.getHours()}:${timeMiliseconds.getMinutes()}`;
    return timeOnUI;
}

export function dateFromString(string) {
    const date = new Date(string);
    const dateOnUi = `${date.getDate()} ${month[date.getMonth()]}`;
    return dateOnUi;
}

export function temperatureDegrees(kelvin) {
    return (kelvin - 273.15).toFixed(1);
}

export function changeContentOnUI(element, text) {
    element.textContent = text;
}

export function backGroundIcon(icon) {
    return `background: url('http://openweathermap.org/img/wn/${icon}@2x.png') 50% 50%/80px 80px no-repeat`;
}

export function weatherIconURL(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
}

export function isActiveNow(element) {
    return element.classList.contains('active_tab');
}

export function makeInactive(element) {
    element.classList.remove('active_tab');
}

export function target(event) {
    return event.currentTarget;
}

export function setStyle(element, style) {
    element.classList.add(style);
}