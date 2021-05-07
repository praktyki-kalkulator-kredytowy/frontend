<template>
<div>
  <form @submit.prevent="onSubmit">
  <label for="Amount">Kwota kredytu</label>
  <input name="Amount" v-model="capital" type="number" placeholder="kwota">
  <label for="InstallmentAmount">Liczba rat</label>
  <input name="InstallmentAmount" v-model="installmentAmount" type="number" placeholder="liczba rat">
  <label for="InstallmentType">Rodzaj rat</label>
  <select id="InstallmentType" v-model="chosenInstallment">
    <option :value="type.value" v-for="(type, index) in installmentType" :key="index">
      {{ type.name }}
    </option>
  
  </select>
  <label for="InterestRate">Oprocentowanie</label>
  <input name="InterestRate" v-model="interestRate" type="number" placeholder="procent">
  <label for="WithdrawalDate">Data wypłaty środków</label>
  <input name="WithdrawalDate" v-model="withdrawalDate" type="date" placeholder="data">
  <input type="submit" value="Oblicz">
  <router-link to="/">Przejdź do strony głównej</router-link>
  </form>
  

 
  <div>
    <table>
      <thead>
        <tr>
          <th>Rata</th>
          <th>Data raty</th>
          <th>Rata odsetkowa</th>
          <th>Rata kapitałowa</th>
          <th>Kapitał po spłacie</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="installment.index" v-for="installment in schedule">
          <td> {{ installment.index }} </td>
          <td> {{ installment.installmentDate }} </td>
          <td> {{ installment.interestInstallment}} </td>
          <td> {{ installment.capitalInstallment }} </td>
          <td> {{ installment.remainingDebt }} </td>
        </tr>
      </tbody>
    </table>
  </div>
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
      installmentType: [
        { value: 'DECREASING', name: 'malejące' },
        { value: 'CONSTANT', name: 'równe'}
      ],
      chosenInstallment: '',
      interestRate: '',
      withdrawalDate: '',
      schedule: []
      

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
            this.schedule = response.data
        })
    },
    
    
  },
  computed: {
    
  }

  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {display: flex;
flex-direction:column;
align-items: center;
}

table {
  display: inline;
}
</style>
