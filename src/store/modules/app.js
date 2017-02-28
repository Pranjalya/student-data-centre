import * as types from '../mutation-types'

const state = {
  sidebar: {
    opened: true
  },
  config: {
    googleMaps: {
      apiKey: 'AIzaSyBNAqPrTQoz9P4NBlDDyfxrnKiafkaL8iQ'
    }
  }
}

const mutations = {
  [types.TOGGLE_SIDEBAR] (state, opened) {
    state.sidebar.opened = opened
  }
}

const actions = {
  toggleSidebar ({ commit }, opened) {
    commit(types.TOGGLE_SIDEBAR, opened)
  }
}

export default {
  state,
  mutations,
  actions
}