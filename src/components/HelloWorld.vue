<template>
  <form @submit.prevent="onSubmit">
  <input name="enteredText" v-model="enteredText" type="text" placeholder="Podaj dane">
  <input type="submit" value="Wprowadź">
  <h3> {{ editedText }}</h3>
  
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
      axios.get(`http://localhost:4200/api/v1/concat`, { params: { value: this.enteredText } } )
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
