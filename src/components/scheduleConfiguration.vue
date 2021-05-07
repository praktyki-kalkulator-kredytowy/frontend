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

                <div class="select-arrow"></div>
            </select>
        </div>

        <div class="form-row">
            <label>Ilość rat: </label>
            <input v-model="installmentAmount" type="number" placeholder="ilość rat">
        </div>

        <div class="form-row">
            <label>Oprocentowanie: </label>
            <input v-model="interestRate" type="number" placeholder="oprocentowanie">
        </div>

        <div class="form-row">
            <label>Data wypłaty: </label>
            <input v-model="withdrawalDate" type="date" placeholder="data wypłaty">
        </div>

        <button v-on:click="submit()">Wylicz</button>

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
            withdrawalDate: null
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
