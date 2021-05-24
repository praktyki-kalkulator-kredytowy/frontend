<template>
 <div>
    <h1>Konfiguracja aplikacji</h1>
      <label>Minimalne oprocentowanie(%):</label>
      <input type="number" v-model="minInterestRate" required>
      <button @click="setConfiguration('MIN_INTEREST_RATE', minInterestRate/100, 'DEFAULT')">Edytuj</button>
      <button @click="deleteConfiguration('MIN_INTEREST_RATE', 'DEFAULT'); minInterestRate = null;
                       getConfiguration('minInterestRate', 'MIN_INTEREST_RATE', true)">Usuń</button>
      <p class="errorAlert" v-if="v$.minInterestRate.$error">
            {{ v$.minInterestRate.$errors[0].$message }}
      </p>
    <br>
      <label>Maksymalne oprocentowanie(%):</label>
      <input type="number" v-model="maxInterestRate" required>
      <button @click="setConfiguration('MAX_INTEREST_RATE', maxInterestRate/100, 'DEFAULT')">Edytuj</button>
      <button @click="deleteConfiguration('MAX_INTEREST_RATE', 'DEFAULT'); maxInterestRate = null;
                      getConfiguration('maxInterestRate', 'MAX_INTEREST_RATE', true)">Usuń</button>
      <p class="errorAlert" v-if="v$.maxInterestRate.$error">
            {{ v$.maxInterestRate.$errors[0].$message }}
      </p>
    <br>
      <label>Minimalna kwota prowizji(PLN):</label>
      <input type="number" v-model="minCommissionAmount" required>
      <button @click="setConfiguration('MIN_COMMISSION_AMOUNT', minCommissionAmount, 'DEFAULT')">Edytuj</button>
      <button @click="deleteConfiguration('MIN_COMMISSION_AMOUNT', 'DEFAULT'); minCommissionAmount = null;
                      getConfiguration('minCommissionAmount', 'MIN_COMMISSION_AMOUNT', false)">Usuń</button>
      <p class="errorAlert" v-if="v$.minCommissionAmount.$error">
            {{ v$.minCommissionAmount.$errors[0].$message }}
      </p>
    <br>
      <label>Minimalna wartość prowizji(%):</label>
      <input type="number" v-model="minCommissionRate" required>
      <button @click="setConfiguration('MIN_COMMISSION_RATE', minCommissionRate/100, 'DEFAULT')">Edytuj</button>
      <button @click="deleteConfiguration('MIN_COMMISSION_RATE', 'DEFAULT'); minCommissionRate = null;
                      getConfiguration('minCommissionRate', 'MIN_COMMISSION_RATE', true)">Usuń</button>
      <p class="errorAlert" v-if="v$.minCommissionRate.$error">
            {{ v$.minCommissionRate.$errors[0].$message }}
      </p>
    <br>
      <label>Maksymalna wartość prowizji(%):</label>
      <input type="number" v-model="maxCommissionRate" required>
      <button @click="setConfiguration('MAX_COMMISSION_RATE', maxCommissionRate/100, 'DEFAULT')">Edytuj</button>
      <button @click="deleteConfiguration('MAX_COMMISSION_RATE', 'DEFAULT'); maxCommissionRate = null
                      getConfiguration('maxCommissionRate', 'MAX_COMMISSION_RATE', true)">Usuń</button>
      <p class="errorAlert" v-if="v$.maxCommissionRate.$error">
            {{ v$.maxCommissionRate.$errors[0].$message }}
      </p>
    <br>
      <label>Domyślna wartość prowizji(%):</label>
      <input type="number" v-model="defaultCommissionRate" required>
      <button @click="setConfiguration('DEFAULT_COMMISSION_RATE', defaultCommissionRate/100, 'DEFAULT')">Edytuj</button>
      <button @click="deleteConfiguration('DEFAULT_COMMISSION_RATE', 'DEFAULT'); defaultCommissionRate = null
                      getConfiguration('defaultCommissionRate', 'DEFAULT_COMMISSION_RATE', true)">Usuń</button>
      <p class="errorAlert" v-if="v$.defaultCommissionRate.$error">
            {{ v$.defaultCommissionRate.$errors[0].$message }}
      </p>
    <br>
      <label>Minimalna kwota składki ubezpieczeniowej(PLN):</label>
      <input type="number" v-model="minInsurancePremium" required>
      <button @click="setConfiguration('MIN_PREMIUM_VALUE', minInsurancePremium, 'DEFAULT')">Edytuj</button>
      <button @click="deleteConfiguration('MIN_PREMIUM_VALUE', 'DEFAULT'); minInsurancePremium = null
                      getConfiguration('minInsurancePremium', 'MIN_PREMIUM_VALUE', false)">Usuń</button>
      <p class="errorAlert" v-if="v$.minInsurancePremium.$error">
            {{ v$.minInsurancePremium.$errors[0].$message }}
      </p>
    <br>
      <label>Częstotliwość płatności składki ubezpieczeniowej(mies.):</label>
      <input type="number" v-model="PaymentFrequency" required>
      <button @click="setConfiguration('MONTH_FRAME', PaymentFrequency, 'DEFAULT')">Edytuj</button>
      <button @click="deleteConfiguration('MONTH_FRAME', 'DEFAULT'); PaymentFrequency = null;
                      getConfiguration('PaymentFrequency', 'MONTH_FRAME', false)">Usuń</button>
      <p class="errorAlert" v-if="v$.PaymentFrequency.$error">
            {{ v$.PaymentFrequency.$errors[0].$message }}
      </p>
    <br><br>
      <button @click="addBracket">Dodaj przedział wiekowy</button>
    <br>
    <div class="bracket"
      v-for="(ageBracket, index) in ageBrackets"
      v-bind:key="index">
        <p @click="deleteBracket(index); deleteConfiguration(ageBracket.age, 'INSURANCE_GROUPS')">x</p>
        <label>{{index+1}}. Wiek:</label>
        <input type="number" v-model="ageBracket.age" required>
         
        <br>
        <label>Koszt ubezpieczenia(%):</label>
        <input type="number" v-model="ageBracket.insuranceRate" required>
        <button @click="setConfiguration(ageBracket.age, ageBracket.insuranceRate/100, 'INSURANCE_GROUPS')">Edytuj</button>
         
    </div>
      <br><br>

    <router-link to="/">Przejdź do strony głównej</router-link>
</div>


</template>

<script>
import axios from 'axios'
import useValidate from '@vuelidate/core'
import { required, minValue, maxValue, helpers} from '@vuelidate/validators'

const notEmpty = 'Pole nie może być puste'
const notNegative = 'Wartość nie może być ujemna'
const notInt = 'Wartość musi być liczbą całkowitą'
function isInt (value) {
  return (/^\d+$/.test(value)) ? true : false
}

export default {
  name: 'UserConfig',
  data() {
    return {
        v$: useValidate(),
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
        ]
        

    }
  },
  validations() {
        return {
              minInterestRate: {
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage(notNegative, minValue(0)),
                maxValue: helpers.withMessage('Minimalne oprocentowanie nie może być wyższe niż maksymalne', maxValue(this.maxInterestRate)) 
              },
              maxInterestRate: {
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage('Maksymalne oprocentowanie nie może być niższe niż minimalne', minValue(this.minInterestRate)),
              },
              minCommissionAmount: {
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage(notNegative, minValue(0)) 
              },
              minCommissionRate: {
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage(notNegative, minValue(0)),
                maxValue: helpers.withMessage('Minimalna wartość prowizji nie może być wyższa niż maksymalna', maxValue(this.maxCommissionRate)) 
              },
              maxCommissionRate: {
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage('Maksymalna wartość prowizji nie może być niższa niż minimalna', minValue(this.minCommissionRate)) 
              },
              defaultCommissionRate: {
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage('Domyślna wartość prowizji nie może być niższa niż minimalna', minValue(this.minCommissionRate)),
                maxValue: helpers.withMessage('Domyślna wartość prowizji nie może być wyższa niż maksymalna', maxValue(this.maxCommissionRate))
              },
              minInsurancePremium: {
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage(notNegative, minValue(0)) 
              },
              PaymentFrequency: {
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage(notNegative, minValue(0)),
                OnlyDigits: helpers.withMessage(notInt, isInt)
              },
              ageBrackets: {
                $each: {
                  age: {
                    required: helpers.withMessage(notEmpty, required),
                    minValue: helpers.withMessage(notNegative, minValue(0))
                  },
                  insuranceRate: {
                    required: helpers.withMessage(notEmpty, required),
                    minValue: helpers.withMessage(notNegative, minValue(0))
                  }
                }   
              } 
        }
  },
  
  methods: {
    async getConfiguration(_data, key, isPercentage) {
       await axios.get(`http://localhost:4200/api/v1/schedule/configuration?groupKey=DEFAULT&key=${key}`)
      .then(response => this[_data] = parseFloat(((response.data.value * (isPercentage ? 100 : 1))).toFixed(2)))
    },
    async getAgeBrackets() {
        await axios.get(`http://localhost:4200/api/v1/schedule/configuration/group?groupKey=INSURANCE_GROUPS`)
        .then(response => {
          for(let i = 0; i<response.data.length; i++) {
          if (this.ageBrackets[i] === undefined) {
            this.ageBrackets.push({
                age: null,
                insuranceRate: null
          })}
          this.ageBrackets[i].age = response.data[i].key.key
          this.ageBrackets[i].insuranceRate = parseFloat((response.data[i].value*100).toFixed(2))
          }
        })
    },
    async setConfiguration(key, value, group) {
      if (this.v$.$invalid) {
          alert('Nieprawidłowe dane')
          return
      }
      let data = {
          key: key,
          value: value,
          group: group
      }
      
      
     let response =  await axios.post(`http://localhost:4200/api/v1/schedule/configuration`, JSON.stringify(data), { 
          headers:{"Content-type" : "application/json"}
          })
          response.status === 200 ? alert('Udało się zmienić konfigurację.') : alert('Wystąpił błąd.')
    },
    async deleteConfiguration(key, groupKey) {
      let data = {
        key: key,
        groupKey: groupKey
      }
      let response = await axios.delete(`http://localhost:4200/api/v1/schedule/configuration`, { data: data })
      response.status == 200 ? alert('Udało się usunąć konfigurację.') : alert('Wystąpił błąd.')
    },
    addBracket() {
        this.ageBrackets.push({
            age: null,
            insuranceRate: null
        })
    },
    deleteBracket(index) {
        this.ageBrackets.splice(index, 1)
    }
  
  },
  mounted() {
    this.getConfiguration('minInsurancePremium', "MIN_PREMIUM_VALUE", false),
    this.getConfiguration('minCommissionAmount', "MIN_COMMISSION_AMOUNT", false),
    this.getConfiguration('minInterestRate', "MIN_INTEREST_RATE", true),
    this.getConfiguration('maxInterestRate', "MAX_INTEREST_RATE", true),
    this.getConfiguration('minCommissionRate', "MIN_COMMISSION_RATE", true),
    this.getConfiguration('maxCommissionRate', "MAX_COMMISSION_RATE", true),
    this.getConfiguration('defaultCommissionRate', "DEFAULT_COMMISSION_RATE", true),
    this.getConfiguration('PaymentFrequency', "MONTH_FRAME", false),
    this.getAgeBrackets(),
    this.v$.$touch()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {display: flex;
flex-direction:column;
align-items: center;
}
.errorAlert {
        color: red;
        text-align: right;
        margin: 10px;
        padding: 10px;    
  }
  .bracket {
    border: 1px solid black;
    padding: 20px;
    padding-top: 10px;
    margin: 5px;
  }
</style>
