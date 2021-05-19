import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  // Counter Component State ---------------------------------------------------
  count: 0,
  history: [],

  // Table Component State -----------------------------------------------------
  config: { 'dealer': 1 },
  newDeck: [],
  shuffled: [],
  player1Hand: [],
  player2Hand: [],
  player3Hand: [],
  player4Hand: [],
  tableHand: [{ 'card': {}, 'id': 1 }, { 'card': {}, 'id': 2 }, { 'card': {}, 'id': 3 }, { 'card': {}, 'id': 4 }],
  teamScores: [{ 'scores': [{ 'prelimbid': false, 'confirmedbid': false }], 'id': 1 }, { 'scores': [{ 'prelimbid': false, 'confirmedbid': false }], 'id': 2 }],
  playerNames: [{ 'name': '', 'id': 1 }, { 'name': '', 'id': 2 }, { 'name': '', 'id': 3 }, { 'name': '', 'id': 4 }],
  roundScores: [{ 'total': 0, 'score': 0, 'id': 1 }, { 'total': 0, 'score': 0, 'id': 2 }]
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store
