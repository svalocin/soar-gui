const yaml = require('js-yaml');
const fs = require('fs');

import soar from '../../common/soar';

const state = {
    'online-dsn': {
        addr: '',
        schema: '',
        user: '',
        password: '',
        disable: false
    }
}

const mutations = {
    SET_ONLINE_DSN_ADDR(state, value) { state['online-dsn'].addr = value; },
    SET_ONLINE_DSN_SCHEMA(state, value) { state['online-dsn'].schema = value; },
    SET_ONLINE_DSN_USER(state, value) { state['online-dsn'].user = value; },
    SET_ONLINE_DSN_PASSWORD(state, value) { state['online-dsn'].password = value; },
    SET_ONLINE_DSN_DISABLE(state, value) { state['online-dsn'].disable = value; },
    SET_CONFIG(state, value) { Object.assign(state, value); },
}

const actions = {
    setOnlineDsnAddr({ commit }, value) { commit('SET_ONLINE_DSN_ADDR', value); },
    setOnlineDsnSchema({ commit }, value) { commit('SET_ONLINE_DSN_SCHEMA', value); },
    setOnlineDsnUser({ commit }, value) { commit('SET_ONLINE_DSN_USER', value); },
    setOnlineDsnPassword({ commit }, value) { commit('SET_ONLINE_DSN_PASSWORD', value); },
    setOnlineDsnDisable({ commit }, value) { commit('SET_ONLINE_DSN_DISABLE', value); },
    writeConfig({ commit, state }) {
        let doc = yaml.safeDump(state);
        fs.writeFileSync(soar.yamlPath, doc);
    },
    readConfig({ commit }) {
        var doc = yaml.safeLoad(fs.readFileSync(soar.yamlPath));
        commit('SET_CONFIG', doc);
    }
}

export default {
    state,
    mutations,
    actions
}