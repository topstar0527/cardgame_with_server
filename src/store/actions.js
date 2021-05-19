// Instead of mutating the state, actions commit mutations.
// We can pass a second argument to store.commit which is the "payload"
// for the mutation. Payloads are typically objects.
import _ from 'lodash'
import axios from 'axios'

// const baseURL = 'http://localhost:3000'
const baseURL = '/api'

// Counter Component Actions, left behind for examples  ------------------------
export const increment = ({ commit }) => commit('increment')
export const decrement = ({ commit }) => commit('decrement')

export const incrementIfOdd = ({ commit, state }) => {
  if ((state.count + 1) % 2 === 0) {
    commit('increment')
  }
}
export const incrementAsync = ({ commit }) => {
  setTimeout(() => {
    commit('increment')
  }, 1000)
}

// Get Actions -----------------------------------------------------------------
export const populateConfig = ({ commit }) => {
  // Hydrate state with new configuration settings from db
  return axios.get(baseURL + '/config')
    .then(res => {
      commit('mutateConfig', res.data)
    })
}

export const populateNewDeck = ({ commit }) => {
  // Hydrate state with new deck from db
  return axios.get(baseURL + '/newdeck')
    .then(res => {
      commit('mutateNewDeck', res.data)
    })
}

export const populateShuffled = ({ commit }) => {
  return axios.get(baseURL + '/shuffled/1')
    .then(res => {
      commit('mutateShuffled', res.data.cards)
    })
}

export const populatePlayer1Hand = ({ commit }) => {
  return axios.get(baseURL + '/players/1')
    .then(res => {
      commit('mutatePlayer1Hand', res.data.cards)
    })
}

export const populatePlayer2Hand = ({ commit }) => {
  return axios.get(baseURL + '/players/2')
    .then(res => {
      commit('mutatePlayer2Hand', res.data.cards)
    })
}

export const populatePlayer3Hand = ({ commit }) => {
  return axios.get(baseURL + '/players/3')
    .then(res => {
      commit('mutatePlayer3Hand', res.data.cards)
    })
}

export const populatePlayer4Hand = ({ commit }) => {
  return axios.get(baseURL + '/players/4')
    .then(res => {
      commit('mutatePlayer4Hand', res.data.cards)
    })
}

export const populateTableHand = ({ commit }) => {
  return axios.get(baseURL + '/tablehand')
    .then(res => {
      commit('mutateTableHand', res.data)
    })
}

export const populatePlayerNames = ({ commit }) => {
  return axios.get(baseURL + '/playernames')
    .then(res => {
      commit('mutatePlayerNames', res.data)
    })
}

export const populateTeamScores = ({ commit }) => {
  return axios.get(baseURL + '/teamscores')
    .then(res => {
      commit('mutateTeamScores', res.data)
    })
}

export const populateRoundScores = ({ commit }) => {
  return axios.get(baseURL + '/roundscores')
    .then(res => {
      commit('mutateRoundScores', res.data)
    })
}

// Put Actions -----------------------------------------------------------------
export const putConfig = ({ dispatch }, payload) => {
  // Config is single object that holds app-level state settings
  return axios.put(baseURL + '/config', payload)
    .then(res => {
      dispatch('populateConfig')
    })
}

export const putPlayer1Hand = ({ dispatch }, cardSet) => {
  // Called from the Table Component, write player 1's hand to db
  let pkg = { 'cards': cardSet }
  return axios.put(baseURL + '/players/1', pkg)
    .then(res => {
      dispatch('populatePlayer1Hand')
    })
}

export const putPlayer2Hand = ({ dispatch }, cardSet) => {
  let pkg = { 'cards': cardSet }
  return axios.put(baseURL + '/players/2', pkg)
    .then(res => {
      dispatch('populatePlayer2Hand')
    })
}

export const putPlayer3Hand = ({ dispatch }, cardSet) => {
  let pkg = { 'cards': cardSet }
  return axios.put(baseURL + '/players/3', pkg)
    .then(res => {
      dispatch('populatePlayer3Hand')
    })
}

export const putPlayer4Hand = ({ dispatch }, cardSet) => {
  let pkg = { 'cards': cardSet }
  return axios.put(baseURL + '/players/4', pkg)
    .then(res => {
      dispatch('populatePlayer4Hand')
    })
}

export const putShuffledDeck = ({ dispatch, state }) => {
  // Shuffle three times and write shuffled deck to db
  let shuffle1 = _.shuffle(_.cloneDeep(state.newDeck))
  let shuffle2 = _.shuffle(shuffle1)
  let shuffle3 = _.shuffle(shuffle2)
  let pkg = { 'cards': shuffle3 }
  return axios.put(baseURL + '/shuffled/1', pkg)
    .then(res => {
      dispatch('populateShuffled')
    })
}

export const putPlayedCard = ({ dispatch }, payload) => {
  // Show recently played card on card table
  let pkg = { 'card': payload.card }
  return axios.put(baseURL + '/tablehand/' + payload.playerID, pkg)
    .then(res => {
      dispatch('populateTableHand')
    })
}

export const putPlayerName = ({ dispatch }, payload) => {
  // Write player name to db
  let pkg = { 'name': payload.name }
  return axios.put(baseURL + '/playernames/' + payload.id, pkg)
    .then(res => {
      dispatch('populatePlayerNames')
    })
}

export const postPrelimBid = ({ dispatch, state }, payload) => {
  let id = payload.team
  let bid = payload.localBid
  let prelimBid = payload.prelimBid
  let yourTeamScores = _.cloneDeep(state.teamScores[id - 1].scores)
  let newBid = {
    'bid': bid,
    'score': '',
    'prelimbid': prelimBid
  }
  let pkg = {
    'scores': _.concat(yourTeamScores, newBid)
  }
  return axios.put(baseURL + '/teamscores/' + id, pkg)
    .then(res => {
      dispatch('populateTeamScores')
    })
}

export const postFinalBid = ({ dispatch, state }, payload) => {
  let id = payload.team
  let bid = payload.localBid
  let prelimBid = payload.prelimBid
  let confirmedBid = payload.confirmedBid
  let yourTeamScores = _.cloneDeep(state.teamScores[id - 1].scores)
  let slicedScores = yourTeamScores.slice(0, yourTeamScores.length - 1)
  let newBid = {
    'bid': bid,
    'score': '',
    'prelimbid': prelimBid,
    'confirmedbid': confirmedBid
  }
  let pkg = {
    'scores': _.concat(slicedScores, newBid)
  }
  return axios.put(baseURL + '/teamscores/' + id, pkg)
    .then(res => {
      dispatch('populateTeamScores')
    })
}

export const postScore = ({ dispatch, state }, payload) => {
  let confirmedBid = payload.confirmedBid
  let prelimBid = payload.prelimBid
  let id = payload.team
  let score = payload.localScore
  let yourTeamScores = _.cloneDeep(state.teamScores[id - 1].scores)
  let originalBid = yourTeamScores[yourTeamScores.length - 1].bid
  let slicedScores = yourTeamScores.slice(0, yourTeamScores.length - 1)
  let newScore = {
    'bid': originalBid,
    'score': score,
    'prelimbid': prelimBid,
    'confirmedbid': confirmedBid
  }
  let pkg = {
    'scores': _.concat(slicedScores, newScore)
  }
  return axios.put(baseURL + '/teamscores/' + id, pkg)
    .then(res => {
      dispatch('populateTeamScores')
    })
}

export const putRoundScore = ({ dispatch }, payload) => {
  return axios.put(baseURL + '/roundscores/' + payload.team, payload.scorePkg)
    .then(res => {
      dispatch('populateRoundScores')
    })
}

// Misc Actions ----------------------------------------------------------------
export const modifyPlayer1Hand = ({ dispatch, state }, card) => {
  // Remove recently played card from player's hand
  let oldHand = _.cloneDeep(state.player1Hand)
  let newHand = _.reject(oldHand, card)
  dispatch('putPlayer1Hand', newHand)
}

export const modifyPlayer2Hand = ({ dispatch, state }, card) => {
  // Remove recently played card from player's hand
  let oldHand = _.cloneDeep(state.player2Hand)
  let newHand = _.reject(oldHand, card)
  dispatch('putPlayer2Hand', newHand)
}

export const modifyPlayer3Hand = ({ dispatch, state }, card) => {
  // Remove recently played card from player's hand
  let oldHand = _.cloneDeep(state.player3Hand)
  let newHand = _.reject(oldHand, card)
  dispatch('putPlayer3Hand', newHand)
}

export const modifyPlayer4Hand = ({ dispatch, state }, card) => {
  // Remove recently played card from player's hand
  let oldHand = _.cloneDeep(state.player4Hand)
  let newHand = _.reject(oldHand, card)
  dispatch('putPlayer4Hand', newHand)
}

export const resetScores = ({ dispatch }, team) => {
  let blankScores = { 'scores': [{ 'prelimbid': false, 'confirmedbid': false }], 'id': team }
  return axios.put(baseURL + '/teamscores/' + team, blankScores)
    .then(res => {
      dispatch('populateTeamScores')
    })
}
