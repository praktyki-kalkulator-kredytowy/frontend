<template>
    <div v-if="installments.installmentList.length > 0">
    <table class="scheduleTable">
        <tr>
          <th>Rata</th>
          <th>Data raty</th>
          <th>Rata odsetkowa</th>
          <th>Rata kapitałowa</th>
          <th>Rata całkowita</th>
          <th>Kapitał po spłacie</th>
          <th v-if="installments.insurancePremiumList.length">Składka ubezpieczeniowa</th>
          
        </tr>

        <tr :key="installment.index" v-for="installment in fullInstallmentList">
          <td> {{ installment.index }}</td>
          <td> {{ formatDate(installment.installmentDate)}}</td>
          <td> {{ currencyFormat(installment.interestInstallment) }}</td>
          <td> {{ currencyFormat(installment.capitalInstallment) }} </td>
          <td> {{ currencyFormat(installment.capitalInstallment + installment.interestInstallment) }}</td>
          <td> {{ currencyFormat(installment.remainingDebt) }}</td>
          <td v-if="installments.insurancePremiumList.length"> {{ currencyFormat(installment.insurancePremiumValue) }}</td>
        </tr>

        <tr class="installment-summary">
          <td></td>
          <td></td>
          <td> {{ currencyFormat(calculateSum(i => i.interestInstallment)) }} </td>
          <td> {{ currencyFormat(calculateSum(i => i.capitalInstallment)) }} </td>
          <td> {{ currencyFormat(calculateSum(i => i.capitalInstallment + i.interestInstallment)) }} </td>
          <td></td>
          <td v-if="installments.insurancePremiumList.length">{{currencyFormat(installments.insuranceTotalAmount)}}</td>
        </tr>
    
    
        
        <tr>
            <th colspan="2">Kwota kredytu do wypłaty</th>
            <th colspan="1">Kwota prowizji</th>
            <th colspan="2">Łączne koszty kredytu</th>
            <th>RSSO: </th>
        </tr>
        
        <tr>
            <td colspan="2">{{currencyFormat(installments.loanPaidOutAmount)}}</td>
            <td colspan="1">{{currencyFormat(installments.commissionAmount)}}</td>
            <td colspan="2">{{currencyFormat(installments.loanTotalCost)}}</td>
            <td>{{(installments.aprc*100).toFixed(2)}}%</td>
        </tr>
        
        
    </table>
    
    <button @click="exportJSON">Eksportuj do pliku JSON</button>
    
    <button @click="downloadPDF">Pobierz PDF</button>
    
    </div>
</template>

<script>
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
        downloadPDF() {
            console.log('XDDDDDDDDDDDDd')
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


    .scheduleTable tr:last-of-type {
        background-color: #0097A7;
        font-weight: bold;
        height:50px;
    }

    .installment-summary {
        font-weight: bold;
    }
    

</style>
