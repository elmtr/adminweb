<script>
  
  import {addPeriod, fetchSchool, fetchTimetable} from '../actions/actions'
  import { writable } from 'svelte/store'

  // kiui
  import Days from '../kiui/Slide/Days.svelte'
  import Period from '../kiui/Timetable/Period.svelte'
  import HeaderBack from '../kiui/HeaderBack.svelte'

  import DeletePeriod from '../components/DeletePeriod.svelte'
  import ModifyPeriod from '../components/ModifyPeriod.svelte'


  import {timetable, showPeriodDelete, showPeriodMod, selPeriod} from '../stores'

  let intervals = [1,2,3,4,5,6,7,8,9,10,11,12]

  let day = writable(1);

  export let params

  let name = ""
  let room = ""
  let interval

</script>

<div id="container">

  <Days {day} />
</div>
<div id="spacing"></div>


{#await fetchSchool() then data}
  {#await fetchTimetable(params.gradeKey) then periods}
    {#each intervals as interval}
      {#if $timetable[$day][interval].length > 0}
        {#each $timetable[$day][interval] as period}
          {period.subject.name} - {period.interval} in {period.room} - 
          <span style="color: var(--red)" on:click={() => {
            $showPeriodDelete = !$showPeriodDelete
            $selPeriod = period
          }}>delete</span>
          <span style="color: var(--lightgreen)" on:click={() => {
            $showPeriodMod = !$showPeriodMod
            $selPeriod = period
          }}>mod</span>
          <br>
        {/each}
      {/if}
    {/each}
  {/await}
{/await}

<br>

<DeletePeriod/>
<ModifyPeriod {params} />

<input type="text" placeholder="numele materiei" bind:value={name}>
<input type="text" placeholder="sala" bind:value={room}>
<input type="text" placeholder="intervalul" bind:value={interval}>
<input type="submit" value="adauga ora" on:click={ async () => {
  await addPeriod(
    params.gradeKey,
    interval,
    $day,
    name,
    room
  )
  name = ""
  room = ""
  interval = ""
}}>


<style scoped>
	/* #heading {
		font-size: 1.8em;
		color: var(--black);
		margin-left: 25px;
		margin-top: 30px;
		margin-bottom: 20px;
		font-weight: 600;
		font-family: var(--sans-serif);
	} */

  #container {
    width: 100%;
    background: var(--offwhite);
    position: fixed;
    z-index: 10;
  }

  #spacing {
    height: 100px;
  }
</style>