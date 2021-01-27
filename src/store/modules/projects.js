import axios from 'axios';

export const state = {
  projects: []
}
 
export const mutations = {
  SET_ALL_PROJECTS(state, payload) {
    state.projects = payload;
  },
  ADD_PROJECT(state, payload) {
    state.projects.push(payload);
  }
}

export const actions = {
  all({ commit }) {
    return axios.get(`${process.env.VUE_APP_API_BASE_URI}projects`)
      .then((res) => {
        commit('SET_ALL_PROJECTS', res.data);
        return res.data;
      });
  },
  store({ commit }, project) {
    return axios.post(`${process.env.VUE_APP_API_BASE_URI}projects`, project)
    .then((res) => {
      alert('Success');
      commit('ADD_PROJECT', res.data);
      return res.data;
    })
    .catch((res) => {
      const errors = res.response.data;
      alert('Oops! There is something wrong');
      throw errors;
    });
  },
  get(_, projectId) {
    return axios.get(`${process.env.VUE_APP_API_BASE_URI}projects/${projectId}`)
      .then((res) => {
        return res.data.data;
      });
  },
  assignUser(_, project) {
    return axios.post(`${process.env.VUE_APP_API_BASE_URI}projects/assign/user`, project)
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
  editProject(_, project) {
    return axios.put(`${process.env.VUE_APP_API_BASE_URI}projects/${project.id}`, project)
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