<template> 
<div>
  <h1>Kalkulator harmonogramu kredytowego</h1>
  <h3 v-show="loading">Trwa ładowanie...</h3>
  <Popup v-if="showErrorPopup" @close="showErrorPopup = false">
      <template v-slot:header>
        <h3>Wystąpił błąd</h3>
      </template>
      <template v-slot:body>
        Proszę skontaktuj się z administratorem aplikacji
      </template>
      <template v-slot:footer>
        
      </template>
  </Popup>
  
  
  <schedule-configuration :onSubmit="fetchSchedule" :loading="loading" />
  <br>
    
  

  <br/>
  <button class="nav-button" @click="$router.push('/')">Przejdź do strony głównej</button>
  <br/>
  
  <div class="scheduleContainer">
    <schedule :installments="installments" />
  </div>

{{ errorMessage }}
</div>
</template>



<script>
import axios from 'axios'
import scheduleConfiguration from '../components/scheduleConfiguration'
import Schedule from '../components/schedule'
import Popup from '../components/Popup'
export default {
  name: 'Harmonogram',
  components: {
    scheduleConfiguration,
    Schedule,
    Popup
  },
  data() {
    return {
      installments: {
        scheduleConfiguration: null,
        installmentList: [],
        aprc: 0,
        insurancePremiumList: []
      },
      errorMessage: '',
      showErrorPopup: false,
      loading: false
    }
  
  },
  methods: 
  {
     async fetchSchedule(data) {
       this.loading = true
          await axios.post(`http://localhost:4200/api/v1/schedule`, JSON.stringify(data), { 
          headers:{"Content-type" : "application/json"}
          })
          .then(response => {
            this.installments = response.data
          })
          .finally(() => {
            this.showErrorPopup = true
            this.loading = false
            })
          
      
          
          
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
