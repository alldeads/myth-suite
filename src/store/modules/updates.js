import axios from 'axios';

export const state = {
    updates: []
}
 
export const mutations = {
    SET_ALL_UPDATES(state, payload) {
        state.updates = payload;
    },
    ADD_UPDATE(state, payload) {
        state.update.push(payload);
    }
}

export const actions = {
    all({ commit }) {
        return axios.get(`${process.env.VUE_APP_API_BASE_URI}updates`)
        .then((res) => {
            commit('SET_ALL_UPDATES', res.data);
            return res.data;
        });
    },
    store(_, update) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URI}updates`, update)
        .then((res) => {
            alert('Success');
            return res.data;
        })
        .catch((res) => {
            const errors = res.response.data;
            throw errors;
        });
    },
    get(_, clientId) {
        return axios.get(`${process.env.VUE_APP_API_BASE_URI}updates/${clientId}`)
        .then((res) => {
            return res.data.data;
        });
    }
}