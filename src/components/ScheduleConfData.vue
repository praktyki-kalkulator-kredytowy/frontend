<template>
  <div class="schedule-summary-container">
    <h2>Konfiguracja:</h2>
    <div class="configuration-row">
      <label>Kapitał: </label>
      <span >{{ currencyFormat(conf.capital) }} </span>

    </div>

    <div class="configuration-row">
      <label>Typ rat: </label>
      <span>{{ conf.installmentType === 'CONSTANT' ? 'STAŁE' : 'MALEJĄCE' }}</span>

    </div>

    <div class="configuration-row">
      <label>Ilość rat: </label>
      <span>{{ conf.installmentAmount }}</span>

    </div>

    <div class="configuration-row">
      <label>Suma składek ubezpieczeniowych: </label>
      <span>{{ conf.interestRate * 100 }}%</span>

    </div>

    <div class="configuration-row">
      <label>Data wypłaty: </label>
      <span>{{ formatDate(conf.withdrawalDate) }}</span>

    </div>

    <div class="configuration-row">
      <label>Prowizja: </label>
      <span>{{ conf.commissionRate * 100 }}%</span>

    </div>

    <div class="configuration-row">
      <label>Ubezpieczenie: </label>
      <span>{{ conf.insurance ? 'TAK' : 'NIE' }}</span>

    </div>

    <div class="configuration-row" v-if="conf.insurance">
      <label>Wiek: </label>
      <span> {{ conf.age }}</span>

    </div>
  </div>

</template>

<script>
import moment from "moment";

export default {
  name: "ScheduleConfigurationComponent",
  props: {
    conf: Object
  },
  methods: {
    formatDate(date){
      if (date) {
        return moment(String(date)).format('DD.MM.YYYY')
      }
    },
    currencyFormat(num) {
      if(num != undefined) return Number(num).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2} )+' zł'
    },
  }
}
</script>

<style scoped>

.configuration-row {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 7px;
}

.configuration-row label {
  margin-right: 15px;
  font-size: 23px;
  align-self: center;
}

.configuration-row span {
  font-size:17px;
  padding: 10px;
  justify-self: flex-end;
  align-self: center;
}
.schedule-summary-container {
  width: 55%;
  margin: auto;
}
</style>