import React from 'react';
import { API } from '../api/api';

export const Users = ({ token }) => {
	const users = API.getUsers(token);
	console.log(users);

	return <div>Hello, you can edit users</div>;
};
