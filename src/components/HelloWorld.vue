<template>
  <form @submit.prevent="onSubmit">
  <label for="enteredText">Hello world</label>
  <input name="enteredText" v-model="enteredText" type="text" placeholder="Podaj dane">
  <input type="submit" value="Wprowadź">
  <h1> {{ enteredText }}</h1>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data() {
    return {
      enteredText: '',
      editedText: '',
      errors: []
      
    }
  },
  methods: {
    onSubmit() {
      const Text = {body: this.enteredText}
      axios.post(`wklej url`  , Text)
        .then(response => response.data = this.enteredText)
      axios.get(`wklej url`)
      .then(response => {
        this.editedText = response.data
      })
    }

  
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
