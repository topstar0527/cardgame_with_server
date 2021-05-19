<template>
  <div class="player3-component">
    <!-- Display ordered cards in player's hand -->

    <div
      class="card-pics"
      v-for="(cardObject, index) in orderedCards">
      <playable-card
        v-bind:card="cardObject"
        v-bind:playerID="3">
      </playable-card>
    </div>

  </div>
</template>
<!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import PlayableCard from './PlayableCard.vue'

export default {
  name: 'player3-component',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['player3Hand']),
    orderedCards () {
      let spades = _.orderBy(_.filter(this.player3Hand, ['suit', 'Spades']), ['rank'], ['asc'])
      let diamonds = _.orderBy(_.filter(this.player3Hand, ['suit', 'Diamonds']), ['rank'], ['asc'])
      let clubs = _.orderBy(_.filter(this.player3Hand, ['suit', 'Clubs']), ['rank'], ['asc'])
      let hearts = _.orderBy(_.filter(this.player3Hand, ['suit', 'Hearts']), ['rank'], ['asc'])

      // When we're lacking one suite, keep colors alternating so it's easier to see cards
      if (diamonds.length === 0) {
        return spades.concat(hearts, clubs)
      }
      if (hearts.length === 0) {
        return spades.concat(diamonds, clubs)
      }
      if (clubs.length === 0) {
        return diamonds.concat(spades, hearts)
      }
      return spades.concat(diamonds, clubs, hearts)
    }
  },
  methods: {
    ...mapActions(['populatePlayer3Hand'])
  },
  components: {
    PlayableCard
  },
  mounted () {
    this.populatePlayer3Hand()
  }
}
</script>
<!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<style scoped>

.card-pics {
  display: inline-block;
}

</style>
