<template>

    <div class="form">
       
        <div class="form-row">
            <label>Kapitał: </label>
            <input v-model="capital" class="capital-input" type="number" placeholder="kapitał">
            <p v-if="v$.capital.$error">
                {{ v$.capital.$errors[0].$message }}
            </p>
        </div>

        <div class="form-row">
            <label>Typ rat: </label>
            <select v-model="installmentType">
                <option value="DECREASING">Malejące</option>
                <option value="CONSTANT">Stałe</option>

                
            </select>
            <p v-if="v$.installmentType.$error">
                {{ v$.installmentType.$errors[0].$message }}
            </p>
        </div>

        <div class="form-row">
            <label>Liczba rat: </label>
            <input v-model="installmentAmount" type="number" placeholder="liczba rat">
            <p v-if="v$.installmentAmount.$error">
                {{ v$.installmentAmount.$errors[0].$message }}
            </p>
        </div>

        <div class="form-row">
            <label>Oprocentowanie: </label>
            <input v-model="interestRate" type="number" placeholder="oprocentowanie">
            <p v-if="v$.interestRate.$error">
                {{ v$.interestRate.$errors[0].$message }}
            </p>
        </div>

        <div class="form-row">
            <label>Data wypłaty: </label>
            <input v-model="withdrawalDate" type="date" placeholder="data wypłaty">
            <p v-if="v$.withdrawalDate.$error">
                {{ v$.withdrawalDate.$errors[0].$message }}
            </p>
        </div>

        <div class="form-row">
            <label>Prowizja </label>
            <input v-model="commission" type="number" placeholder="prowizja">
            <p v-if="v$.commission.$error">
                {{ v$.commission.$errors[0].$message }}
            </p>
        </div>

        <div class="form-row">
            <label>Ubezpieczenie?</label>
            <select v-model="insurance">
                <option value=true>Tak</option>
                <option value=false>Nie</option>   
            </select>
            <p v-if="v$.insurance.$error">
                {{ v$.insurance.$errors[0].$message }}
            </p>
        </div>
        
        <div class="form-row" v-show="insurance">
            <label>Wiek </label>
             <select v-model="ageGroup">
                <option value="under30">18-30</option>
                <option value="under50">31-50</option>
                <option value="under65">51-65</option>
                <option value="over65">66+</option>   
        </select>
        <p v-if="v$.ageGroup.$error">
                {{ v$.ageGroup.$errors[0].$message }}
            </p>
        </div>
        <button @click="submit()">Wylicz</button>
   
</div>

</template>

<script>
import useValidate from '@vuelidate/core'
import { required, minValue, maxValue, helpers } from '@vuelidate/validators'

const notEmpty = 'Pole nie może być puste'
export default {
    data() {
        return {
            v$: useValidate(),
            capital: null,
            installmentType: null,
            installmentAmount: null,
            interestRate: null,
            withdrawalDate: null,
            commission: null,
            insurance: false,
            ageGroup: null
        }
    },
    validations() {
        return {
            capital: {
                 required: helpers.withMessage(notEmpty, required) },
            installmentType: { 
                required: helpers.withMessage(notEmpty, required) },
            installmentAmount: { 
                required: helpers.withMessage(notEmpty, required) },
            interestRate: { 
                required: helpers.withMessage(notEmpty, required) },
            withdrawalDate: { 
                required: helpers.withMessage(notEmpty, required) },
            commission: { 
                required: helpers.withMessage(notEmpty, required) , 
                minValue: helpers.withMessage('Prowizja musi być większa od zera.', minValue(0)),
                maxValue: helpers.withMessage('Prowizja może wynosić maksymalnie 20%', maxValue(20)) },
            insurance: { 
                required: helpers.withMessage(notEmpty, required) },
            ageGroup: { 
                required: helpers.withMessage(notEmpty, required) },
        }
    },
    props: {
        onSubmit: Function
    },
    methods: {
       
        submit() { 
            this.v$.$validate()
            if (!this.v$.$error) {
            if(this.onSubmit != undefined) {
                this.onSubmit({
                    capital: this.capital,
                    installmentType: this.installmentType,
                    installmentAmount: this.installmentAmount,
                    interestRate: this.interestRate / 100,
                    withdrawalDate: this.withdrawalDate
                })
            }
        }
        else  {
            alert('Nieprawidłowe dane')
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
    .form-row p {
        color: red;
        display: block;
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
        text-align: left;
        border: 2px solid red;
        margin: 20px;
        padding: 10px;
    }
    
    
</style>
