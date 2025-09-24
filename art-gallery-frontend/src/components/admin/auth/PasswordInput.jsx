import InputErrorMessage from '../../common/InputErrorMsg';

const PasswordInput = ({ id, label, value, handleChange }) => {
	[showInput, setShowInput] = useState(false);

	const toggleShowPassword = () => {
		setShowInput(!showInput);
	};

	// TODO: Get icons for show and hide
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={showInput ? 'text' : 'password'}
				value={value}
				onChange={handleChange}
			/>
			<button onClick={toggleShowPassword}>Show</button>
		</>
	);
};

export default PasswordInput;
