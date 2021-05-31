<template>
  <div id="app">
    <ActivityMonitor msg="Activity Monitoring"/>
  </div>
</template>

<script>
import ActivityMonitor from './components/ActivityMonitor.vue'

export default {
  name: 'App',
  components: {
  ActivityMonitor
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
