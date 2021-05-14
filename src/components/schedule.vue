<template>


    <table v-if="installments.installmentList.length > 0" class="scheduleTable">
        <tr>
          <th>Rata</th>
          <th>Data raty</th>
          <th>Rata odsetkowa</th>
          <th>Rata kapitałowa</th>
          <th>Rata całkowita</th>
          <th>Kapitał po spłacie</th>
          
        </tr>

        <tr :key="installment.index" v-for="installment in installments.installmentList">
          <td> {{ installment.index }}</td>
          <td> {{ formatDate(installment.installmentDate)}}</td>
          <td> {{ PLNformat(installment.interestInstallment) }}</td>
          <td> {{ PLNformat(installment.capitalInstallment) }} </td>
          <td> {{ PLNformat(installment.capitalInstallment + installment.interestInstallment) }}</td>
          <td> {{ PLNformat(installment.remainingDebt) }}</td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td> {{ PLNformat(calculateSum(i => i.interestInstallment)) }} </td>
          <td> {{ PLNformat(calculateSum(i => i.capitalInstallment)) }} </td>
          <td> {{ PLNformat(calculateSum(i => i.capitalInstallment + i.interestInstallment)) }} </td>
          <td></td>
        </tr>
    
    
        <tr>
            <th colspan="3">Data zapłaty składki</th>
            <th colspan="3">Kwota składki ubezpieczeniowej</th>
        </tr>
        <tr :key="premium.index" v-for="premium in installments.insurancePremiumList">
            <td colspan="3">{{formatDate(premium.insurancePremiumDate)}}</td>
            <td colspan="3">{{PLNformat(premium.insurancePremiumValue)}}</td>
        </tr>
        <tr>
            <th colspan="2">Kwota kredytu do wypłaty</th>
            <th colspan="1">Kwota prowizji</th>
            <th colspan="1">Łączna kwota składek ubezpieczeniowych</th>
            <th colspan="2">Łączne koszty kredytu</th>
        </tr>
        
        <tr>
            <td colspan="2">{{PLNformat(installments.loanPaidOutAmount)}}</td>
            <td colspan="1">{{PLNformat(installments.commissionAmount)}}</td>
            <td colspan="1">{{PLNformat(installments.insuranceTotalAmount)}}</td>
            <td colspan="2">{{PLNformat(installments.loanTotalCost)}}</td>
        </tr>
        <tr>
            <td colspan="6">RRSO: {{(installments.aprc*100).toFixed(2)}}%</td></tr>
        
    </table>
    
</template>

<script>
import moment from 'moment'
export default {
   props: {
       installments: Object
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
        PLNformat(num) {
            return Number(num).toLocaleString('pl-PL', { style: 'currency', currency: 'PLN'} )
        }

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

    

</style>
