const FormItem = ({ id, classes, children }) => {
	return (
		<div id={`${id}-form-item`} className={`form-item ${classes}`}>
			{children}
		</div>
	);
};

export default FormItem;
