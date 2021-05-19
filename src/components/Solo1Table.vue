<template>
  <div class="dev-table-component">
    <div class="title">Strebor St. Spades</div>
    <p>Trumpet Case Table</p>
    <div class="layout-container">

      <!-- Team 1 Scoring -->
      <div class="first-third">
        <div class="score-header">Team 1</div>
        <div class="flex-container">
          <div class="flex1"></div>
          <div class="flex2">Bid</div>
          <div class="flex3"></div>
          <div class="flex4">Score</div>
          <div class="flex5"></div>
        </div>

        <div v-for="(allScores, index) in teamScores[0].scores">
          <score-display v-bind:scoreList="allScores"></score-display>
        </div>
        <score-input v-bind:team="1"></score-input>
      </div>

      <!-- Card Table, Center Section -->
      <div class="second-third">
        <div class="table-container">

          <div class="player3">
            <div v-bind:class="{ dealer: isPlayer3Dealer }">{{ playerNames[2].name }}</div>
            <single-card v-bind:card="tableHand[2].card"></single-card>
          </div>

          <div class="sub-container">
            <div class="player2">
              <div v-bind:class="{ dealer: isPlayer2Dealer }">{{ playerNames[1].name }}</div>
              <single-card v-bind:card="tableHand[1].card"></single-card>
            </div>

            <div class="center-spacer"></div>

            <div class="player4">
              <div v-bind:class="{ dealer: isPlayer4Dealer }">{{ playerNames[3].name }}</div>
              <single-card v-bind:card="tableHand[3].card"></single-card>
            </div>
          </div>

          <div class="player1">
            <div v-bind:class="{ dealer: isPlayer1Dealer }">{{ playerNames[0].name }}</div>
            <single-card v-bind:card="tableHand[0].card"></single-card>
          </div>

        </div>
      </div>

      <!-- Team 2 Scoring -->
      <div class="third-third">
        <div class="score-header">Team 2</div>
        <div class="flex-container">
          <div class="flex1"></div>
          <div class="flex2">Bid</div>
          <div class="flex3"></div>
          <div class="flex4">Score</div>
          <div class="flex5"></div>
        </div>

        <div v-for="(allScores, index) in teamScores[1].scores">
          <score-display v-bind:scoreList="allScores"></score-display>
        </div>
        <score-input v-bind:team="2"></score-input>
      </div>

    </div>

    <!-- Bottom Buttons for Round Scoring -->
    <div class="layout-container">
      <div class="first-third">
        <div class="score-header">{{ playerNames[0].name }} - {{ playerNames[2].name }}</div>
        <div class="flex-container">
          <div class="flex1"></div>
          <div class="flex2">Total: {{ roundScores[0].total }}</div>
          <div class="flex3"><button v-on:click="onTake(1)">Take</button></div>
          <div class="flex4">Books: {{ roundScores[0].score }}</div>
          <div class="flex5"></div>
        </div>
      </div>
      <div class="second-third"></div>
      <div class="third-third">
        <div class="score-header">{{ playerNames[1].name }} - {{ playerNames[3].name }}</div>
        <div class="flex-container">
          <div class="flex1"></div>
          <div class="flex2">Total: {{ roundScores[1].total }}</div>
          <div class="flex3"><button v-on:click="onTake(2)">Take</button></div>
          <div class="flex4">Books: {{ roundScores[1].score }}</div>
          <div class="flex5"></div>
        </div>
      </div>
    </div>

    <!-- Navigation  -->
    <button v-on:click="onSwitchDealer">Dealer</button>
    <button v-on:click="onDeal">Deal</button>
    <button>Undo</button>
    <button v-on:click="onReset">Reset</button>
    <button v-on:click="goHome">Home</button>
    <hr>

    <player-one-cards></player-one-cards>

  </div>
</template>
<!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import SingleCard from './SingleCard.vue'
import ScoreDisplay from './ScoreDisplay.vue'
import ScoreInput from './ScoreInput.vue'
import PlayerOneCards from './Player1.vue'

export default {
  name: 'dev-table-component',
  props: ['propsIn'],
  data () {
    return {
      local1RoundScore: 0,
      local2RoundScore: 0,
      timer: ''
    }
  },
  created () {
    // Temp solution until I figure out websockets. Refresh all necessary table
    // components at set intervals
    this.refreshStuff()
    this.timer = setInterval(this.refreshStuff, 3000)
  },
  computed: {
    ...mapGetters([
      'config',
      'newDeck',
      'shuffled',
      'player1Hand',
      'player2Hand',
      'player3Hand',
      'player4Hand',
      'tableHand',
      'teamScores',
      'playerNames',
      'roundScores'
    ]),
    isPlayer1Dealer () {
      return this.config.dealer === 1
    },
    isPlayer2Dealer () {
      return this.config.dealer === 2
    },
    isPlayer3Dealer () {
      return this.config.dealer === 3
    },
    isPlayer4Dealer () {
      return this.config.dealer === 4
    }
  },
  methods: {
    ...mapActions([
      'putConfig',
      'putShuffledDeck',
      'putPlayer1Hand',
      'putPlayer2Hand',
      'putPlayer3Hand',
      'putPlayer4Hand',
      'resetScores',
      'putPlayedCard',
      'putRoundScore',
      'populateTableHand',
      'populateTeamScores',
      'populateRoundScores'
    ]),
    goHome () {
      // Demo of programitic navigation
      this.$router.push('/')
    },
    onSwitchDealer () {
      // Rotate dealer to next player
      let nextDealer = this.config.dealer
      nextDealer === 4 ? nextDealer = 1 : nextDealer++
      this.putConfig({'dealer': nextDealer})
    },
    onDeal () {
      this.putShuffledDeck()
    },
    onReset () {
      // Reset scores and remove cards from all players' hands
      this.resetScores(1)
      setTimeout(() => { this.resetScores(2) }, 250)
      setTimeout(() => { this.putPlayer1Hand([]) }, 500)
      setTimeout(() => { this.putPlayer2Hand([]) }, 750)
      setTimeout(() => { this.putPlayer3Hand([]) }, 1000)
      setTimeout(() => { this.putPlayer4Hand([]) }, 1250)
      // Rest total score, team 1
      let payload = {
        'team': 1,
        'scorePkg': { 'total': 0, 'score': 0 }
      }
      setTimeout(() => { this.putRoundScore(payload) }, 1500)
      // Rest total score, team 2
      let payload2 = {
        'team': 2,
        'scorePkg': { 'total': 0, 'score': 0 }
      }
      setTimeout(() => { this.putRoundScore(payload2) }, 1750)
    },
    onTake (team) {
      // Clear all hands on table now that round is over
      setTimeout(() => { this.putPlayedCard({ 'playerID': 1, 'card': {} }) }, 250)
      setTimeout(() => { this.putPlayedCard({ 'playerID': 2, 'card': {} }) }, 500)
      setTimeout(() => { this.putPlayedCard({ 'playerID': 3, 'card': {} }) }, 750)
      setTimeout(() => { this.putPlayedCard({ 'playerID': 4, 'card': {} }) }, 1000)
      // Update Round Score
      let payload = {
        'team': team,
        'scorePkg': { 'total': this.roundScores[team - 1].total, 'score': this.roundScores[team - 1].score + 1 }
      }
      setTimeout(() => { this.putRoundScore(payload) }, 1250)
    },
    refreshStuff () {
      console.log('Ping')
      this.populateTableHand()
      this.populateTeamScores()
      this.populateRoundScores()
    }
  },
  watch: {
    shuffled: function () {
      // Deal 13 cards to each player, call actions to write to db
      let splitDeck = _.chunk(this.shuffled, 13)
      this.putPlayer1Hand(splitDeck[0])
      setTimeout(() => { this.putPlayer2Hand(splitDeck[1]) }, 250)
      setTimeout(() => { this.putPlayer3Hand(splitDeck[2]) }, 500)
      setTimeout(() => { this.putPlayer4Hand(splitDeck[3]) }, 750)
    }
  },
  components: {
    SingleCard,
    ScoreDisplay,
    ScoreInput,
    PlayerOneCards
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<style scoped>

.score-header {
  font-weight: 500;
}

.title
{
  font-weight: 400;
  font-size: 1.5em;
  margin-bottom: 10px;
}

#card {
  max-height: 125px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.card-pics {
  display: inline-block;
}

.dealer {
  font-weight: 600;
  color: red;
}

.layout-container {
  display: flex;
}

.first-third {
  flex: 1 1 0;
}

.second-third {
  flex: 2 1 0;
}

.third-third {
  flex: 1 1 0;
}

.table-container {
  border: 1px solid lightgrey;
  max-width: 600px;
  margin: auto;
}

.player1 {
  height: 175px;
}

.sub-container {
  width: 100%;
  display: flex;
}

.player2 {
  flex: 2 1 0;
  height: 175px;
}

.center-spacer {
  flex: 1 1 0;
}

.player4 {
  flex: 2 1 0;
  height: 175px;
  position: relative;
}

.player3 {
  height: 175px;
}

/* Styling for score column headings */
.flex-container {
  display: flex;
}

.flex1 {
  flex: 2 1 auto;
}

.flex2 {
  flex: 1 1 0;
}

.flex3 {
  flex: 1 1 auto;
}

.flex4 {
  flex: 1 1 0;
}

.flex5 {
  flex: 2 1 auto;
}

button {
  background-color: white;
  color: #2c3e50;
  border: 1px solid #4CAF50;
  padding: 8px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  font-weight: 500;
  margin: 20px 2px;
  -webkit-transition-duration: 0.2s; /* Safari */
  transition-duration: 0.2s;
  cursor: pointer;
}

button:hover {
  background-color: #4CAF50;
  color: white;
}

</style>
