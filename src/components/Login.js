import { Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { API } from '../api/api';
import { Form } from './Form';
import { Input } from './Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
	username: yup
		.string()
		.required('Username is a required field')
		.matches(
			/^[\w.@+-]+$/,
			'Username can contains letters, digits and @/./+/-/_ only'
		)
		.min(1, 'Username should be 150 characters or fewer')
		.max(150, 'Username should be 150 characters or fewer'),
	password: yup
		.string()
		.required('Password is a required field')
		.matches(
			/^(?=.*[A-Z])(?=.*\d).{8,}$/,
			'Password must contain a capital letter and a number '
		)
		.min(8, 'Password must be at least 8 characters long')
		.max(128, 'Password should be 150 characters or fewer'),
});

const useStyles = makeStyles((theme) => ({
	header: {
		margin: theme.spacing(3, 0),
		textAlign: 'center',
		fontSize: '35px',
		color: '#002b80',
		textShadow: '.5px 1px #6699ff',
	},
	root: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	button: {
		margin: theme.spacing(2.5, 0),
	},
}));
export const Login = ({ setToken }) => {
	const styles = useStyles();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		const token = await API.login(data);
		setToken(token);
	};

	return (
		<Container maxWidth='xs' className={styles.root}>
			<Typography component='h1' variant='h3' className={styles.header}>
				Login
			</Typography>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('username')}
					id='username'
					type='text'
					label='Username'
					name='username'
					error={!!errors?.username}
					helperText={errors?.username?.message}
				/>
				<Input
					{...register('password')}
					id='password'
					type='password'
					label='Password'
					name='password'
					error={!!errors?.password}
					helperText={errors?.password?.message}
				/>
				<Button
					className={styles.button}
					type='submit'
					fullWidth
					variant='contained'
					color='primary'
				>
					Login
				</Button>
			</Form>
		</Container>
	);
};
