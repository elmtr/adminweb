import Home from './routes/Home.svelte'
import Login from './routes/Login.svelte'
import Grade from './routes/Grade.svelte'
import Timetable from './routes/Timetable.svelte'
import Teacher  from './routes/Teacher.svelte';

export default {
    '/': Home,
    '/login': Login,

    // grade
    '/grade/:gradeKey': Grade,

    // timetable
    '/grade/:gradeKey/timetable': Timetable,

    // teacher
    '/teacher': Teacher,
};
