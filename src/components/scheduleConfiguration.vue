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
            <input type="radio" id="insurance" name="insurance" v-model='insurance' :value=true >
            <label for="insurance">Tak</label>
            <input type="radio" id="noinsurance" name="insurance" v-model='insurance' :value=false >
            <label for="noinsurance">Nie</label>
            <p v-if="v$.insurance.$error">
                {{ v$.insurance.$errors[0].$message }}
            </p>
        </div>
        
        <div class="form-row" v-if="insurance">
            <label>Wiek </label>
             <input v-model="age" type="number" placeholder="wiek">
        <p v-if="v$.age.$error">
                {{ v$.age.$errors[0].$message }}
            </p>
        </div>
        <button @click="submit()">Wylicz</button>
        {{ insurance }}
        <br>
        {{ v$.age }}
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
            withdrawalDate: null,
            commission: null,
            insurance: null,
            age: null
        }
    },
    validations() {
        return {
            capital: {
                 required: helpers.withMessage(notEmpty, required) },
            installmentType: { 
                required: helpers.withMessage(notEmpty, required) },
            installmentAmount: { 
                required: helpers.withMessage(notEmpty, required),
                minValue: helpers.withMessage('Minimalna liczba rat to 2', minValue(2)),
                maxValue: helpers.withMessage('Maksymalna liczba rat to 360', maxValue(360)) },
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
            age: {
                minValue: helpers.withMessage('Musisz mieć skończone 18 lat!', minValue(18))
            }
        }
    },
    props: {
        onSubmit: Function
    },
    methods: {
       
        submit() { 
            this.v$.$touch()
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
                    withdrawalDate: this.withdrawalDate
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
