import { writable } from 'svelte/store'

export let school = writable({})
export let timetable = writable([])

export let info = writable({})
export let token = writable({})

export let subjects = writable([])
export let grades = writable([])

export let teacher = writable({})

export let today = writable(6)
export let average = writable(1)

export let showPeriodDelete = writable(false)
export let showPeriodMod = writable(false)

export let selPeriod = writable({})