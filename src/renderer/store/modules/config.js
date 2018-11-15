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
    },
    'test-dsn': {
        addr: '',
        schema: '',
        user: '',
        password: '',
        disable: false
    },
    // 是否允许测试环境与线上环境配置相同
    'allow-online-as-test': false,
    // 是否清理测试时产生的临时文件
    'drop-test-temporary': true,
}

const mutations = {
    SET_ONLINE_DSN_ADDR(state, value) { state['online-dsn'].addr = value; },
    SET_ONLINE_DSN_SCHEMA(state, value) { state['online-dsn'].schema = value; },
    SET_ONLINE_DSN_USER(state, value) { state['online-dsn'].user = value; },
    SET_ONLINE_DSN_PASSWORD(state, value) { state['online-dsn'].password = value; },
    SET_ONLINE_DSN_DISABLE(state, value) { state['online-dsn'].disable = value; },

    SET_TEST_DSN_ADDR(state, value) { state['test-dsn'].addr = value; },
    SET_TEST_DSN_SCHEMA(state, value) { state['test-dsn'].schema = value; },
    SET_TEST_DSN_USER(state, value) { state['test-dsn'].user = value; },
    SET_TEST_DSN_PASSWORD(state, value) { state['test-dsn'].password = value; },
    SET_TEST_DSN_DISABLE(state, value) { state['test-dsn'].disable = value; },

    SET_ALLOW_ONLINE_AS_TEST(state, value) { state['allow-online-as-test'] = value; },
    SET_DROP_TEST_TEMPORARY(state, value) { state['drop-test-temporary'] = value; },

    SET_CONFIG(state, value) { Object.assign(state, value); },
}

const actions = {
    setOnlineDsnAddr({ commit }, value) { commit('SET_ONLINE_DSN_ADDR', value); },
    setOnlineDsnSchema({ commit }, value) { commit('SET_ONLINE_DSN_SCHEMA', value); },
    setOnlineDsnUser({ commit }, value) { commit('SET_ONLINE_DSN_USER', value); },
    setOnlineDsnPassword({ commit }, value) { commit('SET_ONLINE_DSN_PASSWORD', value); },
    setOnlineDsnDisable({ commit }, value) { commit('SET_ONLINE_DSN_DISABLE', value); },

    setTestDsnAddr({ commit }, value) { commit('SET_TEST_DSN_ADDR', value); },
    setTestDsnSchema({ commit }, value) { commit('SET_TEST_DSN_SCHEMA', value); },
    setTestDsnUser({ commit }, value) { commit('SET_TEST_DSN_USER', value); },
    setTestDsnPassword({ commit }, value) { commit('SET_TEST_DSN_PASSWORD', value); },
    setTestDsnDisable({ commit }, value) { commit('SET_TEST_DSN_DISABLE', value); },

    setAllowOnlineAsTest({ commit }, value) { commit('SET_ALLOW_ONLINE_AS_TEST', value); },
    setDropTestTemporary({ commit }, value) { commit('SET_DROP_TEST_TEMPORARY', value); },

    writeConfig({ commit, state }) {
        debugger;
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