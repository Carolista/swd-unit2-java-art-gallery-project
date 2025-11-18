const FormGroup = ({ id, classes, children }) => {
	return (
		<div id={`${id}-form-group`} className={`form-group ${classes}`}>
			{children}
		</div>
	);
};

export default FormGroup;
