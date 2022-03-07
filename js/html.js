export function setAdditionalHTMLOptions(){
    const tabs=document.body.querySelectorAll('a');
for (let tab of tabs){
    tab.addEventListener('click', setActive);
}
}

function setActive(event){
    if(transitionNow.classList.contains('active_tab')){
        transitionNow.classList.remove('active_tab')
    }
    else {
        if(transitionDetails.classList.contains('active_tab')){
            transitionDetails.classList.remove('active_tab')
        }
        else transitionForecast.classList.remove('active_tab')
    }
    event.currentTarget.classList.add('active_tab');
}

export function clearSearchOnUI(){
    searchCity.value='';
}

export function weatherNow(answer){
    nowTemprature.textContent=`${(answer.main.temp-273.15).toFixed(1)}°`;
    currentCity.textContent=`${answer.name}`;
    switch (answer.weather[0].main){
        case 'Snow':Now.style="background: url('/img/snowflake.svg') 50% 50%/70px 70px no-repeat";
        break;
        case 'Clouds':Now.style="background:url('/img/icons8-cloud-96\ 1.svg') 50% 50%/78px 59px no-repeat";
        break;
        case 'Clear':Now.style="background:url('/img/day-sunny.svg') 50% 50%/70px 70px no-repeat";
        break;
        default: Now.style="background:url('/img/cloud-rain.svg') 50% 50%/70px 70px no-repeat";
        break;
    }
}