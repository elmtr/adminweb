<script>

  import {loadTeacher, addTeacherSubject} from '../actions/actions'
  import { teacher, subjects } from '../stores'
  let phone = '0723010405'

  let name
  let gradeNumber
  let gradeLetter

</script>

<input type="text" bind:value={phone} placeholder="numar de telefon profesor">
<input type="submit" on:click={async () => {
  await loadTeacher(phone)
}}>
<br>

{#if $teacher.key}
  {$teacher.firstName} {$teacher.lastName} <br>

  <input type="text" bind:value={name} placeholder="numele materiei"> <br>
  <input type="text" bind:value={gradeNumber} placeholder="anul clasei"> <br>
  <input type="text" bind:value={gradeLetter} placeholder="litera clasei"> <br>
  <input type="submit" on:click={async () => {
    await addTeacherSubject($teacher.key, name, gradeNumber, gradeLetter)
  }} value="adauga materia la profesor"> 
  
  <br>

  {#each $subjects as subject} 
    {subject.name} - {subject.grade.gradeNumber}{subject.grade.gradeLetter} <br>
  {/each}

{/if}