<template>
<h1>test {{ $route.params.index }} </h1>
<router-view></router-view>
<button class="nav-button" @click="$router.push('/audit')">Powróć</button>
</template>

<script>


export default {
  name: 'AuditDetails',
  data() {
      return {
          Schedule: {
                scheduleConfiguration: {
                    capital: 10000,
                    installmentType: "CONSTANT",
                    installmentAmount: 12,
                    interestRate: 0.1,
                    withdrawalDate: '2015-05-15',
                    commissionRate: 0.1,
                    insurance: true,
                    age: 25
                },
                payments: [
                    {
                        index: 1,
                        date: '2015-05-15',
                        capitalInstallment: 1,
                        interestInstallment: 2,
                        remainingDebt: 3,
                        insurancePremium: 4
                    },
                    {
                        index: 2,
                        date: '2015-06-15',
                        capitalInstallment: 4,
                        interestInstallment: 3,
                        remainingDebt: 2,
                        insurancePremium: 1
                    },
                    {
                        index: 3,
                        date: '2015-07-15',
                        capitalInstallment: 1,
                        interestInstallment: 2,
                        remainingDebt: 3,
                        insurancePremium: 4
                    },
                    {
                        index: 4,
                        date: '2015-08-15',
                        capitalInstallment: 4,
                        interestInstallment: 3,
                        remainingDebt: 2,
                        insurancePremium: 1
                    },
                ],
                capitalInstallmentSum: 10000,
                loanPaidOutAmount: 20000,
                commissionAmount: 30000,
                insuranceTotalAmount: 40000,
                loanTotalCost: 50000,
                aprc: 60
            },
            
      }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
