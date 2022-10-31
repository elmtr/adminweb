<script>
    import { onMount } from 'svelte'
  import { modPeriod } from '../actions/actions'
  import {showPeriodMod, selPeriod} from '../stores'

  let name 
  let room
  
  function loadPeriod() {
    name = $selPeriod.subject.name
    room = $selPeriod.room
    return ''
  }
  export let params
</script>

{#if $showPeriodMod} 
  <div id="card">
    mod period? <br>

    {loadPeriod()}

    name: {name}; sala: {room};<br>

    <input placeholder="materie" bind:value={name} type="text" name="" id="">
    <input placeholder="sala" bind:value={room} type="text">

    <div id="confirmation" on:click={async () => {
      await modPeriod(
        $selPeriod.key, 
        name, 
        room, 
        $selPeriod.day,
        $selPeriod.interval,
        params.gradeKey
      )
      $showPeriodMod = false
    }}>
      modify
    </div>
  </div>
{/if}

<style scoped>
  #card {
    width: 100%;
    height: 20vh;
    background: var(--white);
  }
</style>