import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://emphasoft-test-assignment.herokuapp.com/',
});

export const API = {
	async login({ username, password }) {
		const { data } = await instance.post('/api-token-auth/', {
			username,
			password,
		});
		console.log('auth success');
		return data.token;
	},
	logout() {
		return instance.delete('/api-token-auth/');
	},
	async getUsers(token) {
		const { data } = await instance.get('/api/v1/users/', {
			headers: {
				Authorization: `Token: ${token}`,
			},
		});
		console.log(data);
		return data;
	},
};
