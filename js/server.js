import {
    SERVER_URL,
    API_KEY,
} from './const.js'
//---------------------------------------------------------//
export function serverRequest(url) {
    return fetch(url).then(response => response.json());
}

export function compilationURL(cityName) {
    const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;
    return url;
}