<template>
  <div id="app" class="container">

    <router-view></router-view>

  </div>
</template>
<!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapActions([
      'populateNewDeck',
      'populatePlayerNames'
    ])
  },
  mounted () {
    this.populateNewDeck()
    this.populatePlayerNames()
  }
}
</script>
<!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

@media (min-width: 321px) {

  #app {
    margin-top: 40px;
  }
}

@media (min-width: 600px) {

  #app {
    margin-top: 60px;
  }
}

</style>
