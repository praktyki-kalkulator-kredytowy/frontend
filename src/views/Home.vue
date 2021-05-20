<template>
  <HelloWorld />

  <router-link to="/harmonogram">Przejdź do kalkulatora kredytowego</router-link>
  <br>
  <router-link to="/config">Przejdź do edytora konfiguracji</router-link>
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
