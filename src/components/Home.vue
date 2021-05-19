<template>
  <div class="home-component">
    <!-- Main home page for Strebor Spades -->

    <div class="title">Strebor St. Spades</div>
    <div class="sub-title">Lewis Powell Style</div>
    <img id="logo" src="https://s3-us-west-2.amazonaws.com/strebor-spades-images/BJ.svg"></img>
    <img id="logo" src="https://s3-us-west-2.amazonaws.com/strebor-spades-images/SJ.svg"></img>
    <img id="logo" src="https://s3-us-west-2.amazonaws.com/strebor-spades-images/2S.svg"></img>
    <img id="logo" src="https://s3-us-west-2.amazonaws.com/strebor-spades-images/AS.svg"></img>
    <img id="logo" src="https://s3-us-west-2.amazonaws.com/strebor-spades-images/KS.svg"></img>
    <div class="divider"></div>

    <!-- Link to Main Table, to be used by players using Mobile hands  -->
    <div style="margin-bottom: 10px;"><router-link to="/table">Main Table</router-link></div>

    <!-- Link to Dev Table, used for debugging app -->
    <div style="margin-bottom: 10px;"><router-link to="/devtable">Observer Table</router-link></div>

    <!-- Awkwardly positioned Team Heading... -->
    <div class="flex-container">
      <div class="flex1"></div>
      <div class="flex2" style="font-weight: 600;">Team 1</div>
      <div class="flex3"></div>
      <div class="flex4"></div>
      <div class="flex5"></div>
      <div class="flex6"></div>
    </div>

    <!-- Player 1 Links -->
    <div class="flex-container">
      <div class="flex1"></div>
      <div class="flex2">{{ playerNames[0].name }}</div>
      <div class="flex3"><router-link to="/player1">Mobile</router-link></div>
      <div class="flex4">&emsp;<router-link to="/player1-solo">Solo</router-link></div>
      <div class="flex5">
        <input type="text" v-model="localPlayer1" placeholder="Edit Name">
        <button v-on:click="onSetName(1, localPlayer1)">Set</button>
      </div>
      <div class="flex6"></div>
    </div>

    <!-- Player 3 Links -->
    <div class="flex-container">
      <div class="flex1"></div>
      <div class="flex2">{{ playerNames[2].name }}</div>
      <div class="flex3"><router-link to="/player3">Mobile</router-link></div>
      <div class="flex4">&emsp;<router-link to="/player3-solo">Solo</router-link></div>
      <div class="flex5">
        <input type="text" v-model="localPlayer3" placeholder="Edit Name">
        <button v-on:click="onSetName(3, localPlayer3)">Set</button>
      </div>
      <div class="flex6"></div>
    </div>

    <!-- Awkwardly positioned Team Heading... -->
    <div class="flex-container" style="margin-top: 20px;">
      <div class="flex1"></div>
      <div class="flex2" style="font-weight: 600;">Team 2</div>
      <div class="flex3"></div>
      <div class="flex4"></div>
      <div class="flex5"></div>
      <div class="flex6"></div>
    </div>

    <!-- Player 2 Links -->
    <div class="flex-container">
      <div class="flex1"></div>
      <div class="flex2">{{ playerNames[1].name }}</div>
      <div class="flex3"><router-link to="/player2">Mobile</router-link></div>
      <div class="flex4">&emsp;<router-link to="/player2-solo">Solo</router-link></div>
      <div class="flex5">
        <input type="text" v-model="localPlayer2" placeholder="Edit Name">
        <button v-on:click="onSetName(2, localPlayer2)">Set</button>
      </div>
      <div class="flex6"></div>
    </div>

    <!-- Player 4 Links -->
    <div class="flex-container">
      <div class="flex1"></div>
      <div class="flex2">{{ playerNames[3].name }}</div>
      <div class="flex3"><router-link to="/player4">Mobile</router-link></div>
      <div class="flex4">&emsp;<router-link to="/player4-solo">Solo</router-link></div>
      <div class="flex5">
        <input type="text" v-model="localPlayer4" placeholder="Edit Name">
        <button v-on:click="onSetName(4, localPlayer4)">Set</button>
      </div>
      <div class="flex6"></div>
    </div>

    <div style="margin-top: 20px;">
      <a href="https://hangouts.google.com/group/6Uq6vjaSjgj4u3IC2" target="_blank">Join Hangout</a>
    </div>

  </div>
</template>
<!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<script>
import { mapGetters, mapActions } from 'vuex'
// import HelloChild from './HelloChild'

export default {
  name: 'home-component',
  props: ['propsIn'],
  data () {
    return {
      localPlayer1: '',
      localPlayer2: '',
      localPlayer3: '',
      localPlayer4: ''
    }
  },
  computed: {
    ...mapGetters(['playerNames'])
  },
  methods: {
    ...mapActions(['putPlayerName']),
    onSetName (player, name) {
      let payload = {
        'id': player,
        'name': name
      }
      this.putPlayerName(payload)
      switch (player.toString()) {
        case '1':
          this.localPlayer1 = ''
          break
        case '2':
          this.localPlayer2 = ''
          break
        case '3':
          this.localPlayer3 = ''
          break
        case '4':
          this.localPlayer4 = ''
          break
      }
    }
  },
  components: {
    // HelloChild
  }
}
</script>
<!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<style scoped>

.title
{
  font-weight: 400;
  font-size: 1.5em;
}

.sub-title
{
  font-style: oblique;
  margin-top: 2px;
  margin-bottom: 10px;
}

#logo {
  max-height: 75px;
}

.divider {
  margin-bottom: 10px
}

.flex-container {
  display: flex;
}

.flex1 {
  flex: 1 1 auto;
}

.flex2 {
  width: 100px;
  flex: 0 2 auto;
}

.flex3 {
  width: 70px;
  flex: 0 3 auto;
  padding: 0px 4px;
}

.flex4 {
  width: 70px;
  flex: 0 3 auto;
  padding: 0px 4px;
}

.flex5 {
  width: 195px;
  flex: 0 1 auto;
}

.flex6 {
  flex: 1 1 auto;
}

a {
  color: #42b983;
}

input {
  border: 1px solid #4CAF50;
  width: 80px;
  padding: 2px 4px;
  margin: 1px 2px;
}

button {
  background-color: white;
  color: #2c3e50;
  border: 1px solid #4CAF50;
  padding: 2px 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: .7em;
  font-weight: 500;
  margin: 1px 2px;
  -webkit-transition-duration: 0.2s; /* Safari */
  transition-duration: 0.2s;
  cursor: pointer;
}

button:hover {
  background-color: #4CAF50;
  color: white;
}

</style>
