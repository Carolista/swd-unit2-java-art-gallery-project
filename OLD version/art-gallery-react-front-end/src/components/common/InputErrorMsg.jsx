const InputErrorMessage = ({ hasError, msg }) => {
	return <>{hasError && <p className="error">{msg}</p>}</>;
};

export default InputErrorMessage;
