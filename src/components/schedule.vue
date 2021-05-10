<template>
    <table v-if="installments != undefined && installments.length > 0" class="scheduleTable">
        <tr>
          <th>Rata</th>
          <th>Data raty</th>
          <th>Rata odsetkowa</th>
          <th>Rata kapitałowa</th>
          <th>Rata całkowita</th>
          <th>Kapitał po spłacie</th>
          <th>Składka ubezpieczeniowa</th>
          
        </tr>
        <tr :key="installment.index" v-for="installment in installments">
          <td> {{ installment.index }}</td>
          <td> {{ formatDate(installment.installmentDate)}}</td>
          <td> {{ PLNformat(installment.interestInstallment) }}</td>
          <td> {{ PLNformat(installment.capitalInstallment) }} </td>
          <td> {{ PLNformat(installment.capitalInstallment + installment.interestInstallment) }}</td>
          <td> {{ PLNformat(installment.remainingDebt) }}</td>
          <td> placeholder </td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td> {{ PLNformat(calculateSum(i => i.interestInstallment)) }} </td>
          <td> {{ PLNformat(calculateSum(i => i.capitalInstallment)) }} </td>
          <td> {{ PLNformat(calculateSum(i => i.capitalInstallment + i.interestInstallment)) }} </td>
          <td></td>
          <td> sumPlaceholder </td>
        </tr>
    </table>

</template>

<script>
import moment from 'moment'
export default {
    props: {
        installments: []
    },

    methods: {
        calculateSum(elementExtractor) {
            let sum = 0;
            for(const i of this.installments) {
                sum += elementExtractor(i);
            }
            return sum;
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
    }

    

</style>
