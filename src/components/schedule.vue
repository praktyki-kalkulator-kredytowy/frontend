<template>
    <div class="schedule-summary-container" v-if="schedule.payments.length > 0">
        <h2>Podsumowanie:</h2>
        <div class="configuration-row">
            <label>Suma rat odsetkowych: </label>
            <span >{{ currencyFormat(schedule.interestInstallmentSum) }} </span>

        </div>

        <div class="configuration-row">
            <label>Suma rat kapitalowych: </label>
            <span>{{ currencyFormat(schedule.capitalInstallmentSum) }}</span>

        </div>

        <div class="configuration-row">
            <label>Suma rat całkowitych: </label>
            <span>{{ currencyFormat(schedule.capitalInstallmentSum + schedule.interestInstallmentSum) }}</span>

        </div>

        <div class="configuration-row" v-if="schedule.payments.length">
            <label>Suma składek ubezpieczeniowych: </label>
            <span>{{currencyFormat(schedule.insuranceTotalAmount)}}</span>

        </div>

        <div class="configuration-row">
            <label>Kwota kredytu do wypłaty: </label>
            <span>{{currencyFormat(schedule.loanPaidOutAmount)}}</span>

        </div>

        <div class="configuration-row">
            <label>Kwota prowizji: </label>
            <span>{{currencyFormat(schedule.commissionAmount)}}</span>

        </div>

        <div class="configuration-row">
            <label>Łączne koszty kredytu: </label>
            <span>{{currencyFormat(schedule.loanTotalCost)}}</span>

        </div>

        <div class="configuration-row">
            <label>RSSO: </label>
            <span> {{(schedule.aprc*100).toFixed(2).toString().replace(/\./g, ',')}}%</span>

        </div>
    </div>
    <div class="schedule-payments-container" v-if="schedule.payments.length > 0">
    <table class="scheduleTable">
        <thead>
            <tr>
                <th>Rata</th>
                <th>Data raty</th>
                <th>Rata odsetkowa</th>
                <th>Rata kapitałowa</th>
                <th>Rata całkowita</th>
                <th>Kapitał po spłacie</th>
                <th v-if="schedule.insuranceTotalAmount > 0">Składka ubezpieczeniowa</th>
            </tr>
        </thead>
        <tr :key="payment.index" v-for="payment in schedule.payments">
          <td> {{ payment.index }}</td>
          <td> {{ formatDate(payment.date)}}</td>
          <td> {{ currencyFormat(payment.interestInstallment) }}</td>
          <td> {{ currencyFormat(payment.capitalInstallment) }} </td>
          <td> {{ currencyFormat(payment.capitalInstallment + payment.interestInstallment) }}</td>
          <td> {{ currencyFormat(payment.remainingDebt) }}</td>
          <td v-if="schedule.insuranceTotalAmount > 0"> {{ currencyFormat(payment.insurancePremium) }}</td>
        </tr>
        
    </table>
    <div class="buttons-container" v-show="showExportButtons">
        <button @click="exportJSON">Eksportuj do pliku JSON</button>
        <button @click="downloadPDF">Pobierz PDF</button>
    </div>
</div>

</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
   props: {
       schedule: Object,
       showExportButtons: Boolean
   },
    methods: {
        formatDate(date){
            if (date) {
                return moment(String(date)).format('DD.MM.YYYY')
            }
        },
        currencyFormat(num) {
            if(num != undefined) return Number(num).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2} )+' zł'
        },
        exportJSON() {
            const data = JSON.stringify(this.schedule.scheduleConfiguration)
            const blob = new Blob([data], {type: 'text/plain'})
            const e = document.createEvent('MouseEvents'),
            a = document.createElement('a');
            a.download = "harmonogram.json";
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false, window)
            a.dispatchEvent(e);
        },
        async downloadPDF() {
                
        await axios.post(`http://localhost:4200/api/v1/schedule/pdf`, JSON.stringify(this.schedule), 
            { 
            headers:{"Content-type" : "application/json"},
            responseType: 'blob'})
            .then((response) => {
              const blob = new Blob([response.data], {type: 'application/pdf'})
              const e = document.createEvent('MouseEvents'),
                a = document.createElement('a')
                a.download = "harmonogram.pdf"
                a.href = window.URL.createObjectURL(blob)
                a.dataset.downloadurl = ['application/pdf', a.download, a.href].join(':')
                e.initEvent('click', true, false, window)
                a.dispatchEvent(e);
          })
        },

    }
}
    


</script>


<style lang="scss" scoped>

    .scheduleTable {
        border-collapse: collapse;
        width: 100%;
        margin: auto;
        font-size: larger;
        text-align: right;
        border: 2px solid #16a085;
        thead {
            color: white;
        }

        td, th {
            border: 2px solid #16a085;
        }
        th {
            background-color: #16a085;
        }
        tr:nth-of-type(odd) {
            background-color: #cdefea;
        }
    }
    .configuration-row {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-bottom: 7px;
    }
    
    .configuration-row label {
        margin-right: 15px;
        font-size: 23px;
        align-self: center;
    }

    .configuration-row span {
        font-size:17px;
        padding: 10px;
        justify-self: flex-end;
        align-self: center;
    }
    .schedule-summary-container {
        width: 55%;
        margin: auto;
    }
    .schedule-payments-container {
        margin-top: 40px;
        
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
        .buttons-container {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        }
    }

</style>
