import Cookies from 'js-cookie'

export function addCurrentCityInStorage (city) {
  Cookies.set('cookieCity', city)
}

export function getCurrentCityFromStorage () {
  console.log(Cookies.get('cookieCity'))
  return Cookies.get('cookieCity')
}

export function pushCityInSelectedList (city) {
  const SELECTED_LIST = getSelectedListFromStorage()
  SELECTED_LIST.add(city)
  localStorage.setItem('selectedList', JSON.stringify([...SELECTED_LIST]))
}

export function removeCityInSelectedList (city) {
  const SELECTED_LIST = getSelectedListFromStorage()
  SELECTED_LIST.delete(city)
  localStorage.setItem('selectedList', JSON.stringify([...SELECTED_LIST]))
}

export function getSelectedListFromStorage () {
  const selectedListIsEmpty = localStorage.getItem('selectedList') === 'undefined'

  if (selectedListIsEmpty) {
    return new Set()
  } else {
    return new Set(JSON.parse(localStorage.getItem('selectedList')))
  }
}
