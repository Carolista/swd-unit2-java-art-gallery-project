import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { InputErrorMessage, TextInput } from '../common/exports.js';
import PasswordInput from './PasswordInput.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import {
	setEmailInStorage,
	setTokenInStorage,
} from '../../services/storageService.js';
import {
	requestLogin,
	requestRegistration,
} from '../../services/authService.js';

const initialUser = { name: '', email: '', password: '', verifyPassword: '' };

const errorMessages = {
	nameRequired: 'Username is required.',
	emailRequired: 'Email is required.',
	passwordLength: 'Password must be at least 8 characters long.',
	passwordMismatch: 'Password must be identical.',
};

const RegisterPage = () => {
	const { setAuth } = useContext(AuthContext);

	const [user, setUser] = useState(initialUser);
	const [hasErrors, setHasErrors] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const navigate = useNavigate();

	const logInUser = async user => {
		try {
			let body = { email: user.email, password: user.password };
			let response = await requestLogin(body);
			if (response?.status === 200) {
				let token = response.data.token;
				setEmailInStorage(user.email);
				setTokenInStorage(token);
				setAuth({ token, email: user.email, isAuthenticated: true });
				navigate('/admin');
			}
		} catch (error) {
			console.error(error.message);
			// Would be better to give user feedback on page here
		}
	};

	const createNewUser = async newUser => {
		try {
			let body = {
				name: newUser.name,
				email: newUser.email,
				password: newUser.password,
			};
			let response = await requestRegistration(body);
			if (response?.status === 201) {
				logInUser(newUser);
			}
		} catch (error) {
			console.error(error);
			// Would be better to give user feedback on page here
		}
	};

	const handleChange = event => {
		let updatedUser = { ...user, [event.target.id]: event.target.value };
		setUser(updatedUser);
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (
			user.name === '' ||
			user.email === '' ||
			user.password.length < 8 ||
			user.password !== user.verifyPassword
		) {
			setSubmitting(false);
			setHasErrors(true);
		} else {
			setSubmitting(true);
			createNewUser(user);
		}
	};

	return (
		<main className='main-content'>
			<h1>Register New User</h1>

			<form onSubmit={handleSubmit}>
				<div className='container'>
					<div className='row'>
						<div className='form-item col-4'>
							<TextInput
								id='email'
								label='Email'
								value={user.email}
								handleChange={handleChange}
							/>
							<InputErrorMessage
								hasError={hasErrors && user.email === ''}
								msg={errorMessages['emailRequired']}
							/>
						</div>
						<div className='form-item col-4'>
							<TextInput
								id='name'
								label='Full Name'
								value={user.name}
								handleChange={handleChange}
							/>
							<InputErrorMessage
								hasError={hasErrors && user.name === ''}
								msg={errorMessages['nameRequired']}
							/>
						</div>
					</div>
				</div>
				<div className='container'>
					<div className='row'>
						<div className='form-item col-4'>
							<PasswordInput
								id='password'
								label='Password'
								value={user.password}
								handleChange={handleChange}
							/>
							<InputErrorMessage
								hasError={hasErrors && user.password.length < 8}
								msg={errorMessages['passwordLength']}
							/>
						</div>
						<div className='form-item col-4'>
							<PasswordInput
								id='verifyPassword'
								label='Verify Password'
								value={user.verifyPassword}
								handleChange={handleChange}
							/>
							<InputErrorMessage
								hasError={
									hasErrors &&
									user.password !== user.verifyPassword
								}
								msg={errorMessages['passwordMismatch']}
							/>
						</div>
					</div>
				</div>

				<button type='submit' disabled={submitting}>
					Register
				</button>
			</form>
			<p className='mt-5'>
				Already have an account? <Link to='/login'>Log in here.</Link>
			</p>
		</main>
	);
};

export default RegisterPage;
