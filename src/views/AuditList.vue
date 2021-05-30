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

<Popup v-if="showValidationError" @close="showValidationError = false">
      <template v-slot:header>
        <h3>Wystąpiły błędy we wprowadzonych filtrach</h3>
      </template>
      <template v-slot:body>
      <p class="error-alert" v-if="v$.capitalRange.start.$error">
          Minimalny kapital: {{ v$.capitalRange.start.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.capitalRange.end.$error">
          Maksymalny kapital: {{ v$.capitalRange.end.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.installmentAmountRange.start.$error">
          Minimalna ilość rat: {{ v$.installmentAmountRange.start.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.installmentAmountRange.end.$error">
          Maksymalna ilośc rat: {{ v$.installmentAmountRange.end.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.interestRateRange.start.$error">
          Minimalne oprocentowanie: {{ v$.interestRateRange.start.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.interestRateRange.end.$error">
          Maksymalne oprocentowanie: {{ v$.interestRateRange.end.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.insuranceSumRange.start.$error">
          Minimalna suma ubezpieczenia: {{ v$.insuranceSumRange.start.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.insuranceSumRange.end.$error">
          Maksymalna suma ubezpieczenia: {{ v$.insuranceSumRange.end.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.commissionRateRange.start.$error">
          Minimalna prowizja: {{ v$.commissionRateRange.start.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.commissionRateRange.end.$error">
          Maksymalna prowizja: {{ v$.commissionRateRange.end.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.ageRange.start.$error">
          Minimalny wiek: {{ v$.ageRange.start.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.ageRange.end.$error">
          Maksymalny wiek: {{ v$.ageRange.end.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.aprcRange.start.$error">
          Minimalne RRSO: {{ v$.aprcRange.start.$errors[0].$message }}
      </p>
      <p class="error-alert" v-if="v$.aprcRange.end.$error">
          Maksymalne RRSO: {{ v$.aprcRange.end.$errors[0].$message }}
      </p>
      
      </template>
      <template v-slot:footer>
      
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
        <div class="filter-item-wrapper">
            <div class="filter-item">
                <h3>Filtruj według daty wyliczenia</h3>
                <input type="checkbox" v-model="calculationDateFilterChecked">
            </div>

            <div class="filter-item" v-show="calculationDateFilterChecked">
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
        </div>
        <div class="filter-item-wrapper">
            <div class="filter-item">
                <h3>Filtruj według daty wypłaty</h3>
                <input type="checkbox" v-model="withdrawalDateFilterChecked">
            </div>
            
            <div class="filter-item" v-show="withdrawalDateFilterChecked">
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
        </div>

        <div class="filter-item-wrapper">
            <div class="filter-item">
                <h3>Filtruj według kapitału</h3>
                <input type="checkbox" v-model="capitalFilterChecked">
            </div>
            
            <div class="filter-item" v-show="capitalFilterChecked">
                <h3>przedzial kwoty kredytu</h3>
                <input :class="{'error-border' : v$.capitalRange.start.$invalid}" type="number" v-model="capitalRange.start">
                <input :class="{'error-border' : v$.capitalRange.end.$invalid}" type="number" v-model="capitalRange.end">
            </div>
        </div>

        <div class="filter-item-wrapper">
            <div class="filter-item">
                <h3>Filtruj według liczby rat</h3>
                <input type="checkbox" v-model="installmentAmountFilterChecked">
            </div>
            
            <div class="filter-item" v-show="installmentAmountFilterChecked">
                <h3>Przedział liczby rat</h3>
                <input :class="{'error-border' : v$.installmentAmountRange.start.$invalid}" type="number" v-model="installmentAmountRange.start">
                <input :class="{'error-border' : v$.installmentAmountRange.end.$invalid}" type="number" v-model="installmentAmountRange.end">
            </div>
        </div>

        <div class="filter-item-wrapper">
            <div class="filter-item">
                <h3>Filtruj według oprocentowania</h3>
                <input type="checkbox" v-model="interestRateFilterChecked">
            </div>
            
            <div class="filter-item" v-show="interestRateFilterChecked">
                <h3>Przedział oprocentowania</h3>
                <input :class="{'error-border' : v$.interestRateRange.start.$invalid}" type="number" v-model="interestRateRange.start">
                <input :class="{'error-border' : v$.interestRateRange.end.$invalid}" type="number" v-model="interestRateRange.end">
            </div>
        </div>

        <div class="filter-item-wrapper">
            <div class="filter-item">
                <h3>Filtruj według sumy ubezpieczenia</h3>
                <input type="checkbox" v-model="insuranceSumFilterChecked">
            </div>
        
            <div class="filter-item" v-show="insuranceSumFilterChecked">
                <h3>Przedział sumy ubezpieczenia</h3>
                <input :class="{'error-border' : v$.insuranceSumRange.start.$invalid}" type="number" v-model="insuranceSumRange.start">
                <input :class="{'error-border' : v$.insuranceSumRange.end.$invalid}" type="number" v-model="insuranceSumRange.end">
            </div>
        </div>

        <div class="filter-item-wrapper">
            <div class="filter-item">
                <h3>Filtruj według prowizji</h3>
                <input type="checkbox" v-model="commissionRateFilterChecked">
            </div>
            
            <div class="filter-item" v-show="commissionRateFilterChecked">
                <h3>Przedział prowizji</h3>
                <input :class="{'error-border' : v$.commissionRateRange.start.$invalid}" type="number" v-model="commissionRateRange.start">
                <input :class="{'error-border' : v$.commissionRateRange.end.$invalid}" type="number" v-model="commissionRateRange.end">
            </div>
        </div>

        <div class="filter-item-wrapper">
            <div class="filter-item">
                <h3>Filtruj według wieku</h3>
                <input type="checkbox" v-model="ageFilterChecked">
            </div>

            
            <div class="filter-item" v-show="ageFilterChecked">
                <h3>Przedzial wieku klienta</h3>
                <input :class="{'error-border' : v$.ageRange.start.$invalid}" type="number" v-model="ageRange.start">
                <input :class="{'error-border' : v$.ageRange.end.$invalid}" type="number" v-model="ageRange.end">
            </div>
        </div>

        <div class="filter-item-wrapper">
            <div class="filter-item">
                <h3>Filtruj według RRSO</h3>
                <input type="checkbox" v-model="aprcFilterChecked">
            </div>
            
            <div class="filter-item" v-show="aprcFilterChecked">
                <h3>Przedział rrso</h3>
                <input :class="{'error-border' : v$.aprcRange.start.$invalid}" type="number" v-model="aprcRange.start">
                <input :class="{'error-border' : v$.aprcRange.end.$invalid}" type="number" v-model="aprcRange.end">
            </div>
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
const notNegative = 'Wartość nie może być ujemna'
import useValidate from '@vuelidate/core'
import { minValue, helpers } from '@vuelidate/validators'
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
            v$: useValidate(),
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
            calculationDateFilterChecked: false,
            withdrawalDateFilterChecked: false,
            capitalFilterChecked: false,
            installmentAmountFilterChecked: false,
            interestRateFilterChecked: false,
            insuranceSumFilterChecked: false,
            commissionRateFilterChecked: false,
            ageFilterChecked: false,
            aprcFilterChecked: false,
            isFiltered: false,
            filteredAuditData: [],
            showValidationError: false
        }
    },
    validations() {
        return {
            capitalRange: {
                start: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                },
                end: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                }
            },
            installmentAmountRange: {
                start: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                },
                end: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                }
            },
            interestRateRange: {
                start: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                },
                end: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                }
            },
            insuranceSumRange: {
                start: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                },
                end: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                }
            },
            commissionRateRange: {
                start: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                },
                end: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                }
            },
            ageRange: {
                start: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                },
                end: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                }
            },
            aprcRange: {
                start: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                },
                end: {
                    minValue: helpers.withMessage(notNegative, minValue(0))
                }
            }
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
                const age = (row.age || '' ).toString()
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
            if (this.v$.$invalid) {
                this.showValidationError = true
            return
      }
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
            if (this.isFiltered) {
                params = {
                    calculationStartDate: this.calculationDateFilterChecked ? this.calculationDateRange?.start?.toISOString().slice(0, 10) ?? '' : null,
                    calculationEndDate: this.calculationDateFilterChecked ? this.calculationDateRange?.end?.toISOString().slice(0, 10) ?? '' : null,
                    withdrawalStartDate: this.withdrawalDateFilterChecked ? this.withdrawalDateRange?.start?.toISOString().slice(0, 10) ?? '' : null,
                    withdrawalEndDate: this.withdrawalDateFilterChecked ? this.withdrawalDateRange?.end?.toISOString().slice(0, 10) ?? '' : null,
                    capitalStart: this.capitalFilterChecked ? this.capitalRange.start : null,
                    capitalEnd: this.capitalFilterChecked ? this.capitalRange.end : null,
                    installmentAmountStart: this.installmentAmountFilterChecked ? this.installmentAmountRange.start : null,
                    installmentAmountEnd: this.installmentAmountFilterChecked ? this.installmentAmountRange.end : null,
                    interestRateStart: this.interestRateFilterChecked ? this.interestRateRange.start === '' ? '' : this.interestRateRange.start/100 : null,
                    interestRateEnd: this.interestRateFilterChecked ? this.interestRateRange.end === '' ? '' : this.interestRateRange.end/100 : null,
                    commissionRateStart: this.commissionRateFilterChecked ? this.commissionRateRange.start === '' ? '' : this.commissionRateRange.start/100 : null,
                    commissionRateEnd: this.commissionRateFilterChecked ? this.commissionRateRange.end === '' ? '' : this.commissionRateRange.end/100 : null,
                    insuranceSumStart: this.insuranceSumFilterChecked ? this.insuranceSumRange.start : null,
                    insuranceSumEnd: this.insuranceSumFilterChecked ? this.insuranceSumRange.end : null,
                    clientAgeStart: this.ageFilterChecked ? this.ageRange.start : null,
                    clientAgeEnd: this.ageFilterChecked ? this.ageRange.end : null,
                    aprcStart: this.aprcFilterChecked ? this.aprcRange.start === '' ? '' : this.aprcRange.start/100 : null,
                    aprcEnd: this.aprcFilterChecked ? this.aprcRange.end === '' ? '' : this.aprcRange.end/100 : null
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
        this.getAuditData(),
        this.v$.$touch()
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

    .filter-item-wrapper {
        border: 1px solid lightgray;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 500px;
        margin: 20px;
        border-radius: 20px;
        padding: 20px;
        .filter-item {
        display: inline-block;
        
        input{
            margin: 15px;
            padding: 10px;
            border: 1px solid lightgray;
            border-radius: 5px;
            outline: none;           
        } 
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
.error-alert {
      color: red;
  }
  
  .error-border {
    border: 2px solid red !important;
    box-shadow: 0 0 10px rgb(255, 117, 117);
  }

</style>
