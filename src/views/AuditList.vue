<template>

  <h3 v-show="loading">Trwa ładowanie...</h3>
  <Popup v-if="error" @close="error = false">
    <template v-slot:header>
      <h3>Wystąpił błąd</h3>
    </template>
    <template v-slot:body>
      Proszę skontaktuj się z administratorem aplikacji.
    </template>
    <template v-slot:footer>
      Przepraszamy za nieudogodnienia.
    </template>
  </Popup>

    <input type="text"
           placeholder="Wyszukaj..."
           v-model="search"
           class="search-input">
    <div class="show-filter-container">
        <button class="nav-button" @click="showFilters = !showFilters">Opcje filtrowania</button>
    </div>
    <div class="filter-options" v-show="showFilters">
        <div class="filter-item">
            <h3>Przedział wyliczenia kredytu</h3>
            <v-date-picker  v-model="calculationDateRange" 
                                locale="pl-PL"
                                color="teal" 
                                :update-on-input="false"
                                mode="date"
                                is-range>
                <template v-slot="{ inputValue, inputEvents }">
                    <div>
                    <input
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                    />
                    <input
                        :value="inputValue.end"
                        v-on="inputEvents.end"
                    />
                    </div>
                </template>
            </v-date-picker>
        </div>

        
        <div class="filter-item">
            <h3>Przedział wypłaty kredytu</h3>
            <v-date-picker  v-model="withdrawalDateRange" 
                                locale="pl-PL"
                                color="teal" 
                                :update-on-input="false"
                                mode="date"
                                is-range>
                <template v-slot="{ inputValue, inputEvents }">
                    <div>
                    <input
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                    />
                    <input
                        :value="inputValue.end"
                        v-on="inputEvents.end"
                    />
                    </div>
                </template>
            </v-date-picker>
        </div>

        
        <div class="filter-item">
            <h3>przedzial kwoty kredytu</h3>
            <input type="number" v-model="capitalRange.start">
            <input type="number" v-model="capitalRange.end">
        </div>

        
        <div class="filter-item">
            <h3>Przedział liczby rat</h3>
            <input type="number" v-model="installmentAmountRange.start">
            <input type="number" v-model="installmentAmountRange.end">
        </div>

        
        <div class="filter-item">
            <h3>Przedział oprocentowania</h3>
            <input type="number" v-model="interestRateRange.start">
            <input type="number" v-model="interestRateRange.end">
        </div>

       
        <div class="filter-item">
             <h3>Przedział sumy ubezpieczenia</h3>
            <input type="number" v-model="insuranceSumRange.start">
            <input type="number" v-model="insuranceSumRange.end">
        </div>

        
        <div class="filter-item">
            <h3>Przedział prowizji</h3>
            <input type="number" v-model="commissionRateRange.start">
            <input type="number" v-model="commissionRateRange.end">
        </div>

       
        <div class="filter-item">
            <h3>ubezpieczenie</h3>
            <input type="checkbox" v-model="checkInsurance">
        </div>

        
        <div class="filter-item" v-show="checkInsurance">
            <h3>Przedzial wieku klienta</h3>
            <input type="number" v-model="ageRange.start">
            <input type="number" v-model="ageRange.end">
        </div>

        
        <div class="filter-item">
            <h3>Przedział rrso</h3>
            <input type="number" v-model="aprcRange.start">
            <input type="number" v-model="aprcRange.end">
        </div>

        <div class="button-container">
        <button class="nav-button" v-show="!isFiltered" @click="addFilters">Dodaj filter</button>
        <button class="nav-button red" v-show="isFiltered" @click="removeFilters">Usuń filtry</button>
        </div>
    </div>
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
              <th @click="sortTable('interestInstallmentSum')">Suma rat odsetkowych
                  <div v-if="sortColumn == 'interestInstallmentSum'">{{ ascending ? '▲' : '▼' }}</div>
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
                <tr class="audit-item" @click="changedir(`/audit/details/${row.id}`)" v-for="row in searchedRows" :key="row.id">
                    <td>{{ row.id }}</td>
                    <td>{{ currencyFormat(row.capital) }}</td>
                    <td>{{ row.installmentType == 'CONSTANT' ? 'Równe' : 'Malejące' }}</td>
                    <td>{{ row.installmentAmount }}</td>
                    <td>{{ (row.interestRate*100).toFixed(2)+'%' }}</td>
                    <td>{{ formatDate(row.withdrawalDate) }}</td>
                    <td>{{ (row.commissionRate*100).toFixed(2)+'%' }}</td>
                    <td>{{ row.insurance ? 'Tak' : 'Nie' }}</td>
                    <td>{{ row.age }}</td>
                    <td>{{ currencyFormat(row.interestInstallmentSum) }}</td>
                    <td>{{ currencyFormat(row.loanPaidOutAmount) }}</td>
                    <td>{{ currencyFormat(row.commissionAmount) }}</td>
                    <td>{{ (row.aprc*100).toFixed(2)+'%' }}</td>
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
import Popup from '../components/Popup'

export default {
    name: 'AuditList',
    components: {
      Popup
    },
    data() {
        return {
            error: false,
            loading: false,
            search: '',
            ascending: false,
            sortColumn: '',
            auditData: [],
            showFilters: false,
            calculationDateRange: {
                start: new Date(),
                end: new Date()
            },
            withdrawalDateRange: {
                start: new Date(),
                end: new Date()
            },
            capitalRange: {
                start: 0,
                end: 100000000
            },
            installmentAmountRange: {
                start: 0,
                end: 360
            },
            interestRateRange: {
                start: 0,
                end: 100
            },
            insuranceSumRange: {
                start: 0,
                end: 100
            },
            commissionRateRange: {
                start: 0,
                end: 100
            },
            ageRange: {
                start: 0,
                end: 100
            },
            aprcRange: {
                start: 0,
                end: 100
            },
            checkInsurance: false,
            isFiltered: false,
            filteredAuditData: []
        }
    },
    computed: {
        searchedRows() {
            return this.auditData.filter(row => {
                const id = row.id.toString()
                const capital = row.capital.toString()
                const installmentType = row.installmentType == 'CONSTANT' ? 'równe' : 'malejące'
                const installmentAmount = row.installmentAmount.toString()
                const interestRate = (row.interestRate*100).toString()+'%'
                const withdrawalDate = moment(String(row.withdrawalDate)).format('DD.MM.YYYY')
                const commissionRate = (row.commissionRate*100).toString()+'%'
                const insurance = row.insurance ? 'tak' : 'nie'
                const age = row.age
                const interestInstallmentSum = row.interestInstallmentSum.toString()
                const loanPaidOutAmount = row.loanPaidOutAmount.toString()
                const insuranceTotalAmount = row.insuranceTotalAmount.toString()
                const loanTotalCost = row.loanTotalCost.toString()
                const aprc = (row.aprc*100).toString()+'%'
                const calculationDate = moment(String(row.calculationDate)).format('DD.MM.YYYY')

                const searchTerm = this.search.toLowerCase().replace(/,/g, '.')

                return  (parseInt(id.includes(searchTerm)) ||
                        capital.includes(searchTerm) ||
                        installmentType.includes(searchTerm) ||
                        installmentAmount.includes(searchTerm) ||
                        interestRate.includes(searchTerm) ||
                        withdrawalDate.includes(searchTerm) ||
                        commissionRate.includes(searchTerm) ||
                        insurance.includes(searchTerm) ||
                        age.includes(searchTerm) ||
                        interestInstallmentSum.includes(searchTerm) ||
                        loanPaidOutAmount.includes(searchTerm) ||
                        insuranceTotalAmount.includes(searchTerm) ||
                        loanTotalCost.includes(searchTerm) ||
                        aprc.includes(searchTerm) ||
                        calculationDate.includes(searchTerm)) 
                       
            })
        },
    },
    methods: {
        addFilters() {
            this.isFiltered = true
            this.getAuditData()
        },
        removeFilters() {
            this.isFiltered = false
            this.showFilters = false
            this.getAuditData()
        },
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
        async getAuditData() {
            let params = {}
            console.log(this.calculationDateRange.start)
            if (this.isFiltered) {
                params = {
                    calculationStartDate: this.calculationDateRange.start.toISOString().slice(0, 10),
                    calculationEndDate: this.calculationDateRange.end.toISOString().slice(0, 10),
                    withdrawalStartDate: this.withdrawalDateRange.start.toISOString().slice(0, 10),
                    withdrawalEndDate: this.withdrawalDateRange.end.toISOString().slice(0, 10),
                    capitalStart: this.capitalRange.start,
                    capitalEnd: this.capitalRange.end,
                    installmentAmountStart: this.installmentAmountRange.start,
                    installmentAmountEnd: this.installmentAmountRange.end,
                    interestRateStart: this.interestRateRange.start/100,
                    interestRateEnd: this.interestRateRange.end/100,
                    insuranceSumStart: this.insuranceSumRange.start,
                    insuranceSumEnd: this.insuranceSumRange.end,
                    clientAgeStart: this.checkInsurance ? this.ageRange.start : null,
                    clientAgeEnd: this.checkInsurance ? this.ageRange.end : null,
                    aprcStart: this.aprcRange.start/100,
                    aprcEnd: this.aprcRange.end/100
                    }
            }

            try {
              this.loading = true;
              let response = await axios.get(`http://localhost:4200/api/v1/audit`, { params: params });
              this.auditData = response.data;
            } catch(e) {
              this.error = true;
            }
            this.loading = false;

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
        cursor: pointer;
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
.filter-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 240px 40px 240px;
    padding-top: 40px;
    border: 1px solid lightgray;
    border-radius: 20px;

    .filter-item {
        display: inline-block;
        
        input{
            margin: 15px;
            padding: 10px;
            border: 1px solid lightgray;
            border-radius: 5px;           
        } 
    }
}
.search-input {
  border-radius: 10px;
  border: 2px solid lightgray;
  padding: 10px;
  margin: 20px;
  outline: none;
}
.nav-button {
    margin-bottom: 50px;
}

.button-container {
    padding: 40px;
}
.red {
     background-color: red;
}
.red:hover {
    color: red;
    border-color: currentColor;
    background-color: white;
}


</style>
