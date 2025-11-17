import { useState } from 'react';

const Input = ({ id, label, type, value, ref, required, handleChange }) => {
	const [showInput, setShowInput] = useState(false);

	const toggleShowPassword = () => {
		setShowInput(!showInput);
	};

	return (
		<>
			<label htmlFor={id}>
				{label}
				{required && '*'}
			</label>
			{type === 'password' ? (
				<div className='input-with-icon'>
					<input
						id={id}
						type={showInput ? 'text' : 'password'}
						value={value}
						ref={ref}
						onChange={handleChange}
					/>
					{showInput ? (
						<i
							className='fa-solid fa-eye'
							title='Click to hide password'
							onClick={toggleShowPassword}></i>
					) : (
						<i
							className='fa-solid fa-eye-slash'
							title='Click to show password'
							onClick={toggleShowPassword}></i>
					)}
				</div>
			) : (
				<input
					id={id}
					type={type || 'text'}
					value={value}
					ref={ref}
					onChange={handleChange}
				/>
			)}
		</>
	);
};

export default Input;
