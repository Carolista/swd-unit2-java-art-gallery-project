const TextArea = ({ id, label, value, handleChange }) => {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<textarea id={id} value={value} onChange={handleChange}></textarea>
		</>
	);
};

export default TextArea;
