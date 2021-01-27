import axios from 'axios';

export const state = {
	tickets: []
}
 
export const mutations = {
	SET_ALL_TICKETS(state, payload) {
		state.updates = payload;
	},
	ADD_TICKET(state, payload) {
		state.update.push(payload);
	}
}

export const actions = {
	all({ commit }) {
		return axios.get(`${process.env.VUE_APP_API_BASE_URI}tickets`)
		.then((res) => {
			commit('SET_ALL_TICKETS', res.data);
			return res.data;
		});
	},
	store(_, ticket) {
		return axios.post(`${process.env.VUE_APP_API_BASE_URI}tickets`, ticket)
		.then((res) => {
			alert('Success');
			return res.data;
		})
		.catch((res) => {
			const errors = res.response.data;
			throw errors;
		});
	},
	get(_, ticketId) {
		return axios.get(`${process.env.VUE_APP_API_BASE_URI}tickets/${ticketId}`)
		.then((res) => {
			return res.data.data;
		});
	},
	assignUser(_, ticket) {
		return axios.post(`${process.env.VUE_APP_API_BASE_URI}tickets/assign/user`, ticket)
		.then((res) => {
			alert('Success');
			return res.data.data;
		})
		.catch((res) => {
			const errors = res.response.data;
			throw errors;
		});
	},
	status(_, ticket) {
		return axios.post(`${process.env.VUE_APP_API_BASE_URI}tickets/status`, ticket)
		.then((res) => {
			alert('Success');
			return res.data.data;
		})
		.catch((res) => {
			const errors = res.response.data;
			throw errors;
		});
	}
}