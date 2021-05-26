<template>
    <input type="text"
           placeholder="Wyszukaj..."
           v-model="search">
  <table>
      <thead>
          <tr>
              <th>Kapitał</th>
              <th>Rodzaj rat</th>
              <th>Liczba rat</th>
              <th>Oprocentowanie</th>
              <th>Data wypłaty</th>
              <th>Prowizja</th>
              <th>Ubezpieczenie</th>
              <th>Wiek</th>
          </tr>
      </thead>
      <tbody>
            
                <tr @click="changedir(`/audit/details/${index+1}`)" v-for="(test, index) in filteredRows" :key="index">
                    <td v-html="highlightMatches(test.capital)"></td>
                    <td v-html="highlightMatches(test.installmentType)"></td>
                    <td v-html="highlightMatches(test.installmentAmount)"></td>
                    <td v-html="highlightMatches(test.interestRate*100+'%')"></td>
                    <td v-html="highlightMatches(test.withdrawalDate)"></td>
                    <td v-html="highlightMatches(test.commissionRate*100+'%')"></td>
                    <td v-html="highlightMatches(test.insurance ? 'Tak' : 'Nie')"></td>
                    <td v-html="highlightMatches(test.age)"></td>
                </tr>
            
      </tbody>
  </table>
  <router-link to="/">Powróć</router-link>
</template>

<script>



export default {
    name: 'Audit',
    data() {
        return {
            search: '',
            
            ScheduleConfiguration: [
                {
                capital: 10000,
                installmentType: "CONSTANT",
                installmentAmount: 12,
                interestRate: 0.1,
                withdrawalDate: '2015-05-15',
                commissionRate: 0.1,
                insurance: true,
                age: 25
                }
            ]

            
        }
    },
    computed: {
        filteredRows() {
            return this.ScheduleConfiguration.filter(row => {
                const capital = row.capital.toString()
                const installmentType = row.installmentType.toLowerCase()
                const installmentAmount = row.installmentAmount.toString()
                const interestRate = row.interestRate.toString()
                const withdrawalDate = row.withdrawalDate.toString().toLowerCase()
                const commissionRate = row.commissionRate.toString()
                const insurance = row.insurance ? 'tak' : 'nie'
                const age = row.age.toString()

                const searchTerm = this.search.toLowerCase()

                return capital.includes(searchTerm) ||
                       installmentType.includes(searchTerm) ||
                       installmentAmount.includes(searchTerm) ||
                       interestRate.includes(searchTerm) ||
                       withdrawalDate.includes(searchTerm) ||
                       commissionRate.includes(searchTerm) ||
                       insurance.includes(searchTerm) ||
                       age.includes(searchTerm) 
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
        }
    }
    
}
</script>

<style scoped>

</style>
