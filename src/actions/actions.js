import axios from 'axios'
import { push } from 'svelte-spa-router'
import { apiURL, tokenConfig, config } from '../axiosConfig'
import {
  subjects, 
  grades, 
  teacher, 
  info, 
  token,
  school, 
  timetable
} from '../stores'
import {get} from 'svelte/store'
import {sortPeriods} from '../sort/sort'


export async function login( email, password) {
  try {
    const {data} = await axios.post(
      `${apiURL}/v1/admin/login`,
      {email, password},
      config
    )

    localStorage.setItem('userInfo', JSON.stringify(data.admin))
    localStorage.setItem('userToken', data.token)

    info.set(data.admin)
    token.set(data.token)

    push('/')
  } catch (error) {
    console.log(error.response.data.message)
  }
}

// grades
export async function getGrades() {
  try {
    const {data} = await axios.get(
      `${apiURL}/v1/admin/grades`,
      tokenConfig(get(token))
    )
    grades.set(data)
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export async function addGrade(
  gradeNumber, 
  gradeLetter, 
  intervalStart, 
  intervalEnd
) {
  gradeNumber = Number(gradeNumber)
  gradeLetter = gradeLetter.toUpperCase()
  let intervals = intervalStart + "-" + intervalEnd
  let d = new Date()
  let yearFrom = d.getFullYear()
  let yearTo = d.getFullYear() + 1

  try {
    const {data} = await axios.post(
      `${apiURL}/v1/admin/grades`,
      {gradeNumber, gradeLetter, intervals, yearFrom, yearTo},
      tokenConfig(get(token))
    )
    let gradesValue = get(grades)
    gradesValue.push(data)
    grades.set(gradesValue)
  } catch (error) {
    console.log(error.response.data.message)
  }
}

// subjects
export async function getSubjects(gradeKey) {
  try {
    const {data} = await axios.get(
      `${apiURL}/v1/admin/subjects?gradeKey=${gradeKey}`,
      tokenConfig(get(token))
    )

    subjects.set(data)
    return data
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export async function addSubject(gradeKey, name) {
  try {
    const {data} = await axios.post(
      `${apiURL}/v1/admin/subjects?gradeKey=${gradeKey}`,
      {name},
      tokenConfig(get(token))
    )
    let subjectsValue = get(subjects)
    subjectsValue.push(data)
    subjects.set(subjectsValue)
  } catch (error) {
    console.log(error.response.data.message)
  }
}

// teachers
export async function loadTeacher(phone) {
  try {
    const {data} = await axios.get(
      `${apiURL}/v1/admin/teacher?phone=${phone}`,
      tokenConfig(get(token))
    )
    teacher.set(data)
    subjects.set(data.subjects)
    console.log(data.subjects)
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export async function addTeacherSubject(key, name, gradeNumber, gradeLetter) {
  gradeLetter = gradeLetter.toUpperCase()
  try {
    const {data} = await axios.post(
      `${apiURL}/v1/admin/teacher/subjects/add`,
      {key, name, gradeNumber, gradeLetter},
      tokenConfig(get(token))
    )
    subjects.set(data.subjects)
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export async function fetchSchool() {
  try {
    const {data} = await axios.get(
      `${apiURL}/v1/admin/timetable/school`,
      tokenConfig(get(token))
    )
    school.set(data)
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export async function fetchTimetable(gradeKey) {
  try {
    const {data} = await axios.get(
      `${apiURL}/v1/admin/timetable?key=${gradeKey}`,
      tokenConfig(get(token))
    )
    
    timetable.set(sortPeriods(data))

    return sortPeriods(data)
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export async function addPeriod(
  gradeKey,
  interval,
  day,
  name,
  room,
) {
  interval = "" + interval
  day = "" + day

  try {
    const {data} = await axios.post(
      `${apiURL}/v1/admin/timetable`,
      {gradeKey, interval, day, name, room},
      tokenConfig(get(token))
    )

    let timetableValue = get(timetable)
    timetableValue[day][interval] = [data]
    timetable.set(timetableValue)
    
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export async function delPeriod(
  key,
  day, 
  interval
) {
  try {
    const {data} = await axios.delete(
      `${apiURL}/v1/admin/timetable?key=${key}`,
      tokenConfig(get(token))
    )

    let timetableValue = get(timetable)
    let dayInterval = timetableValue[day][interval]
    let newDayInterval = []
    for (let i in dayInterval) {
      if (dayInterval[i].key !== key) {
        newDayInterval.push(dayInterval[i])
      }
    }
    timetableValue[day][interval] = newDayInterval
    timetable.set(timetableValue)
    
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export async function modPeriod(
  key,
  name,
  room,
  day, 
  interval,
  gradeKey
) {
  try {
    const {data} = await axios.patch(
      `${apiURL}/v1/admin/timetable?key=${key}`,
      {name, room, gradeKey},
      tokenConfig(get(token))
    )


    let timetableValue = get(timetable)
    for (let i in timetableValue[day][interval]) {
      if (timetableValue[day][interval][i].key === key) {
        timetableValue[day][interval][i].subject = data
        timetableValue[day][interval][i].room = room
      }
    }
    timetable.set(timetableValue)
  } catch (error) {
    console.log(error.response.data.message)
  }

}