<script>
  import {getSubjects, addSubject, login} from '../actions/actions'
  import {subjects} from '../stores'
  import {link} from 'svelte-spa-router'
  export let params

  let name

</script>

<input type="text" bind:value={name} placeholder="numele materiei">
<input type="submit" on:click={ async () => {
  await addSubject(params.gradeKey, name)
  name = ""
}} value="adauga materie">

<br>

{#await getSubjects(params.gradeKey) then data}
	{#each $subjects as subject}
		{subject.name} <br>
	{/each}
{/await}

<br>

<a href="/grade/{params.gradeKey}/timetable" use:link>
  catre editare orar
</a>