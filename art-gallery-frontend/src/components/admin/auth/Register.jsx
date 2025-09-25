import { Link } from 'react-router';
import { InputErrorMessage, TextInput } from '../../common/_exports.js';
import PasswordInput from './PasswordInput';

const errorMessages = {
	usernameRequired: 'Username is required.',
	passwordLength: 'Password must be at least 8 characters long.',
	passwordMismatch: 'Password must be identical.',
};

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');

	const handleUsernameChange = event => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = event => {
		setPassword(event.target.value);
	};

	const handleVerifyPasswordChange = event => {
		setVerifyPassword(event.target.value);
	};

	const handleSubmit = event => {
		if (username === '' || password.length < 8 || password !== verifyPassword) {
			event.preventDefault();
			setHasErrors(true);
		} else {
			// DEMO TODO: POST to /register endpoint
			console.log('Validation passed and form submitted.');
            // TODO: Make sure user is also logged in
			// TODO: Reroute to home
		}
	};

	return (
		<main className="main-content">
			<h1>Register New User</h1>

			<form>
				<div className="container">
					<div className="row">
						<div className="form-item col-4">
							<TextInput
								id="username"
								label="Username"
								value={username}
								setValue={setUsername}
								handleChange={handleUsernameChange}
							/>
							<InputErrorMessage
								hasError={hasErrors && username === ''}
								msg={errorMessages[usernameRequired]}
							/>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="form-item col-4">
							<PasswordInput
								id="password"
								label="Password"
								value={password}
								handleChange={handlePasswordChange}
							/>
							<InputErrorMessage
								hasError={hasErrors && password.length < 8}
								msg={errorMessages[passwordLength]}
							/>
						</div>
						<div className="form-item col-4">
							<PasswordInput
								id="verifyPassword"
								label="Verify Password"
								value={verifyPassword}
								handleChange={handleVerifyPasswordChange}
							/>
							<InputErrorMessage
								hasError={hasErrors && password !== verifyPassword}
								msg={errorMessages[passwordMismatch]}
							/>
						</div>
					</div>
				</div>

				<button type="submit">Register</button>
			</form>
			<p className="mt-5">
				Already have an account? <Link to="/login">Log in here.</Link>
			</p>
		</main>
	);
};

export default Register;
