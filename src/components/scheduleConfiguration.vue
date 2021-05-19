<template>

    

    <div class="form">
       
        <div class="form-row">
            <label>Kapitał: </label>
            <input v-model="capital" type="number" placeholder="kapitał">
            
        </div>

        <p class="errorAlert" v-if="v$.capital.$error">
            {{ v$.capital.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Typ rat: </label>
            <select v-model="installmentType">
                <option value="DECREASING">Malejące</option>
                <option value="CONSTANT">Stałe</option>

                
            </select>
            
        </div>

        <p class="errorAlert" v-if="v$.installmentType.$error">
            {{ v$.installmentType.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Liczba rat: </label>
            <input v-model="installmentAmount" type="number" placeholder="liczba rat">
            
        </div>

        <p class="errorAlert" v-if="v$.installmentAmount.$error">
            {{ v$.installmentAmount.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Oprocentowanie: </label>
            <input v-model="interestRate" type="number" placeholder="oprocentowanie">
        </div>

        <p class="errorAlert" v-if="v$.interestRate.$error">
            {{ v$.interestRate.$errors[0].$message }}
        </p>


        <div class="form-row">
            <label>Data wypłaty: </label>
            <v-date-picker v-model="withdrawalDate" locale="pl-PL" :update-on-input="false">
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
            <input v-model="commissionRate" type="number" placeholder="prowizja">
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
             <input v-model="age" type="number" placeholder="wiek">
        </div>

        <p class="errorAlert" v-if="v$.age.$error">
            {{ v$.age.$errors[0].$message }}
        </p>
        
        <div class="button">
            <button @click="submit()">Wylicz</button>
        </div>

    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, minValue, maxValue, helpers} from '@vuelidate/validators'


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
            age: null
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
                minValue: helpers.withMessage('Minimalna liczba rat to 2,', minValue(2)),
                maxValue: helpers.withMessage('Maksymalna liczba rat to 360,', maxValue(360)) },
            interestRate: { 
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage('Oprocentowanie nie może być ujemne,', minValue(0)) },
            withdrawalDate: { 
                required: helpers.withMessage(notEmpty, required) },
            commissionRate: { 
                required: helpers.withMessage(notEmpty, required) , 
                minValue: helpers.withMessage('Prowizja nie może być ujemna.', minValue(0)),
                maxValue: helpers.withMessage('Prowizja może wynosić maksymalnie 20%,', maxValue(20)) },
            
            age: {
                required: this.insurance ? helpers.withMessage(notEmpty, required) : !required,
                minValue: helpers.withMessage('Musisz mieć skończone 18 lat!', minValue(18)),
                maxValue: helpers.withMessage('Wiek nie może przekroczyć 150.', maxValue(150))
            }
        }
    },
    props: {
        onSubmit: Function 
    },
    methods: {
       
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
       
    }
    
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
    
    
</style>
