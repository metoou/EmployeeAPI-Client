<template>
  <div id="app">
    <Navigation />
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');
  * {
    box-sizing: boarder-box;
  }
  body {
    background: #ffffff !important;
    min-height: 100vh;
    display: flex;
    font-weight: 400;
    font-family: 'Fira Sans', sans-serif;
  }
  h1, h2, h3, h4, h5, h6, label, span {
    font-weight: 500;
    font-family: 'Fira Sans', sans-serif;
  }
  body, html, #app, #root .auth-wrapper {
    width: 100%;
    height: 100%;
  }
  #app {
    text-align: center;
  }
  .navbar-light {
    background-color: #fcfafa;
  }
  

</style>
