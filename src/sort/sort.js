export function sortSubjects(subjects) {
  let sortedSubjects = {}
  for (let subjectIndex in subjects) {
    let subject = subjects[subjectIndex]
    sortedSubjects[`${subject.grade.key}`] = {}
  }
  for (let subjectIndex in subjects) {
    let subject = subjects[subjectIndex]
    sortedSubjects[`${subject.grade.key}`][subject.key] = subject
  }
  return sortedSubjects
}

export function sortGrades(subjects) {
  let grades = {}
  for (let subjectIndex in subjects) {
    let subject = subjects[subjectIndex]
    grades[`${subject.grade.key}`] = subject.grade
  }
  return grades
}

export function sortPeriods(periods) {
  let days = [1,2,3,4,5]
  let intervals = [1,2,3,4,5,6,7,8,9,10,11,12]

  let timetable = {}

  for (let dayIndex in days) {
    let day = days[dayIndex]
    timetable[day] = {}

    for (let intervalIndex in intervals) {
      let interval = intervals[intervalIndex]
      timetable[day][interval] = []
    }
  }

  for (let periodIndex in periods) {
    let period = periods[periodIndex]
    timetable[period.day][period.interval].push(period)
  }

  return timetable
}