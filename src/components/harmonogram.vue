<template>
  <form @submit.prevent="onSubmit">
  <label for="enteredKwota">Kwota kredytu</label>
  <input name="enteredKwota" v-model="enteredKwota" type="number" placeholder="kwota">
  <label for="enteredText">Liczba rat</label>
  <input name="enteredRaty" v-model="enteredRaty" type="number" placeholder="liczba rat">
  <label for="enteredText">Rodzaj rat</label>
  <select>
    <option value="">rosnące</option>
    <option value="">malejące</option>
  </select>
  <label for="enteredText">Oprocentowanie</label>
  <input name="enteredProcent" v-model="enteredProcent" type="number" placeholder="procent">
  <label for="enteredText">Data wypłaty środków</label>
  <input name="enteredData" v-model="enteredData" type="date" placeholder="data">
  <input type="submit" value="Wprowadź">
  <router-link to="/">Przejdź do strony głównej</router-link>
  </form>
</template>


<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data() {
    return {
      enteredText: '',
      editedText: ''
 
    }
  },
  methods: {
    onSubmit() {
      const Text = {body: this.enteredText}
      axios.get(`http://localhost:8080/api/v1/concat/`+ Text)
      axios.get(`http://localhost:4200/api/v1/concat/`+this.enteredKwota)
      .then(response => {
        this.editedText = response.data
      })
    },

  
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {display: flex;
flex-direction:column;
align-items: center;
}
</style>
