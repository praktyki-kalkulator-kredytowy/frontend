<template>
<h1>Konfiguracja aplikacji</h1>
 <div class="user-config">
   
   
   <table>
     <thead>
       <th>Nazwa</th>
       <th>Wartość</th>
       <th colspan="2">Akcja</th>
     </thead>
    <tbody>
    <tr>
      <td><label>Minimalne oprocentowanie(%):</label></td>
      <td><input type="number" v-model="minInterestRate" required>
      <p class="error-alert" v-if="v$.minInterestRate.$error">
            {{ v$.minInterestRate.$errors[0].$message }}
      </p></td>
      <td><button @click="setConfiguration('MIN_INTEREST_RATE', minInterestRate/100, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MIN_INTEREST_RATE', 'DEFAULT'); 
                       getConfiguration('minInterestRate', 'MIN_INTEREST_RATE', true)">Usuń</button></td>
      
      </tr>
      <tr>
      <td><label>Maksymalne oprocentowanie(%):</label></td>
      <td><input type="number" v-model="maxInterestRate" required>
      <p class="error-alert" v-if="v$.maxInterestRate.$error">
            {{ v$.maxInterestRate.$errors[0].$message }}
      </p></td>
      <td><button @click="setConfiguration('MAX_INTEREST_RATE', maxInterestRate/100, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MAX_INTEREST_RATE', 'DEFAULT');
                      getConfiguration('maxInterestRate', 'MAX_INTEREST_RATE', true)">Usuń</button></td>
      
      </tr>
    

    <tr>
      <td><label>Minimalna kwota prowizji(PLN):</label></td>
      <td><input type="number" v-model="minCommissionAmount" required>
      <p class="error-alert" v-if="v$.minCommissionAmount.$error">
            {{ v$.minCommissionAmount.$errors[0].$message }}
      </p></td>
      <td><button @click="setConfiguration('MIN_COMMISSION_AMOUNT', minCommissionAmount, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MIN_COMMISSION_AMOUNT', 'DEFAULT');
                      getConfiguration('minCommissionAmount', 'MIN_COMMISSION_AMOUNT', false)">Usuń</button></td>
      
    </tr>

    <tr>
      <td><label>Minimalna wartość prowizji(%):</label></td>
      <td><input type="number" v-model="minCommissionRate" required>
      <p class="error-alert" v-if="v$.minCommissionRate.$error">
            {{ v$.minCommissionRate.$errors[0].$message }}
      </p></td>
      <td><button @click="setConfiguration('MIN_COMMISSION_RATE', minCommissionRate/100, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MIN_COMMISSION_RATE', 'DEFAULT');
                      getConfiguration('minCommissionRate', 'MIN_COMMISSION_RATE', true)">Usuń</button></td>
      
      </tr>

    <tr>
      <td><label>Maksymalna wartość prowizji(%):</label></td>
      <td><input type="number" v-model="maxCommissionRate" required>
      <p class="error-alert" v-if="v$.maxCommissionRate.$error">
            {{ v$.maxCommissionRate.$errors[0].$message }}
      </p></td>
      <td><button @click="setConfiguration('MAX_COMMISSION_RATE', maxCommissionRate/100, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MAX_COMMISSION_RATE', 'DEFAULT');
                      getConfiguration('maxCommissionRate', 'MAX_COMMISSION_RATE', true)">Usuń</button></td>
      

    </tr>
    <tr>
      <td><label>Domyślna wartość prowizji(%):</label></td>
      <td><input type="number" v-model="defaultCommissionRate" required>
      <p class="error-alert" v-if="v$.defaultCommissionRate.$error">
            {{ v$.defaultCommissionRate.$errors[0].$message }}
      </p></td>
      <td><button @click="setConfiguration('DEFAULT_COMMISSION_RATE', defaultCommissionRate/100, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('DEFAULT_COMMISSION_RATE', 'DEFAULT');
                      getConfiguration('defaultCommissionRate', 'DEFAULT_COMMISSION_RATE', true)">Usuń</button></td>
      

    </tr>
    <tr>
      <td><label>Minimalna kwota składki ubezpieczeniowej(PLN):</label></td>
      <td><input type="number" v-model="minInsurancePremium" required>
      <p class="error-alert" v-if="v$.minInsurancePremium.$error">
            {{ v$.minInsurancePremium.$errors[0].$message }}
      </p></td>
      <td><button @click="setConfiguration('MIN_PREMIUM_VALUE', minInsurancePremium, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MIN_PREMIUM_VALUE', 'DEFAULT'); minInsurancePremium = null
                      getConfiguration('minInsurancePremium', 'MIN_PREMIUM_VALUE', false)">Usuń</button></td>
      

    </tr>
    
    <tr>
      <td><label>Częstotliwość płatności składki ubezpieczeniowej(mies.):</label></td>
      <td><input type="number" v-model="PaymentFrequency" required>
      <p class="error-alert" v-if="v$.PaymentFrequency.$error">
            {{ v$.PaymentFrequency.$errors[0].$message }}
      </p></td>
      <td><button @click="setConfiguration('MONTH_FRAME', PaymentFrequency, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MONTH_FRAME', 'DEFAULT'); PaymentFrequency = null;
                      getConfiguration('PaymentFrequency', 'MONTH_FRAME', false)">Usuń</button></td>
      
    </tr>
  </tbody>
  </table>
   <br><br>
   <table>
     <thead>
        <tr>
          <th>Lp.</th>
          <th>Wiek:</th>
          <th>Koszt ubezpieczenia(%):</th>
          <th colspan="2">Akcja</th>
        </tr>
     </thead>
    
      
    
    <tr v-for="(ageBracket, index) in ageBrackets"
      v-bind:key="index">
        
        <td><label>{{index+1}}. </label></td>
        <td><input type="number" v-model="ageBracket.age" required></td>

        
        <td><input type="number" v-model="ageBracket.insuranceRate" required></td>
        <td><button @click="setConfiguration(ageBracket.age, ageBracket.insuranceRate/100, 'INSURANCE_GROUPS')">Zapisz</button></td>
        <td><button @click="deleteBracket(index); deleteConfiguration(ageBracket.age, 'INSURANCE_GROUPS')">Usuń</button></td>
    </tr>
    
    
    
    </table>
    <button @click="addBracket">Dodaj przedział wiekowy</button>
</div>
<div class="return">
  <button class="nav-button" @click="$router.push('/')">Powróć do strony głównej</button>
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
                    minValue: helpers.withMessage(notNegative, minValue(0)),
                    OnlyDigits: helpers.withMessage(notInt, isInt)
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
<style lang="scss" scoped>

.user-config {
  margin: 30px 15% 50px 15%;
   table {
        border-collapse: collapse;
        border: 1px solid lightgray;
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px, 8px rgba(0, 0, 0, 0.2);
        width: 100%;
        
    }
    th,td{
        padding: 12px;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }
    td {
        white-space: nowrap;
        font-weight: 600;
        height: 40px;
        padding: 0 15px;
    }
    th {
        height: 60px;
    }
    thead{
        background-color: #16a085;
        color: #fff;
    }
    input {
      outline: none;
      border: 1px solid lightgray;
      height: 90%;
      width: 100%;
    }
    button {
      width: 150px;
      height: 90%;
      margin: 5px;
      color: #16a085;
      background-color: white;
      display: inline-block;
      text-align: center;
      text-decoration: none;
      border: solid 2px #16a085;
      border-radius: 4px;
      padding: 0.5em 1em;
      font-weight: 600;
    }
    button:hover {
      color: white;
      border-color: currentColor;
      background-color: #16a085;
      cursor: pointer;
    }
    .error-alert {
      color: red;
    }
    .error-border {
      border: 1px solid pink
    }
}
.return {
  margin: 100px;
}
</style>
