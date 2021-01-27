import axios from 'axios';

export const state = {
    users: []
}
 
export const mutations = {
    SET_ALL_USERS(state, payload) {
        state.users = payload;
    },
    ADD_USER(state, payload) {
        state.users.push(payload);
    }
}

export const actions = {
    all({ commit }) {
        return axios.get(`${process.env.VUE_APP_API_BASE_URI}user`)
        .then((res) => {
            commit('SET_ALL_USERS', res.data);
            return res.data;
        });
    },
    clients() {
        return axios.get(`${process.env.VUE_APP_API_BASE_URI}user/r/clients`)
        .then((res) => {
            return res.data;
        });
    },
    members() {
        return axios.get(`${process.env.VUE_APP_API_BASE_URI}user/r/members`)
        .then((res) => {
            return res.data;
        });
    },
    editUser(_, user) {
        return axios.put(`${process.env.VUE_APP_API_BASE_URI}user/${user.id}`, user)
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
    store({ commit }, user) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URI}user`, user)
        .then((res) => {
            alert('Success');
            commit('ADD_USER', res.data);
            return res.data;
        })
        .catch((res) => {
            const errors = res.response.data;
            alert('Oops! There is something wrong');
            throw errors;
        });
    },
    get(_, userId) {
        return axios.get(`${process.env.VUE_APP_API_BASE_URI}user/${userId}`)
        .then((res) => {
            return res.data;
        });
    },
    assign(_, user) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URI}user/assign`, user)
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
}