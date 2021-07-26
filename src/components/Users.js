import React, { useEffect, useState } from 'react';
import { API } from '../api/api';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	table: {
		margin: theme.spacing(3),
		display: 'flex',
		alignItems: 'center',
	},
	header: {
		margin: theme.spacing(3, 0),
		textAlign: 'center',
		fontSize: '35px',
		color: '#002b80',
		textShadow: '.5px 1px #6699ff',
	},
}));

export const Users = ({ token }) => {
	const styles = useStyles();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		API.getUsers(token).then((data) => setUsers(data));
	}, [token]);

	const columns = [
		{ field: 'id', headerName: 'ID', width: 95 },
		{
			field: 'username',
			headerName: 'username',
			width: 150,
			editable: false,
		},
		{
			field: 'fullName',
			headerName: 'Full name',
			width: 180,
			editable: false,
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
		},
		{
			field: 'isActive',
			headerName: 'Active',
			type: 'boolean',
			width: 200,
			editable: true,
		},
		{
			field: 'lastLogin',
			headerName: 'Last login',
			type: 'string',
			width: 200,
			editable: false,
		},
		{
			field: 'isSuperUser',
			headerName: 'Super user',
			type: 'boolean',
			width: 200,
			editable: false,
		},
	];

	const rows = users?.map((u, index) => ({
		id: u.id,
		fullName: `${u.first_name} ${u.last_name}`,
		username: u.username,
		isActive: u.is_active,
		lastLogin: u.last_login
			? new Date(`${u.last_login}`).toLocaleString().slice(0, -3)
			: null,
		isSuperUser: u.is_superuser,
	}));

	return (
		<div>
			<Typography component='h1' variant='h3' className={styles.header}>
				Users list
			</Typography>
			<div className={styles.table}>
				{users && (
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						autoHeight
					/>
				)}
			</div>
		</div>
	);
};
