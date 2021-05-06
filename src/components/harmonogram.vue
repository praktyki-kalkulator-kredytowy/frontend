<template>
<div>
  <form @submit.prevent="onSubmit">
  <label for="Kwota">Kwota kredytu</label>
  <input name="Kwota" v-model="capital" type="number" placeholder="kwota">
  <label for="liczbaRat">Liczba rat</label>
  <input name="liczbaRat" v-model="installmentAmount" type="number" placeholder="liczba rat">
  <label for="rodzajRaty">Rodzaj rat</label>
  <select id="rodzajRaty" v-model="chosenInstallment">
    <option :value="typ.value" v-for="(typ, index) in rodzajRaty" :key="index">
      {{typ.name}}
    </option>
  
  </select>
  <label for="oprocentowanie">Oprocentowanie</label>
  <input name="oprocentowanie" v-model="interestRate" type="number" placeholder="procent">
  <label for="dataWyplaty">Data wypłaty środków</label>
  <input name="dataWyplaty" v-model="withdrawalDate" type="date" placeholder="data">
  <input type="submit" value="Oblicz">
  <router-link to="/">Przejdź do strony głównej</router-link>
  </form>
  {{withdrawalDate}}

 {{test}}
  <div></div>
</div>
</template>



<script>
import axios from 'axios'
export default {
  name: 'Harmonogram',
  data() {
    return {
      capital: '',
      installmentAmount: '',
      rodzajRaty: [
        { value: 'DECREASING', name: 'malejące' },
        { value: 'CONSTANT', name: 'równe'}
      ],
      chosenInstallment: '',
      interestRate: '',
      withdrawalDate: '',
      test: '',
      

      }
  
  },
  methods: {
     onSubmit() {
       let data = JSON.stringify({
            capital: this.capital,
            installmentType: this.chosenInstallment,
            installmentAmount: this.installmentAmount,
            interestRate: this.interestRate,
            withdrawalDate: this.withdrawalDate
       });
        axios.post(`http://localhost:4200/api/v1/schedule`, data,
        {headers:{"Content-type" : "application/json"}
            
        })
        .then(response => {
            this.test = response.data
        })
    },
    
    
  },
  

  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {display: flex;
flex-direction:column;
align-items: center;
}
</style>
