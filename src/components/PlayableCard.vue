<template>
  <div class="playble-card-component">
    <!-- Displays individual card which, upon click, can be sent to the card table -->

    <div v-on:click="sendCard">
      <img v-bind:src="card.image"></img>
    </div>

  </div>
</template>
<!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<script>
import { mapActions } from 'vuex'
// import HelloChild from './HelloChild'

export default {
  name: 'playable-card-component',
  props: ['card', 'playerID'],
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    ...mapActions([
      'putPlayedCard',
      'modifyPlayer1Hand',
      'modifyPlayer2Hand',
      'modifyPlayer3Hand',
      'modifyPlayer4Hand'
    ]),
    sendCard () {
      // Dispatch action which will write card to db and re-fresh tableHand state
      let payload = {
        'playerID': this.playerID,
        'card': this.card
      }
      this.putPlayedCard(payload)

      // Dispatch action to remove recently played card from hand
      switch (this.playerID.toString()) {
        case '1':
          this.modifyPlayer1Hand(this.card)
          break
        case '2':
          this.modifyPlayer2Hand(this.card)
          break
        case '3':
          this.modifyPlayer3Hand(this.card)
          break
        case '4':
          this.modifyPlayer4Hand(this.card)
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

img {
  max-height: 125px;
}

</style>
