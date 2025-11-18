const TextArea = ({ id, label, value, required, handleChange }) => {
	return (
		<>
			<label htmlFor={id}>
				{label}
				{required && '*'}
			</label>
			<textarea id={id} value={value} onChange={handleChange}></textarea>
		</>
	);
};

export default TextArea;
