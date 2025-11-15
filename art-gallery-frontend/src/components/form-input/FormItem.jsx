const FormItem = ({ id, classes, children }) => {
	return <div id={id} className={`form-item ${classes}`}>{children}</div>;
};

export default FormItem;
