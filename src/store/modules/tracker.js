import axios from 'axios';

export const state = {
    trackers: []
}
 
export const mutations = {
    SET_ALL_TRACKERS(state, payload) {
        state.trackers = payload;
    },
    ADD_TRACKER(state, payload) {
        if ( payload.completed === null ) {
            state.trackers.push(payload);
        } else {
            state.trackers = state.trackers.filter(x => x.model !== payload.model && x.model_id !== payload.model )
        }
    },
    UPDATE_TRACKER(state, payload, index) {
        if ( state.trackers[index] !== null ) {
            state.trackers.splice(index, 1, payload)
        }
    }
}

export const getters = {
    fetchTimeTracker() {
        return state.trackers
    }
}

export const actions = {
    all({ commit }) {
        return axios.get(`${process.env.VUE_APP_API_BASE_URI}trackers`)
        .then((res) => {
            commit('SET_ALL_TRACKERS', res.data);
            return res.data;
        });
    },
    store({ commit }, tracker) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URI}trackers`, tracker)
        .then((res) => {
            alert('Success');
            commit('ADD_TRACKER', res.data)
            return res.data;
        })
        .catch((res) => {
            const errors = res.response;
            throw errors;
        });
    },
    me(_, tracker) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URI}trackers/u/user`, tracker)
        .then((res) => {
            return res.data;
        })
        .catch((res) => {
            const errors = res.response.data;
            throw errors;
        });
    }
}