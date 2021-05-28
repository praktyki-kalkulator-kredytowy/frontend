<template>
<h1>Konfiguracja aplikacji</h1>
<h3 v-show="loading">Trwa ładowanie...</h3>
<Popup v-if="showValidationError" @close="showValidationError = false">
      <template v-slot:header>
        <h3>Wystąpiły błędy we wprowadzanych danych</h3>
      </template>
      <template v-slot:body>
      
      <p class="error-alert" v-if="v$.minInterestRate.$error">
          Minimalne oprocentowanie: {{ v$.minInterestRate.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.maxInterestRate.$error">
          Maksymalne oprocentowanie: {{ v$.maxInterestRate.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.minCommissionAmount.$error">
          Minimalna kwota prowizji:   {{ v$.minCommissionAmount.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.minCommissionRate.$error">
          Minimalna wartość prowizji: {{ v$.minCommissionRate.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.maxCommissionRate.$error">
          Maksymalna wartość prowizji: {{ v$.maxCommissionRate.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.defaultCommissionRate.$error">
          Domyślna wartość prowizji: {{ v$.defaultCommissionRate.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.minInsurancePremium.$error">
          Minimalna kwota składki ubezpieczeniowej: {{ v$.minInsurancePremium.$errors[0].$message }}
      </p>
      
      </template>
</Popup>

<Popup v-if="showRequestSuccess" @close="showRequestSuccess = false">
      <template v-slot:header>
        <h3>Sukces!</h3>
      </template>
      <template v-slot:body>
        Udało się zmienić konfigurację.
      </template>
</Popup>

<Popup v-if="showRequestFail" @close="showRequestFail = false">
      <template v-slot:header>
        <h3>Wystąpił błąd aplikacji</h3>
      </template>
      <template v-slot:body>
        <p>Nie udało się zmienić konfiguracji.</p>
        <p>Proszę skontaktuj się z administratorem aplikacji.</p>
      </template>
      <template v-slot:footer>
        Przepraszamy za nieudogodnienie.
      </template>
</Popup>

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
      <td><input :class="{'error-border' : v$.minInterestRate.$invalid}" type="number" v-model="minInterestRate"></td>
      <td><button @click="setConfiguration('MIN_INTEREST_RATE', minInterestRate/100, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MIN_INTEREST_RATE', 'DEFAULT'); 
                       getConfiguration('minInterestRate', 'MIN_INTEREST_RATE', true)">Przywróć domyślne</button></td>
      </tr>

      <tr>
      <td><label>Maksymalne oprocentowanie(%):</label></td>
      <td><input :class="{'error-border' : v$.maxInterestRate.$invalid}" type="number" v-model="maxInterestRate"></td>
      <td><button @click="setConfiguration('MAX_INTEREST_RATE', maxInterestRate/100, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MAX_INTEREST_RATE', 'DEFAULT');
                      getConfiguration('maxInterestRate', 'MAX_INTEREST_RATE', true)">Przywróć domyślne</button></td>
      </tr>
    

    <tr>
      <td><label>Minimalna kwota prowizji(PLN):</label></td>
      <td><input :class="{'error-border' : v$.minCommissionAmount.$invalid}" type="number" v-model="minCommissionAmount"></td>
      <td><button @click="setConfiguration('MIN_COMMISSION_AMOUNT', minCommissionAmount, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MIN_COMMISSION_AMOUNT', 'DEFAULT');
                      getConfiguration('minCommissionAmount', 'MIN_COMMISSION_AMOUNT', false)">Przywróć domyślne</button></td>
      
    </tr>

    <tr>
      <td><label>Minimalna wartość prowizji(%):</label></td>
      <td><input :class="{'error-border' : v$.minCommissionRate.$invalid}" type="number" v-model="minCommissionRate"></td>
      <td><button @click="setConfiguration('MIN_COMMISSION_RATE', minCommissionRate/100, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MIN_COMMISSION_RATE', 'DEFAULT');
                      getConfiguration('minCommissionRate', 'MIN_COMMISSION_RATE', true)">Przywróć domyślne</button></td>
    </tr>

    <tr>
      <td><label>Maksymalna wartość prowizji(%):</label></td>
      <td><input :class="{'error-border' : v$.maxCommissionRate.$invalid}" type="number" v-model="maxCommissionRate"></td>
      <td><button @click="setConfiguration('MAX_COMMISSION_RATE', maxCommissionRate/100, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MAX_COMMISSION_RATE', 'DEFAULT');
                      getConfiguration('maxCommissionRate', 'MAX_COMMISSION_RATE', true)">Przywróć domyślne</button></td>
    </tr>

    <tr>
      <td><label>Domyślna wartość prowizji(%):</label></td>
      <td><input :class="{'error-border' : v$.defaultCommissionRate.$invalid}" type="number" v-model="defaultCommissionRate"></td>
      <td><button @click="setConfiguration('DEFAULT_COMMISSION_RATE', defaultCommissionRate/100, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('DEFAULT_COMMISSION_RATE', 'DEFAULT');
                      getConfiguration('defaultCommissionRate', 'DEFAULT_COMMISSION_RATE', true)">Przywróć domyślne</button></td>
    </tr>

    <tr>
      <td><label>Minimalna kwota składki ubezpieczeniowej(PLN):</label></td>
      <td><input :class="{'error-border' : v$.minInsurancePremium.$invalid}" type="number" v-model="minInsurancePremium">
      </td>
      <td><button @click="setConfiguration('MIN_PREMIUM_VALUE', minInsurancePremium, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MIN_PREMIUM_VALUE', 'DEFAULT');
                      getConfiguration('minInsurancePremium', 'MIN_PREMIUM_VALUE', false)">Przywróć domyślne</button>
      </td>
    </tr>
    
    <tr>
      <td><label>Częstotliwość płatności składki ubezpieczeniowej(mies.):</label></td>
      <td><input :class="{'error-border' : v$.PaymentFrequency.$invalid}" type="number" v-model="PaymentFrequency"></td>
      <td><button @click="setConfiguration('MONTH_FRAME', PaymentFrequency, 'DEFAULT')">Zapisz</button></td>
      <td><button @click="deleteConfiguration('MONTH_FRAME', 'DEFAULT');
                      getConfiguration('PaymentFrequency', 'MONTH_FRAME', false)">Przywróć domyślne</button>
      </td>
    </tr>
  </tbody>
  </table>
   <br><br>
   <table>
     <thead>
        <tr>
          <th>Lp.</th>
          <th>Dolny limit wieku</th>
          <th>Koszt ubezpieczenia(%)</th>
          <th colspan="2">Akcja</th>
        </tr>
     </thead>
    
      
    
    <tr v-for="(ageBracket, index) in ageBrackets"
      v-bind:key="index">
        
        <td><label>{{index+1}}. </label></td>
        <td><input type="number" v-model="ageBracket.age" required></td>

        
        <td><input type="number" v-model="ageBracket.insuranceRate" required></td>
        <td><button @click="setConfiguration(ageBracket.age, ageBracket.insuranceRate/100, 'INSURANCE_GROUPS')">Zapisz</button></td>
        <td><button @click="deleteBracket(index); deleteConfiguration(ageBracket.age, 'INSURANCE_GROUPS')">Przywróć domyślne</button></td>
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
import Popup from '../components/Popup'

const notEmpty = 'Pole nie może być puste'
const notNegative = 'Wartość nie może być ujemna'
const notInt = 'Wartość musi być liczbą całkowitą'
function isInt (value) {
  return (/^\d+$/.test(value)) ? true : false
}

export default {
  name: 'UserConfig',
  components: {
    Popup
  },
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
        ],
        showValidationError: false,
        showRequestSuccess: false,
        showRequestFail: false,
        loading: false
        

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

      this.loading = true

      if (this.v$.$invalid) {
          this.showValidationError = true
          return
      }
      let data = {
          key: key,
          value: value,
          group: group
      }
      
      await axios.post(`http://localhost:4200/api/v1/schedule/configuration`, JSON.stringify(data), { 
          headers:{"Content-type" : "application/json"}
          })
          .then(() => {
            this.showRequestSuccess = true
            })
          .catch(() => {
            this.showRequestFail = true
            })
          .finally(() => {
            this.loading = false
          })
          
    },
    async deleteConfiguration(key, groupKey) {
      this.loading = true
      let data = {
        key: key,
        groupKey: groupKey
      }
      await axios.delete(`http://localhost:4200/api/v1/schedule/configuration`, { data: data })
      .then(() => {
        this.showRequestSuccess = true
      })
      .catch(() => {
        this.showRequestFail = true
      })
      .finally(() => {
        this.loading = false
      })
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
      border: 2px solid lightgray;
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
    button:focus {
      outline: none;
    }
   
    
}
 .error-alert {
      color: red;
  }
  
  .error-border {
    border: 2px solid red !important;
    box-shadow: 0 0 10px rgb(255, 117, 117);
  }
  
  
.return {
  margin: 100px;
}
</style>
