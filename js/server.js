export const lastCity='moscow'

export function serverRequest(url) {
    return fetch(url).then(response => response.json());
}

export function compilationURL(cityName) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    return url;
}