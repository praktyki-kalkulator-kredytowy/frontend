<template>
    <table v-if="installments != undefined && installments.length > 0" class="scheduleTable">
        <tr>
          <th>Rata</th>
          <th>Data raty</th>
          <th>Rata odsetkowa</th>
          <th>Rata kapitałowa</th>
          <th>Rata całkowita</th>
          <th>Kapitał po spłacie</th>
        </tr>
        <tr :key="installment.index" v-for="installment in installments">
          <td> {{ installment.index }} </td>
          <td> {{ installment.installmentDate }} </td>
          <td> {{ installment.interestInstallment}} </td>
          <td> {{ installment.capitalInstallment }} </td>
          <td> {{ (installment.capitalInstallment + installment.interestInstallment).toFixed(2) }} </td>
          <td> {{ installment.remainingDebt }} </td>
        </tr>

        <tr>
          <td> {{ installments.length }} </td>
          <td> - </td>
          <td> {{ calculateSum(i => i.interestInstallment) }} </td>
          <td> {{ calculateSum(i => i.capitalInstallment) }} </td>
          <td> {{ calculateSum(i => i.capitalInstallment + i.interestInstallment) }} </td>
          <td> - </td>
        </tr>
    </table>

</template>

<script>

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
        
            return sum.toFixed(2);
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
