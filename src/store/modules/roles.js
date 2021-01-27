import axios from 'axios';

export const state = {
  roles: []
}
 
export const mutations = {
  SET_ALL_ROLES(state, payload) {
    state.users = payload;
  },
  ADD_ROLE(state, payload) {
    state.users.push(payload);
  }
}

export const actions = {
  all({ commit }) {
    return axios.get(`${process.env.VUE_APP_API_BASE_URI}roles`)
      .then((res) => {
        commit('SET_ALL_ROLES', res.data);
        return res.data;
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
        return res.data.data;
      });
  }
}