<template>
  <h1>Strona główna</h1>
  <div class="homepage-container">
  <img src="../assets/logoKK.png">
  <HelloWorld />
  <button class="nav-button" @click="$router.push('/harmonogram')">Przejdź do kalkulatora kredytowego</button>
  <br>
  <button class="nav-button" @click="$router.push('/config')">Przejdź do edytora konfiguracji</button>
  <br>
  <button class="nav-button" @click="$router.push('/audit')">Przejdź do danych audytowych</button>
  </div>
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
img {
  width: 25%;
  padding-bottom: 50px;
  padding-top: 20px;
}
.homepage-container {
  padding-bottom: 200px;
}
</style>