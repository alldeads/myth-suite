import axios from 'axios';

export const state = {
	jobs: []
}

export const mutations = {
	SET_ALL_JOBS(state, payload) {
		state.jobs = payload;
	},
	ADD_JOB(state, payload) {
		state.jobs.push(payload);
	}
}

export const actions = {
	all({ commit }) {
		return axios.get(`${process.env.VUE_APP_API_BASE_URI}jobs`)
		.then((res) => {
			commit('SET_ALL_JOBS', res.data);
			return res.data;
		});
	},
	store({ commit }, job) {
		return axios.post(`${process.env.VUE_APP_API_BASE_URI}jobs`, job)
		.then((res) => {
			alert('Success');
			commit('ADD_JOB', res.data);
			return res.data;
		})
		.catch((res) => {
			const errors = res.response.data;
			alert('Oops! There is something wrong');
			throw errors;
		});
	},
	get(_, jobId) {
		return axios.get(`${process.env.VUE_APP_API_BASE_URI}jobs/${jobId}`)
			.then((res) => {
			return res.data.data;
		});
	},
	assignClient(_, job) {
		return axios.post(`${process.env.VUE_APP_API_BASE_URI}jobs/assign/client`, job)
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
	assignUser(_, project) {
		return axios.post(`${process.env.VUE_APP_API_BASE_URI}jobs/assign/user`, project)
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
	editJob(_, job) {
		return axios.put(`${process.env.VUE_APP_API_BASE_URI}jobs/${job.id}`, job)
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