<template>
  <h1>Strona główna</h1>
  <HelloWorld />
  <button class="nav-button" @click="$router.push('/harmonogram')">Przejdź do kalkulatora kredytowego</button>
  <br>
  <button class="nav-button" @click="$router.push('/config')">Przejdź do edytora konfiguracji</button>
  <br>
  <button class="nav-button" @click="$router.push('/audit')">Przejdź do danych audytowych</button>
</template>

<script>

import HelloWorld from '../components/HelloWorld'

export default {
    name: 'Home',
    components: {
      HelloWorld
    }
}
</script>
<style scoped>
.nav-button {
  width: 260px;
}
</style>