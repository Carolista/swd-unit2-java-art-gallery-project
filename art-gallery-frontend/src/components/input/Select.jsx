const Select = ({ id, label, required, handleChange, children }) => {
	return (
		<>
			<label htmlFor={id}>{label}{required && '*'}</label>
			<select id={id} name={id} onChange={handleChange}>
                <option value=''>Please select one...</option>
				{children}
			</select>
		</>
	);
};

export default Select;
