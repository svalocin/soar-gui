const state = {
  displayConfigDrawer: false,
}

const mutations = {
  CHANGE_DISPLAY_CONFIG_DRAWER(state) {
    state.displayConfigDrawer = !state.displayConfigDrawer;
  }
}

const actions = {
  changeDisplayConfigDrawer({ commit }) {
    commit('CHANGE_DISPLAY_CONFIG_DRAWER');
  }
}

export default {
  state,
  mutations,
  actions
}
