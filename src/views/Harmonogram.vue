<template> 
<div>
  <section v-if="errors.length">
    <p>Wystąpił problem z aplikacją. Proszę skontaktuj się z administratorem.</p>
  </section>

  <section v-else>
    <div v-if="loading">Proszę czekać...</div>
  </section>
  <schedule-configuration :onSubmit="fetchSchedule" :loading="loading" />
  <br>
    
  

  <br/>
  <button class="nav-button" @click="$router.push('/')">Przejdź do strony głównej</button>
  <br/>
  
  <div class="scheduleContainer">
    <schedule :installments="installments" />
  </div>


</div>
</template>



<script>
import axios from 'axios'
import scheduleConfiguration from '../components/scheduleConfiguration'
import Schedule from '../components/schedule.vue'

export default {
  name: 'Harmonogram',
  components: {
    scheduleConfiguration,
    Schedule
  },
  data() {
    return {
      installments: {
        scheduleConfiguration: null,
        installmentList: [],
        aprc: 0,
        insurancePremiumList: []
      },
      errors: [],
      loading: false
    }
  
  },
  methods: 
  {
     async fetchSchedule(data) {
       this.loading = true
        let response =  await axios.post(`http://localhost:4200/api/v1/schedule`, JSON.stringify(data), { 
          headers:{"Content-type" : "application/json"}
          })
          .catch(error => this.errors.push(error.message))
          .finally(() => this.loading = false)

          this.installments = response.data;
    },
    
  }
  

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 5px;
  text-align: left;
}

.scheduleContainer {
  width:65%;
  margin: auto;
  margin-top: 30px;
}




</style>
