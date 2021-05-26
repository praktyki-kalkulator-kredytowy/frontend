<template>
<div>
  <router-view></router-view>
</div>
  
</template>

<script>



export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #212121;
  margin-top: 60px;
}
.nav-button {
  display: inline-block;
  text-align: center;
  text-decoration: none;
  margin: 2px 0;
  border: solid 2px transparent;
  border-radius: 4px;
  padding: 0.5em 1em;
  color: #ffffff;
  background-color: #16a085;
  font-weight: 600
}
.nav-button:active {
    transform: translateY(1px);
    filter: saturate(150%);
}
.nav-button:hover {
    color: #16a085;
    border-color: currentColor;
    background-color: white;
}
</style>
