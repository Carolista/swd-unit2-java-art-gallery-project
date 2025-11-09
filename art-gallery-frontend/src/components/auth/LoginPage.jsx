import { Link, useNavigate } from 'react-router';
import { useContext, useState } from 'react';
import InputErrorMessage from '../common/InputErrorMsg';
import TextInput from '../common/TextInput';
import PasswordInput from './PasswordInput';
import { AuthContext } from '../../context/AuthContext';
import { requestLogin } from '../../services/authService';
import {
	getEmailFromStorage,
	setEmailInStorage,
	setTokenInStorage,
} from '../../services/storageService';

const errorMessages = {
	emailRequired: 'Email is required.',
	passwordRequired: 'Password is required.',
};

const LoginPage = () => {
	const { setAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const [email, setEmail] = useState(getEmailFromStorage() || '');
	const [password, setPassword] = useState('');
	const [hasErrors, setHasErrors] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const logInUser = async () => {
		try {
			let response = await requestLogin({ email, password });
			if (response?.status === 200) {
				let token = response.data.token;
				setEmailInStorage(email);
				setTokenInStorage(token);
				setAuth({ token, email, isAuthenticated: true });
				navigate('/admin');
			}
		} catch (error) {
			console.error(error.message);
			// Would be better to give user feedback on page here
		}
	};

	const handleEmailChange = event => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = event => {
		setPassword(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (email === '' || password === '') {
			setSubmitting(false);
			setHasErrors(true);
		} else {
			setSubmitting(true);
			logInUser();
		}
	};

	return (
		<main className='main-content'>
			<h1>Log In</h1>

			<form onSubmit={handleSubmit}>
				<div className='container'>
					<div className='row'>
						<div className='form-item col-4'>
							<TextInput
								id='email'
								label='Email'
								value={email}
								setValue={setEmail}
								handleChange={handleEmailChange}
							/>
							<InputErrorMessage
								hasError={hasErrors && email === ''}
								msg={errorMessages['emailRequired']}
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
								value={password}
								handleChange={handlePasswordChange}
							/>
							<InputErrorMessage
								hasError={hasErrors && password === ''}
								msg={errorMessages['passwordRequired']}
							/>
						</div>
					</div>
				</div>

				<button type='submit' disabled={submitting}>
					Log In
				</button>
			</form>
			<p className='mt-5'>
				Don't have an account?{' '}
				<Link to='/register'>Register here.</Link>
			</p>
		</main>
	);
};

export default LoginPage;
