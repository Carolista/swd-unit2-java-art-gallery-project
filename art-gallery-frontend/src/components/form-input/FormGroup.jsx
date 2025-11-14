const FormGroup = ({ classes, children }) => {
	return <div className={`form-group ${classes}`}>{children}</div>;
};

export default FormGroup;