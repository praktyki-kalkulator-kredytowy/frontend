<template>

    <div class="form">
        <div class="form-row">
            <label>Kapitał: </label>
            <input v-model="capital" class="capital-input" type="number" placeholder="kapitał">
        </div>

        <div class="form-row">
            <label>Typ rat: </label>
            <select v-model="installmentType">
                <option value="DECREASING">Malejące</option>
                <option value="CONSTANT">Stałe</option>

                
            </select>
        </div>

        <div class="form-row">
            <label>Liczba rat: </label>
            <input v-model="installmentAmount" type="number" placeholder="liczba rat">
        </div>

        <div class="form-row">
            <label>Oprocentowanie: </label>
            <input v-model="interestRate" type="number" placeholder="oprocentowanie">
        </div>

        <div class="form-row">
            <label>Data wypłaty: </label>
            <input v-model="withdrawalDate" type="date" placeholder="data wypłaty">
        </div>

        <div class="form-row">
            <label>Prowizja </label>
            <input v-model="commission" type="number" placeholder="prowizja">
        </div>

        <div class="form-row">
            <label>Ubezpieczenie?</label>
            <select v-model="hasInsurance">
                <option value='yes'>Tak</option>
                <option value='no'>Nie</option>   
            </select>
        </div>
        
        <div class="form-row" v-show="hasInsurance ==='yes' ">
            <label>Wiek </label>
             <select v-model="ageGroup">
                <option value="under30">18-30</option>
                <option value="under50">31-50</option>
                <option value="under65">51-65</option>
                <option value="over65">66+</option>   
        </select>
        </div>
        <button @click="submit()">Wylicz</button>

    
</div>

</template>

<script>

export default {
    data() {
        return {
            capital: null,
            installmentType: null,
            installmentAmount: null,
            interestRate: null,
            withdrawalDate: null,
            commission: null,
            hasInsurance: null,
            ageGroup: null
        }
    },

    props: {
        onSubmit: Function
    },
    methods: {
        
        submit() { 
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


    button {
        cursor: pointer;
    }

    button:hover {
        background: #B2EBF2;
        border-color: #0097A7;
    }


</style>
