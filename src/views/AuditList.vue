<template>

    <input type="text"
           placeholder="Wyszukaj..."
           v-model="search"
           class="search-input">


<div class="audit-list">
    
  <table>
      <thead>
          <tr>
              <th @click="sortTable('id')">ID
                  <div v-if="sortColumn == 'id'">{{ ascending ? '▲' : '▼' }}</div></th>
              <th @click="sortTable('capital')">Kapitał
                  <div v-if="sortColumn == 'capital'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
              <th @click="sortTable('installmentType')">Rodzaj rat
                  <div v-if="sortColumn == 'installmentType'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
              <th @click="sortTable('installmentAmount')">Liczba rat
                  <div v-if="sortColumn == 'installmentAmount'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
              <th @click="sortTable('interestRate')">Oprocentowanie
                  <div v-if="sortColumn == 'interestRate'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
              <th @click="sortTable('withdrawalDate')">Data wypłaty
                  <div v-if="sortColumn == 'withdrawalDate'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
              <th @click="sortTable('commissionRate')">Prowizja
                  <div v-if="sortColumn == 'commissionRate'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
              <th @click="sortTable('insurance')">Ubezpieczenie
                  <div v-if="sortColumn == 'insurance'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
              <th @click="sortTable('age')">Wiek
                  <div v-if="sortColumn == 'age'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
              <th @click="sortTable('capitalInstallmentSum')">Suma rat odsetkowych
                  <div v-if="sortColumn == 'capitalInstallmentSum'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
              <th @click="sortTable('loanPaidOutAmount')">Kwota kredytu do wypłaty
                  <div v-if="sortColumn == 'loanPaidOutAmount'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
              <th @click="sortTable('commissionAmount')">Kwota prowizji
                  <div v-if="sortColumn == 'commissionAmount'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
              <th @click="sortTable('aprc')">RRSO
                  <div v-if="sortColumn == 'aprc'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
              <th @click="sortTable('calculationDate')">Data wyliczenia
                  <div v-if="sortColumn == 'calculationDate'">{{ ascending ? '▲' : '▼' }}</div>
              </th>
          </tr>
      </thead>
      <tbody>
                <tr class="audit-item" @click="changedir(`/audit/details/${row.id}`)" v-for="row in filteredRows" :key="row.id">
                    <td>{{ row.id }}</td>
                    <td>{{ currencyFormat(row.capital) }}</td>
                    <td>{{ row.installmentType == 'CONSTANT' ? 'Równe' : 'Malejące' }}</td>
                    <td>{{ row.installmentAmount }}</td>
                    <td>{{ row.interestRate*100+'%' }}</td>
                    <td>{{ formatDate(row.withdrawalDate) }}</td>
                    <td>{{ row.commissionRate*100+'%' }}</td>
                    <td>{{ row.insurance ? 'Tak' : 'Nie' }}</td>
                    <td>{{ row.age }}</td>
                    <td>{{ currencyFormat(row.capitalInstallmentSum) }}</td>
                    <td>{{ currencyFormat(row.loanPaidOutAmount) }}</td>
                    <td>{{ currencyFormat(row.commissionAmount) }}</td>
                    <td>{{ row.aprc+'%' }}</td>
                    <td>{{ formatDate(row.calculationDate) }}</td>
                </tr>
      </tbody>
  </table>
  
  </div>
  <button class="nav-button" @click="$router.push('/')">Powróć</button>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
    name: 'AuditList',
    data() {
        return {
            search: '',
            ascending: false,
            sortColumn: '',
            auditData: [
                {
                    id: 1,
                    capital: 10000,
                    installmentType: "DECREASING",
                    installmentAmount: 360,
                    interestRate: 1,
                    withdrawalDate: "2021-05-27",
                    commissionRate: 1,
                    age: 150,
                    insurance: true,
                    capitalInstallmentSum: 10000,
                    loanPaidOutAmount: 10000,
                    commissionAmount: 100000,
                    insuranceTotalAmount: 10000,
                    loanTotalCost: 10000,
                    aprc: 0,
                    calculationDate: "2021-05-27"
                },
                {
                    id: 2,
                    capital: 20000.12,
                    installmentType: "DECREASING",
                    installmentAmount: 360,
                    interestRate: 1,
                    withdrawalDate: "2021-06-26",
                    commissionRate: 1,
                    age: 150,
                    insurance: true,
                    capitalInstallmentSum: 10000,
                    loanPaidOutAmount: 10000,
                    commissionAmount: 100000,
                    insuranceTotalAmount: 10000,
                    loanTotalCost: 10000,
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

                const searchTerm = this.search.toLowerCase().replace(/,/g, '.')

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
        },
        
    },
    methods: {
        changedir(path) {
            this.$router.push(path)
        },
        formatDate(date){
            if (date) {
                return moment(String(date)).format('DD.MM.YYYY')
            }
        },
        currencyFormat(num) {
            if(num != undefined) return Number(num).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2} )
        },
        getAuditData() {
            axios.get(`http://localhost:4200/api/v1/audit`)
            .then(response => {
                this.auditData = response.data
            })
        },
        sortTable(col) {
        if (this.sortColumn === col) {
            this.ascending = !this.ascending;
        } else {
            this.ascending = true;
            this.sortColumn = col;
        }

        var ascending = this.ascending;

        this.auditData.sort(function(a, b) {
            if (a[col] > b[col]) {
            return ascending ? 1 : -1
            } else if (a[col] < b[col]) {
            return ascending ? -1 : 1
            }
            return 0;
      })
    }
    },
    mounted() {
        this.getAuditData()
    }
}
</script>

<style lang="scss" scoped>

.audit-list {
    margin: 30px;

    table {
        border-collapse: collapse;
        border: 1px solid lightgray;
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px, 8px rgba(0, 0, 0, 0.2)
    }
    th,td{
        padding: 12px;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }
    td {
        white-space: nowrap;
        font-size: smaller;
        font-weight: 600;
    }
    th {
        height: 60px;
    }
    table th:hover {
        color: #16a085;
        border: 1px solid #16a085;
        background-color: white;
    }
    thead{
        background-color: #16a085;
        color: #fff;
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
}
.search-input {
  border-radius: 10px;
  border: 2px solid lightgray;
  padding: 10px;
  margin: 10px;
  outline: none;
}

</style>
