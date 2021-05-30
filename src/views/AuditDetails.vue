<template>
<router-view></router-view>
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


  <div class="schedule-container" v-if="scheduleEvent.schedule">
    <h1>Obliczenia z {{ scheduleEvent.calculationDate }}</h1>

    <schedule-conf-data :conf="scheduleEvent.schedule.scheduleConfiguration"></schedule-conf-data>
    <schedule :schedule="scheduleEvent.schedule"></schedule>
  </div>


<button class="nav-button" @click="$router.push('/audit')">Powróć</button>

</template>

<script>
import axios from 'axios'
import Popup from '../components/Popup'
import Schedule from '../components/schedule'
import ScheduleConfData from '../components/ScheduleConfData'

export default {
  name: 'AuditDetails',
  components: {
    Popup,
    Schedule,
    ScheduleConfData
  },
  data() {
    return {
      scheduleEvent: Object,
      error: false,
      loading: false
    }
  },
  async mounted() {
    this.loading = true;
    try {
      let response = await axios.get("http://localhost:4200/api/v1/audit/" + this.$route.params.index);
      this.scheduleEvent = response.data;
    } catch (e) {
      this.error = true;
    }
    this.loading = false;
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.schedule-container {
  width:65%;
  margin: auto;
  margin-top: 30px;
  border: 1px solid lightgray;
  padding: 50px;
  border-radius: 25px;
}

</style>
