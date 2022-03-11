import {
    SERVER_URL,
    API_KEY,
} from './const.js'
//---------------------------------------------------------//
export function serverRequest(url) {
    return fetch(url).then(response => response.json());
}

export function compilationURLCurrentWeather(cityName) {
    const url = `${SERVER_URL}/weather?q=${cityName}&appid=${API_KEY}`;
    return url;
}

export function compilationURLForecast(answer) {
    const url = `${SERVER_URL}/forecast?q=${answer.name}&appid=${API_KEY}`;
    return url;
}