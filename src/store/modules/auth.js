import axios from 'axios';

export const state = {
    currentUser: localStorage.getItem('authUser'),
    token: localStorage.getItem('token'),
}
 
export const mutations = {
    SET_CURRENT_USER(state, payload) {
        state.currentUser = payload
        saveState('auth.currentUser', payload)
    },
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.currentUser
    },
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // eslint-disable-next-line no-unused-vars
    init({ state, dispatch }) {
        dispatch('validate')
    },

    // Logs in the current user.
    logIn({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')
      
        return axios
        .post(`${process.env.VUE_APP_API_BASE_URI}auth/login`, { email, password })
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            return axios.get(`${process.env.VUE_APP_API_BASE_URI}auth/me`)
            .then((res) => {
                commit('SET_CURRENT_USER', res.data);
                localStorage.setItem('authUser', res.data);
                return res.data;
            });
        })
        .catch((res) => {
            const errors = res.response.data;
            throw errors;
        });
    },

    me() {
        return axios.get(`${process.env.VUE_APP_API_BASE_URI}auth/me`)
        .then((res) => {
            return res.data;
        })
        .catch((res) => {
            const errors = res.response.data;
            throw errors;
        });
    },

    // Logs out the current user.
    logOut({ commit }) {
        localStorage.removeItem('authUser')
        commit('SET_CURRENT_USER', null)
    },

    // // register the user
    // register({ commit, dispatch, getters }, { email, password } = {}) {
    //     if (getters.loggedIn) return dispatch('validate')

    //     return getFirebaseBackend().registerUser(email, password).then((response) => {
    //         const user = response
    //         commit('SET_CURRENT_USER', user)
    //         return user
    //     });
    // },

    // // register the user
    // // eslint-disable-next-line no-unused-vars
    // resetPassword({ commit, dispatch, getters }, { email } = {}) {
    //     if (getters.loggedIn) return dispatch('validate')

    //     return getFirebaseBackend().forgetPassword(email).then((response) => {
    //         const message = response.data
    //         return message
    //     });
    // },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    // eslint-disable-next-line no-unused-vars
    validate({ commit, state }) {
        if (!state.currentUser) return Promise.resolve(null)

        return axios.get(`${process.env.VUE_APP_API_BASE_URI}auth/me`)
        .then((res) => {
            commit('SET_CURRENT_USER', res.data)
            return res.data;
        })
        .catch((res) => {
            localStorage.removeItem('authUser')
            commit('SET_CURRENT_USER', null)
            return Promise.reject(res);
        });
    },
}

// ===
// Private helpers
// ===

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}
