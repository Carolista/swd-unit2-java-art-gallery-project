const TextInput = ({ id, label, value, handleChange }) => {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input id={id} type="text" value={value} onChange={handleChange} />
		</>
	);
};

export default TextInput;
