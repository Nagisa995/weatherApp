export function addEvent(elem, event, action) {
    elem.addEventListener(event, action);
}

export function clearSearchOnUI() {
    searchCity.value = '';
}

export function weatherTabs(answer) {
    if (answer.cod === '404') {
        return new Promise(function (resolve, reject) {
            reject(new Error('city not found'))
        })
    }
    weatherNow(answer)
}

function weatherNow(answer) {
    nowTemprature.textContent = `${(answer.main.temp - 273.15).toFixed(1)}°`;
    currentCity.textContent = `${answer.name}`;
    Now.style = backGroundIcon(answer["weather"][0]["icon"]);
}

function backGroundIcon (icon){
    return `background: url('http://openweathermap.org/img/wn/${icon}@2x.png') 50% 50%/80px 80px no-repeat`
}

export function setActive(event) {
    if (transitionNow.classList.contains('active_tab')) {
        transitionNow.classList.remove('active_tab')
    }
    else {
        if (transitionDetails.classList.contains('active_tab')) {
            transitionDetails.classList.remove('active_tab')
        }
        else transitionForecast.classList.remove('active_tab')
    }
    event.currentTarget.classList.add('active_tab');
}