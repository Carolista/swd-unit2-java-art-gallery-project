import { useNavigate } from 'react-router';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '@context/AuthContext';
import {
	FormItem,
	Input,
	InputErrorMessage,
} from '@components/form-input/exports';
import { requestLogin } from '@services/authService';
import {
	getEmailFromStorage,
	setEmailInStorage,
	setTokenInStorage,
} from '@services/storageService';
import { FormWithButtons, Main } from '@components/layout/exports';

const errorMessages = {
	emailRequired: 'Email is required.',
	passwordRequired: 'Password is required.',
};

// TODO: Put form in a center/center box that resembles a modal (maybe a drop shadow, using Card?)

const LoginPage = () => {
	const { setAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const [email, setEmail] = useState(getEmailFromStorage() || '');
	const [password, setPassword] = useState('');
	const [hasErrors, setHasErrors] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

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
			// TODO: Give user feedback on success or failure
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
		// TODO: Use DTO class with isValid here?
		if (email === '' || password === '') {
			setSubmitting(false);
			setHasErrors(true);
		} else {
			setSubmitting(true);
			logInUser();
		}
	};

	const buttonData = [
		{
			id: 'login',
			type: 'submit',
			label: 'Log In',
			handleClick: handleSubmit,
			shouldDisable: submitting,
		},
	];

	return (
		<Main>
			<h1>Log In</h1>
			<FormWithButtons id='login' buttonData={buttonData}>
				<FormItem id='login-email-form-item'>
					<Input
						id='email'
						label='Email'
						type='text'
						value={email}
						ref={inputRef}
						required={true}
						handleChange={handleEmailChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && email === ''}
						msg={errorMessages['emailRequired']}
					/>
				</FormItem>

				<FormItem id='login-password-form-item'>
					<Input
						id='password'
						label='Password'
						type='password'
						value={password}
						required={true}
						handleChange={handlePasswordChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && password === ''}
						msg={errorMessages['passwordRequired']}
					/>
				</FormItem>
			</FormWithButtons>
		</Main>
	);
};

export default LoginPage;
