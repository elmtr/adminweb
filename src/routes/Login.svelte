<script>
  
  import { login } from '../actions/actions'

  let email
  let password

</script>

<main>
  <input bind:value={email} class="input" type="text" placeholder="email"><br>
  <input bind:value={password} class="input" type="password" placeholder="password"><br>

  <input class="submit" type="submit" on:click={async () => {
    await login(email, password);
  }}>
</main>