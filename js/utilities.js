import { format } from 'date-fns'

export function addEvent (element, event, action) {
  element.addEventListener(event, action)
}

export function time (seconds) {
  const timeOnUI = format(new Date(seconds * 1000), 'H:m')
  return timeOnUI
}

export function dateFromString (string) {
  const dateOnUi = format(new Date(string), 'd MMMM')
  return dateOnUi
}

export function temperatureDegrees (kelvin) {
  return (kelvin - 273.15).toFixed(1)
}

export function changeElementContentOnUI (element, text) {
  element.textContent = text
}

export function backGroundIcon (icon) {
  return `background: url('http://openweathermap.org/img/wn/${icon}@2x.png') 50% 50%/80px 80px no-repeat`
}

export function weatherIconURL (icon) {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`
}

export function isActiveNow (element) {
  return element.classList.contains('active_tab')
}

export function makeInactive (element) {
  element.classList.remove('active_tab')
}

export function target (event) {
  return event.currentTarget
}

export function setStyle (element, style) {
  element.classList.add(style)
}
