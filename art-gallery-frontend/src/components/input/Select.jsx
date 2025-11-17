const Select = ({ id, label, required, handleChange, children }) => {
	return (
		<>
			<label htmlFor={id}>{label}{required && '*'}</label>
			<select id={id} name={id} onChange={handleChange}>
				{children}
			</select>
		</>
	);
};

export default Select;
