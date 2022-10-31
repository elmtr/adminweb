import {get} from 'svelte/store';
import {average} from '../stores'

export function findInterval(intervals, time) {
  for (let intervalIndex in intervals) {
    let currentInterval = intervals[intervalIndex]
    let nextInterval = intervals[Number(intervalIndex) + 1]
    if (nextInterval && currentInterval) {
      if (time >= currentInterval.start && time < nextInterval.start) {
        return currentInterval.number
      }
    }
  }
}

export let months = [
  'nope',
  "ianuarie",
  "februarie",
  "martie",
  "aprilie",
  "mai",
  "iunie",
  "iulie",
  "august",
  "septembrie",
  "octombrie",
  "noiembrie",
  "decembrie",
]

export let roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"]


export  function calcAverage(marks) {
  let number = marks.length
  average.set(0)
  for (let index in marks) {
    let mark = marks[index]
    average.update(value => value + mark.value)
  }

  average.set(+((get(average) / number).toFixed(2)))
  return ''
}

export function floatToHour(number) {
  let hour = ~~number
  let minutes = Math.round((number % 1) * 100) 

  return hour + ":" + minutes
}