import axios from 'axios';

export const state = {
    status: []
}
 
export const mutations = {
    SET_ALL_STATUS(state, payload) {
        state.updates = payload;
    },
    ADD_STATUS(state, payload) {
        state.update.push(payload);
    }
}

export const actions = {
    all({ commit }) {
        return axios.get(`${process.env.VUE_APP_API_BASE_URI}statuses`)
        .then((res) => {
            commit('SET_ALL_STATUS', res.data);
            return res.data;
        });
    },
    store(_, update) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URI}statuses`, update)
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
        return axios.get(`${process.env.VUE_APP_API_BASE_URI}statuses/${clientId}`)
        .then((res) => {
            return res.data.data;
        });
    }
}