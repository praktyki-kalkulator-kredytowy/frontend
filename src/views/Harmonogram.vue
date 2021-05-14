<template> 
<div>
  <schedule-configuration :onSubmit="fetchSchedule"/>


  <br/>
  <router-link to="/">Przejdź do strony głównej</router-link>
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
        installmentList: [],
        aprc: 0
      }
    }
  
  },
  methods: 
  {
     async fetchSchedule(data) {
        let response =  await axios.post(`http://localhost:4200/api/v1/schedule`, JSON.stringify(data), { 
          headers:{"Content-type" : "application/json"}
          });

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
