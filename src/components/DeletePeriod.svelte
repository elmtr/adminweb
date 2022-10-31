<script>
  import { delPeriod } from '../actions/actions'
  import {showPeriodDelete, selPeriod} from '../stores'
</script>

{#if $showPeriodDelete} 
  <div id="card">
    del period?

    <div id="confirmation" on:click={async () => {
      await delPeriod($selPeriod.key, $selPeriod.day, $selPeriod.interval)
      $showPeriodDelete = false
    }}>
      delete
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