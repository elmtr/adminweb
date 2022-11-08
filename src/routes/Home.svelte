<script>
	import {link} from 'svelte-spa-router'
	import {getGrades, addGrade} from '../actions/actions'
	import {grades, teacher} from '../stores'
	import {onMount} from 'svelte'

	let gradeNumber
	let gradeLetter

	onMount(() => {
		$teacher = {}
	})
</script>

<input type="text" bind:value={gradeNumber} placeholder="grade number"><br>
<input type="text" bind:value={gradeLetter} placeholder="grade letter"><br>
<!-- <input type="text" bind:value={intervalStart} placeholder="intervals start"><br>
<input type="text" bind:value={intervalEnd} placeholder="intervals end"><br> -->


<input type="submit" on:click={ async () => {
  await addGrade(gradeNumber, gradeLetter)
  gradeNumber = ""
	gradeLetter = ""
}} value="adauga clasa">

<br>

{#await getGrades() then data}
	{#each $grades as grade}
		<a href="/grade/{grade.key}" use:link>
			{grade.gradeNumber}{grade.gradeLetter} <br>
		</a>
	{/each}
{/await}

<a href="/teacher" use:link>catre pagina profesorilor</a>