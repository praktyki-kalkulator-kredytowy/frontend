<template>

    

    <div class="form">
       
        <div class="form-row">
            <label>Kapitał: </label>
            <input @blur="v$.capital.$touch()" v-model="capital" type="number" placeholder="kapitał">
            
        </div>

        <p class="errorAlert" v-if="v$.capital.$error">
            {{ v$.capital.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Typ rat: </label>
            <select @blur="v$.installmentType.$touch()" v-model="installmentType">
                <option value="DECREASING">Malejące</option>
                <option value="CONSTANT">Stałe</option>

                
            </select>
            
        </div>

        <p class="errorAlert" v-if="v$.installmentType.$error">
            {{ v$.installmentType.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Liczba rat: </label>
            <input @blur="v$.installmentAmount.$touch()" v-model="installmentAmount" type="number" placeholder="liczba rat">
            
        </div>

        <p class="errorAlert" v-if="v$.installmentAmount.$error">
            {{ v$.installmentAmount.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Oprocentowanie: </label>
            <input @blur="v$.interestRate.$touch()" v-model="interestRate" type="number" placeholder="oprocentowanie">
        </div>

        <p class="errorAlert" v-if="v$.interestRate.$error">
            {{ v$.interestRate.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Data wypłaty: </label>
            <v-date-picker @blur="v$.withdrawalDate.$touch()" v-model="withdrawalDate" locale="pl-PL" :update-on-input="false">
                <template v-slot="{ inputValue, inputEvents }">
                    <input
                    :value="inputValue"
                    v-on="inputEvents"
                    />
                </template>
            </v-date-picker>
        </div>

        <p class="errorAlert" v-if="v$.withdrawalDate.$error">
            {{ v$.withdrawalDate.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Prowizja </label>
            <input @blur="v$.commissionRate.$touch()" v-model="commissionRate" type="number" placeholder="prowizja">
        </div>

        <p class="errorAlert" v-if="v$.commissionRate.$error">
        {{ v$.commissionRate.$errors[0].$message }}
        </p>

        <div class="form-row">
            <label>Ubezpieczenie?</label>
            <input type="checkbox" v-model="insurance">
            
        </div>
        

        <div class="form-row" v-if="insurance">
            <label>Wiek </label>
             <input @blur="v$.age.$touch()" v-model="age" type="number" placeholder="wiek">
        </div>

        <p class="errorAlert" v-if="v$.age.$error">
            {{ v$.age.$errors[0].$message }}
        </p>
        
        <div class="button">
            <button @click="submit()">Wylicz</button>
        </div>

        <button @click="toggleShowImport">Importuj z pliku JSON</button>
            <div v-show="showImport">
                <input type="file" id="selectJSON" value=""> <br>
                <button @click="importJSON()">Zatwierdź</button>
            </div>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, minValue, maxValue, helpers } from '@vuelidate/validators'
import axios from 'axios'


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
            conf: {}
            }
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
                alert('Nieprawidłowe dane')
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
                    age: this.age 
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
          this.commissionRate = result.commissionRate * 100
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
        this.commissionRate = this.conf.defaultCommissionRate;
    }
}
</script>

<style scoped>

    * {
        box-sizing: border-box;
    }

    .form {
        display: inline-block;
        
        
    }

    .form-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-bottom: 7px;
        text-align: left;
    }
    .button {
        margin: 7px;
        justify-content: space-between;
        
    }
    .form-row label {
        margin-right: 15px;
        font-size: 23px;
        align-self: center;
    }

    .form-row input, select, button {
        width: 200px;
        padding: 10px;
        border: 2px solid #758078;
        border-radius: 7px;
    }
    

    button {
        cursor: pointer;
    }

    button:hover {
        background: #B2EBF2;
        border-color: #0097A7;
    }

    .errorAlert {
        color: red;
        text-align: right;
        margin: 10px;
        padding: 10px;
    }

    #selectJSON {
        padding: 20px;
        margin-left: 50px;
    }
    
    
</style>
