<template>
 <div>
    <h1>Konfiguracja aplikacji</h1>
      <label>Minimalne oprocentowanie(%):</label>
      <input type="number" v-model="minInterestRate" required>
      <br>
      <label>Maksymalne oprocentowanie(%):</label>
      <input type="number" v-model="maxInterestRate" required>
      <br>
      <label>Minimalna kwota prowizji(PLN):</label>
      <input type="number" v-model="minCommissionAmount" required>
      <br>
      <label>Minimalna wartość prowizji(%):</label>
      <input type="number" v-model="minCommissionRate" required>
      <br>
      <label>Maksymalna wartość prowizji(%):</label>
      <input type="number" v-model="maxCommissionRate" required>
      <br>
      <label>Domyślna wartość prowizji(%):</label>
      <input type="number" v-model="defaultCommissionRate" required>
      <br>
      <label>Minimalna kwota składki ubezpieczeniowej(PLN):</label>
      <input type="number" v-model="minInsurancePremium" required>
      <br>
      <label>Częstotliwość płatności składki ubezpieczeniowej(mies.):</label>
      <input type="number" v-model="PaymentFrequency" required>
      <br><br>
      <button @click="addBracket">Dodaj przedział wiekowy</button>
      <br>
      <div
      v-for="(ageBracket, index) in ageBrackets"
      v-bind:key="index">
        <span @click="deleteBracket(index)">x</span>
        <label>{{index+1}}. Wiek:</label>
        <input type="number" v-model="ageBracket.age" required>
        <br>
        <label>Koszt ubezpieczenia(%):</label>
        <input type="number" v-model="ageBracket.insuranceRate" required> 
      </div>
      <br><br>
      <button @click="getConfiguration">Zapisz konfigurację</button>

    <router-link to="/">Przejdź do strony głównej</router-link>
</div>


</template>

<script>
import axios from 'axios'

export default {
  name: 'UserConfig',
  data() {
    return {
        minInterestRate: null,
        maxInterestRate: null,
        minCommissionAmount: null,
        minCommissionRate: null,
        maxCommissionRate: null,
        defaultCommissionRate: null,
        minInsurancePremium: null,
        PaymentFrequency: null,
        ageBrackets: [
            {
                age: null,
                insuranceRate: null
            }
        ],
        groups: null

    }
  },
  methods: {
    async getConfiguration() {
    },
    async setConfiguration() {
      let data = []
      data.push(
        {
          key: "MIN_PREMIUM_VALUE",
          value: this.minInsurancePremium,
          group: "DEFAULT"
        },
        {
          key: "MIN_COMMISSION_AMOUNT",
          value: this.minCommissionAmount,
          group: "DEFAULT"
        },
        {
          key: "MIN_INTEREST_RATE",
          value: this.minInterestRate,
          group: "DEFAULT"
        },
        {
          key: "MAX_INTEREST_RATE",
          value: this.maxInterestRate,
          group: "DEFAULT"
        },
        {
          key: "MIN_COMMISSION_RATE",
          value: this.minCommissionRate,
          group: "DEFAULT"
        },
        {
          key: "MAX_COMMISSION_RATE",
          value: this.maxCommissionRate,
          group: "DEFAULT"
        },
        {
          key: "DEFAULT_COMMISSION_RATE",
          value: this.defaultCommissionRate,
          group: "DEFAULT"
        },
        {
          key: "MONTH_FRAME",
          value: this.PaymentFrequency,
          group: "DEFAULT"
        },
      )
      this.ageBrackets.forEach(br => data.push(
        {
            key: br.age,
            value: br.insuranceRate/100,
            group: "INSURANCE_GROUPS"
        })
      )
      
     let response =  await axios.post(`http://localhost:4200/api/v1/schedule/configuration`, JSON.stringify(data), { 
          headers:{"Content-type" : "application/json"}
          })
          response.status === 200 ? alert('Udało się zmienić konfigurację.') : alert('Wystąpił błąd.')
    },
    async deleteConfiguration() {
    },
    addBracket() {
        this.ageBrackets.push({
            age: null,
            insuranceRate: null
        })
    },
    deleteBracket(index) {
        this.ageBrackets.splice(index, 1)
    },
    onSubmit() {
        

    }
  
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {display: flex;
flex-direction:column;
align-items: center;
}
</style>
