const Select = ({ id, label, children, handleChange }) => {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<select id={id} name={id} onChange={handleChange}>
				{children}
			</select>
		</>
	);
};

export default Select;
