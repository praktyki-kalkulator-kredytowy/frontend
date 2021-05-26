<template>
<div class="search-wrapper">
    <input type="text"
           placeholder="Wyszukaj..."
           v-model="search">
</div>

<div class="audit-list-wrapper">
    
  <table>
      <thead>
          <tr>
              <th>ID</th>
              <th>Kapitał</th>
              <th>Rodzaj rat</th>
              <th>Liczba rat</th>
              <th>Oprocentowanie</th>
              <th>Data wypłaty</th>
              <th>Prowizja</th>
              <th>Ubezpieczenie</th>
              <th>Wiek</th>
              <th>Suma rat odsetkowych</th>
              <th>Kwota kredytu do wypłaty</th>
              <th>Kwota prowizji</th>
              <th>RRSO</th>
              <th>Data wyliczenia</th>
          </tr>
      </thead>
      <tbody>
                <tr class="audit-item" @click="changedir(`/audit/details/${row.id}`)" v-for="row in filteredRows" :key="row.id">
                    <td v-html="highlightMatches(row.id)"></td>
                    <td v-html="highlightMatches(row.capital)"></td>
                    <td v-html="highlightMatches(row.installmentType == 'CONSTANT' ? 'Równe' : 'Malejące')"></td>
                    <td v-html="highlightMatches(row.installmentAmount)"></td>
                    <td v-html="highlightMatches(row.interestRate*100+'%')"></td>
                    <td v-html="highlightMatches(formatDate(row.withdrawalDate))"></td>
                    <td v-html="highlightMatches(row.commissionRate*100+'%')"></td>
                    <td v-html="highlightMatches(row.insurance ? 'Tak' : 'Nie')"></td>
                    <td v-html="highlightMatches(row.age)"></td>
                    <td v-html="highlightMatches(row.capitalInstallmentSum)"></td>
                    <td v-html="highlightMatches(row.loanPaidOutAmount)"></td>
                    <td v-html="highlightMatches(row.commissionAmount)"></td>
                    <td v-html="highlightMatches(row.aprc+'%')"></td>
                    <td v-html="highlightMatches(formatDate(row.calculationDate))"></td>
                </tr>
      </tbody>
  </table>
  
  </div>
  <button class="nav-button" @click="$router.push('/')">Powróć</button>
</template>

<script>
import moment from 'moment'


export default {
    name: 'AuditList',
    data() {
        return {
            search: '',
            auditData: [
                {
                    id: 1,
                    capital: 0,
                    installmentType: "DECREASING",
                    installmentAmount: 360,
                    interestRate: 1,
                    withdrawalDate: "2021-05-26",
                    commissionRate: 1,
                    age: 150,
                    insurance: true,
                    capitalInstallmentSum: 0,
                    loanPaidOutAmount: 0,
                    commissionAmount: 0,
                    insuranceTotalAmount: 0,
                    loanTotalCost: 0,
                    aprc: 0,
                    calculationDate: "2021-05-26"
                }
            ]
            
            

            
        }
    },
    computed: {
        filteredRows() {
            return this.auditData.filter(row => {
                const id = row.id.toString()
                const capital = row.capital.toString()
                const installmentType = row.installmentType == 'CONSTANT' ? 'równe' : 'malejące'
                const installmentAmount = row.installmentAmount.toString()
                const interestRate = (row.interestRate*100).toString()+'%'
                const withdrawalDate = moment(String(row.withdrawalDate)).format('DD.MM.YYYY')
                const commissionRate = (row.commissionRate*100).toString()+'%'
                const insurance = row.insurance ? 'tak' : 'nie'
                const age = row.age.toString()
                const capitalInstallmentSum = row.capitalInstallmentSum.toString()
                const loanPaidOutAmount = row.loanPaidOutAmount.toString()
                const insuranceTotalAmount = row.insuranceTotalAmount.toString()
                const loanTotalCost = row.loanTotalCost.toString()
                const aprc = (row.aprc*100).toString()+'%'
                const calculationDate = moment(String(row.calculationDate)).format('DD.MM.YYYY')

                const searchTerm = this.search.toLowerCase()

                return  parseInt(id.includes(searchTerm)) ||
                        capital.includes(searchTerm) ||
                        installmentType.includes(searchTerm) ||
                        installmentAmount.includes(searchTerm) ||
                        interestRate.includes(searchTerm) ||
                        withdrawalDate.includes(searchTerm) ||
                        commissionRate.includes(searchTerm) ||
                        insurance.includes(searchTerm) ||
                        age.includes(searchTerm) ||
                        capitalInstallmentSum.includes(searchTerm) ||
                        loanPaidOutAmount.includes(searchTerm) ||
                        insuranceTotalAmount.includes(searchTerm) ||
                        loanTotalCost.includes(searchTerm) ||
                        aprc.includes(searchTerm) ||
                        calculationDate.includes(searchTerm)
            })
        }
    },
    methods: {
        highlightMatches(data) {
            const text = data.toString()
            const matchExists = text.toLowerCase().includes(this.search.toLowerCase())
            if (!matchExists) return text

            const re = new RegExp(this.search, 'ig')
            return text.replace(re, matchedText => `<strong>${matchedText}</strong>`)
        },
        changedir(path) {
            this.$router.push(path)
        },
        formatDate(date){
            if (date) {
                return moment(String(date)).format('DD.MM.YYYY')
            }
        }
    }
    
}
</script>

<style scoped>

.search-wrapper {
    margin: 30px;
}
.audit-list-wrapper {
    margin: 30px;
}
table {
    border-collapse: collapse;
    border: 1px solid lightgray;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px, 8px rgba(0, 0, 0, 0.2)
}
.audit-item {
    transition: all .2s ease-in;
    cursor: pointer;
}
.audit-item:hover {
    background-color: #f5f5f5;
    transform: scale(1.02);
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px, 8px rgba(0, 0, 0, 0.2)
}
th,td{
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
td {
    white-space: nowrap;
}
thead{
    background-color: #16a085;
    color: #fff;
}
input {
  border-radius: 10px;
  border: 2px solid lightgray;
  padding: 10px;
  margin: 10px;
  outline: none;
}

</style>
