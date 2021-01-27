import axios from 'axios';

export const state = {
    clients: []
}
 
export const mutations = {
    SET_ALL_CLIENTS(state, payload) {
        state.clients = payload;
    },
    ADD_CLIENT(state, payload) {
        state.clients.push(payload);
    }
}

export const actions = {
    all({ commit }) {
        return axios.get(`${process.env.VUE_APP_API_BASE_URI}clients`)
        .then((res) => {
            commit('SET_ALL_CLIENTS', res.data);
            return res.data;
        });
    },
    store({ commit }, client) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URI}clients`, client)
        .then((res) => {
            commit('ADD_CLIENT', res.data);
            alert('Success');
            return res.data;
        })
        .catch((res) => {
            const errors = res.response.data;
            alert('Error');
            throw errors;
        });
    },
    get(_, clientId) {
        return axios.get(`${process.env.VUE_APP_API_BASE_URI}clients/${clientId}`)
        .then((res) => {
            return res.data.data;
        });
    },
    assign(_, client) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URI}clients/assign`, client)
        .then((res) => {
            alert('Success');
            return res.response;
        })
        .catch((res) => {
            const errors = res.response.data;
            alert('Oops! There is something wrong');
            throw errors;
      });
    },
    saveClient(_, client) {
        return axios.put(`${process.env.VUE_APP_API_BASE_URI}clients/${client.id}`, client)
        .then((res) => {
            alert('Success');
            return res.data;
        })
        .catch((res) => {
            const errors = res.response.data;
            alert('Oops! There is something wrong');
            throw errors;
        });
    },
    removeClient(_, client) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URI}clients/remove/assign`, client)
        .then((res) => {
            alert('Success');
            return res.data;
        })
        .catch((res) => {
            const errors = res.response.data;
            alert('Oops! There is something wrong');
            throw errors;
        });
    }
}