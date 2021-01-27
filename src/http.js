import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use((config) => {
	config.headers['X-Requested-With'] = 'XMLHttpRequest';

	if (localStorage.getItem('token')) {
		config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	}

	return config;
}, err => Promise.reject(err));

axios.interceptors.response.use((response) => {
	if (response.headers.authorization) {
		const match = response.headers.authorization.match(/Bearer (.+)/);

		if (match) {
			localStorage.setItem('token', match[1]);
		}
	}

	return response;
}, (err) => {
  // const errorResponseData = err.response.data;

	if (err.response.status == 403) {
		return this.$router.push({ name: 'loginMain' });
	}

	return Promise.reject(err);
});

window.axios = axios;

export default axios;
