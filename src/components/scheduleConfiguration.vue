<template>
    <Popup v-if="showValidationError" @close="showValidationError = false">
      <template v-slot:header>
        <h3>Wystąpiły błędy we wprowadzanych danych</h3>
      </template>
      <template v-slot:body>
      <p class="error-alert" v-if="v$.capital.$error">
          Kapitał: {{ v$.capital.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.installmentType.$error">
          Typ rat: {{ v$.installmentType.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.installmentAmount.$error">
          Liczba rat:   {{ v$.installmentAmount.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.interestRate.$error">
          Oprocentowanie: {{ v$.interestRate.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.withdrawalDate.$error">
          Data wypłaty: {{ v$.withdrawalDate.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.commissionRate.$error">
          Prowizja: {{ v$.commissionRate.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.age.$error">
          Wiek: {{ v$.age.$errors[0].$message }}
      </p>
      
      </template>
    </Popup>
    

    <div class="form">
       
        <div class="form-row">
            <label>Kapitał: </label>
            <input :class="{'error-border' : v$.capital.$error}" 
                    @blur="v$.capital.$touch()" 
                    v-model="capital" 
                    type="number" 
                    placeholder="kapitał">
            
        </div>

        <p class="error-alert" v-if="v$.capital.$error">
            {{ v$.capital.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Typ rat: </label>
            <select :class="{'error-border' : v$.installmentType.$error}" 
                    @blur="v$.installmentType.$touch()" 
                    v-model="installmentType">
                <option value="DECREASING">Malejące</option>
                <option value="CONSTANT">Równe</option>
            <p class="error-alert" v-if="v$.installmentType.$error">
                Typ rat: {{ v$.installmentType.$errors[0].$message }}
            </p>
                
            </select>
            
        </div>

        <p class="error-alert" v-if="v$.installmentType.$error">
            {{ v$.installmentType.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Liczba rat: </label>
            <input :class="{'error-border' : v$.installmentAmount.$error}" 
                    @blur="v$.installmentAmount.$touch()" 
                    v-model="installmentAmount" 
                    type="number" 
                    placeholder="liczba rat">
            
        </div>

        <p class="error-alert" v-if="v$.installmentAmount.$error">
            {{ v$.installmentAmount.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Oprocentowanie: </label>
            <input :class="{'error-border' : v$.interestRate.$error}" 
                    @blur="v$.interestRate.$touch()" 
                    v-model="interestRate" 
                    type="number" 
                    placeholder="oprocentowanie">
        </div>

        <p class="error-alert" v-if="v$.interestRate.$error">
            {{ v$.interestRate.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Data wypłaty: </label>
            <v-date-picker  v-model="withdrawalDate" 
                            locale="pl-PL" 
                            :update-on-input="false">
                <template v-slot="{ inputValue, inputEvents }">
                    <input
                    :class="{'error-border' : v$.withdrawalDate.$error}" 
                    @blur="v$.withdrawalDate.$touch()"
                    :value="inputValue"
                    v-on="inputEvents"
                    />
                </template>
            </v-date-picker>
        </div>

        <p class="error-alert" v-if="v$.withdrawalDate.$error">
            {{ v$.withdrawalDate.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Prowizja(%) </label>
            <input :class="{'error-border' : v$.commissionRate.$error}" 
                    @blur="v$.commissionRate.$touch()" 
                    v-model="commissionRate" 
                    type="number" 
                    placeholder="prowizja">
        </div>

        <p class="error-alert" v-if="v$.commissionRate.$error">
        {{ v$.commissionRate.$errors[0].$message }}
        </p>

        <div class="form-row">
            <label>Ubezpieczenie?</label>
            <input type="checkbox" v-model="insurance">
            
        </div>
        

        <div class="form-row" v-if="insurance">
            <label>Wiek </label>
             <input :class="{'error-border' : v$.age.$error}" 
                    @blur="v$.age.$touch()" 
                    v-model="age" 
                    type="number" 
                    placeholder="wiek">
        </div>

        <p class="error-alert" v-if="v$.age.$error">
            {{ v$.age.$errors[0].$message }}
        </p>
        
        <div class="buttons-container">
            <button class="submit-button" @click="submit()">Wylicz</button>
        

        <button @click="toggleShowImport">Importuj z pliku JSON</button>
            <div class="json-import-container" v-show="showImport">
                <input type="file" id="selectJSON" value="">
                <button @click="importJSON()">Zatwierdź</button>
            </div>
        </div>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, minValue, maxValue, helpers } from '@vuelidate/validators'
import axios from 'axios'
import Popup from '../components/Popup'

const notEmpty = 'Pole nie może być puste'
export default {
    data() {
        return {
            v$: useValidate(),
            capital: null,
            installmentType: null,
            installmentAmount: null,
            interestRate: null,
            withdrawalDate: new Date(),
            commissionRate: null,
            insurance: false,
            age: null,
            showImport: false,
            conf: {},
            showValidationError: false
            }
    },
    components: {
        Popup
    },
    validations() {
        return {
            capital: {
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage('Kapitał musi wynosić przynajmniej 100zł.', minValue(100)) },
            installmentType: { 
                required: helpers.withMessage(notEmpty, required) },
            installmentAmount: { 
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage('Minimalna liczba rat to 2.', minValue(2)),
                maxValue: helpers.withMessage('Maksymalna liczba rat to 360.', maxValue(360)) },
            interestRate: { 
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage('Oprocentowanie może wynosić minimalnie: '+ this.conf.minInterestRate+'%', minValue(this.conf.minInterestRate)),
                maxValue: helpers.withMessage('Oprocentowanie może wynosić maksymalnie '+ this.conf.maxInterestRate+'%', maxValue(this.conf.maxInterestRate)) },
            withdrawalDate: { 
                required: helpers.withMessage(notEmpty, required) },
            commissionRate: { 
                required: helpers.withMessage(notEmpty, required) , 
                minValue: helpers.withMessage('Prowizja może wynosić miminalnie: '+this.conf.minCommissionRate+'%', minValue(this.conf.minCommissionRate)),
                maxValue: helpers.withMessage('Prowizja może wynosić maksymalnie: '+this.conf.maxCommissionRate+'%', maxValue(this.conf.maxCommissionRate)) },
            
            age: {
                required: this.insurance ? helpers.withMessage(notEmpty, required) : !required,
                minValue: this.insurance ?helpers.withMessage('Musisz mieć skończone 18 lat!', minValue(18)) : !required,
                maxValue: this.insurance ? helpers.withMessage('Wiek nie może przekroczyć 150.', maxValue(150)): !required 
            }
        }
    },
    props: {
        onSubmit: Function 
    },
    methods: {
        async getConfiguration() {
            let response = await axios.get('http://localhost:4200/api/v1/schedule/configuration/scheduleConfiguration')
            this.conf = response.data

            for(let k in this.conf) this.conf[k] = this.conf[k]*100
        },
        submit() { 
            this.v$.$validate()
            if (this.v$.$invalid) {
                this.showValidationError = true
                return
            }
            else {
                if (this.onSubmit != undefined) {
                this.onSubmit({
                    capital: this.capital,
                    installmentType: this.installmentType,
                    installmentAmount: this.installmentAmount,
                    interestRate: this.interestRate / 100,
                    withdrawalDate: this.withdrawalDate,
                    commissionRate: this.commissionRate / 100,
                    insurance: this.insurance,
                    age: this.insurance ? this.age : null
                    })
                }
            }   
       
        },
        importJSON() {
        const files = document.getElementById('selectJSON').files;
        if (files.length <= 0) {
          return false;
        }

        const fr = new FileReader();

        fr.onload = e => {
          const result = JSON.parse(e.target.result);
          this.capital = result.capital
          this.age = result.age
          this.insurance = result.insurance
          this.installmentType = result.installmentType
          this.installmentAmount = result.installmentAmount
          this.withdrawalDate = result.withdrawalDate
          this.commissionRate = parseFloat((result.commissionRate * 100).toFixed(2))
          this.interestRate = result.interestRate * 100
        }
        fr.readAsText(files.item(0));
        },
        toggleShowImport() {
        this.showImport = !this.showImport
        }
    },
    async mounted() {
        await this.getConfiguration();
        this.commissionRate = parseFloat((this.conf.defaultCommissionRate).toFixed(2));
    }
}
</script>

<style lang="scss" scoped>

    * {
        box-sizing: border-box;
    }

    .form {
        display: inline-block;
        width: 50%;
    }

    .form-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-bottom: 7px;
        text-align: left;
    
    
        label {
            margin-right: 15px;
            font-size: 23px;
            align-self: center;
        }

        input, select, button {
            width: 200px;
            padding: 10px;
            border: 2px solid #758078;
            border-radius: 7px;
            outline: none;
        }
    }
    .buttons-container {
        margin: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .submit-button {
            display: inline-block;
            text-align: center;
            text-decoration: none;
            margin: 2px 0;
            border: solid 2px transparent;
            border-radius: 4px;
            padding: 0.5em 1em;
            color: #ffffff;
            background-color: #16a085;
            font-weight: 600
        }
        .submit-button:active {
            transform: translateY(1px);
            filter: saturate(150%);
        }
        .submit-button:hover {
            color: #16a085;
            border-color: currentColor;
            background-color: white;
            cursor: pointer;
        }
    }
    

    button {
            width: 150px;
            height: 60px;
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
    .json-import-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    

    .error-alert {
        color: red;
        text-align: right;
        margin: 10px;
        padding: 10px;
    }
    .error-border {
        border: 2px solid red !important;
        box-shadow: 0 0 10px rgb(255, 117, 117);
        outline: none;
    }

    #selectJSON {
        padding: 20px;
        margin-left: 50px;
    }
    
    
</style>
