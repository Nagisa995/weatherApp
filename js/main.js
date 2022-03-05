const tabs=document.body.querySelectorAll('a');
for (let tab of tabs){
    tab.addEventListener('click', setActive);
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