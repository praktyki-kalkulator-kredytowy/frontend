<template>
    <div class="installment-summary" v-if="installments.installmentList.length > 0">
        <h2>Podsumowanie:</h2>
        <div class="configuration-row">
            <label>Suma rat odsetkowych: </label>
            <span >{{ currencyFormat(calculateSum(i => i.interestInstallment)) }} </span>

        </div>

        <div class="configuration-row">
            <label>Suma rat kapitalowych: </label>
            <span>{{ currencyFormat(calculateSum(i => i.capitalInstallment)) }}</span>

        </div>

        <div class="configuration-row">
            <label>Suma rat całkowitych: </label>
            <span>{{ currencyFormat(calculateSum(i => i.capitalInstallment + i.interestInstallment)) }}</span>

        </div>

        <div class="configuration-row" v-if="installments.insurancePremiumList.length">
            <label>Suma składek ubezpieczeniowych: </label>
            <span>{{currencyFormat(installments.insuranceTotalAmount)}}</span>

        </div>

        <div class="configuration-row">
            <label>Kwota kredytu do wypłaty: </label>
            <span>{{currencyFormat(installments.loanPaidOutAmount)}}</span>

        </div>

        <div class="configuration-row">
            <label>Kwota prowizji: </label>
            <span>{{currencyFormat(installments.commissionAmount)}}</span>

        </div>

        <div class="configuration-row">
            <label>Łączne koszty kredytu: </label>
            <span>{{currencyFormat(installments.loanTotalCost)}}</span>

        </div>

        <div class="configuration-row">
            <label>RSSO: </label>
            <span> {{(installments.aprc*100).toFixed(2)}}%</span>

        </div>
    </div>
    <div v-if="installments.installmentList.length > 0">
    <table class="scheduleTable">
        <tr>
          <th>Rata</th>
          <th>Data raty</th>
          <th>Rata odsetkowa</th>
          <th>Rata kapitałowa</th>
          <th>Rata całkowita</th>
          <th>Kapitał po spłacie</th>
          <th v-if="installments.insurancePremiumList.length && installments.insuranceTotalAmount > 0">Składka ubezpieczeniowa</th>
          
        </tr>

        <tr :key="installment.index" v-for="installment in fullInstallmentList">
          <td> {{ installment.index }}</td>
          <td> {{ formatDate(installment.installmentDate)}}</td>
          <td> {{ currencyFormat(installment.interestInstallment) }}</td>
          <td> {{ currencyFormat(installment.capitalInstallment) }} </td>
          <td> {{ currencyFormat(installment.capitalInstallment + installment.interestInstallment) }}</td>
          <td> {{ currencyFormat(installment.remainingDebt) }}</td>
          <td v-if="installments.insurancePremiumList.length && installments.insuranceTotalAmount > 0"> {{ currencyFormat(installment.insurancePremiumValue) }}</td>
        </tr>
        
    </table>
    
    <button @click="exportJSON">Eksportuj do pliku JSON</button>
    
    <button @click="downloadPDF">Pobierz PDF</button>
    
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
   props: {
       installments: Object
   },
   computed: {
       fullInstallmentList() {
           let arr1 = this.installments.installmentList
           let arr2 = this.installments.insurancePremiumList

           let merged = []

           for(let i=0; i<arr1.length; i++) {
               merged.push({
                   ...(arr2.find((itmInner) => itmInner.insurancePremiumDate === arr1[i].installmentDate)),
                   ...arr1[i]
               })
           }
           return merged
       }
   },
    methods: {
        calculateSum(elementExtractor) {
            let sum = 0;
            for(const i of this.installments.installmentList) {
                sum += elementExtractor(i);
            }
        
            return sum
        },
        formatDate(date){
            if (date) {
                return moment(String(date)).format('DD.MM.YYYY')
            }
        },
        currencyFormat(num) {
            if(num != undefined) return Number(num).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2} )+' zł'
        },
        exportJSON() {
            const data = JSON.stringify(this.installments.scheduleConfiguration)
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
                
        await axios.post(`http://localhost:4200/api/v1/schedule/pdf`, JSON.stringify(this.installments.scheduleConfiguration), 
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


<style scoped>

    .scheduleTable {
        border-collapse: collapse;
        width: 100%;
        margin: auto;
        font-size: larger;
        text-align: right;
    }

    .scheduleTable, .scheduleTable td, th {
        border: 2px solid #0097A7;
    }

    .scheduleTable th {
        background-color: #0097A7;
    }

    .scheduleTable tr:nth-of-type(2n+1) {
        background-color: #B2EBF2;
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
    .installment-summary {
        width: 47.5%;
        margin: auto;
    }

</style>
