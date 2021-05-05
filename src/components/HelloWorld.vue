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
      enteredText: '' 
    }
  },
  methods: {
    onSubmit() {
      const Text = {body: this.enteredText}
      axios.get(`http://localhost:8080/api/v1/concat/`+ Text)
      .then(response => {
        response.data = this.enteredText
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
