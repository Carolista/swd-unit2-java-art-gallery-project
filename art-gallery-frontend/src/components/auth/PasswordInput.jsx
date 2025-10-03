import { useState } from 'react';

const PasswordInput = ({ id, label, value, handleChange }) => {
	const [showInput, setShowInput] = useState(false);

	const toggleShowPassword = () => {
		setShowInput(!showInput);
	};

	return (
		<>
			<label htmlFor={id}>{label}</label>
			<div className="input-with-icon">
				<input
					id={id}
					className="password-input"
					type={showInput ? 'text' : 'password'}
					value={value}
					onChange={handleChange}
				/>
				{showInput ? (
					<i
						className="fa-solid fa-eye"
						title="Click to hide password"
						onClick={toggleShowPassword}></i>
				) : (
					<i
						className="fa-solid fa-eye-slash"
						title="Click to show password"
						onClick={toggleShowPassword}></i>
				)}
			</div>
		</>
	);
};

export default PasswordInput;
