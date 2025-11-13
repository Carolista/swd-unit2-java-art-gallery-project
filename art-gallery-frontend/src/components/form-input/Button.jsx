const Button = ({ id, type, label, classes, handleClick, shouldDisable }) => {
	return (
		<button
			id={`${id}-button`}
			type={type}
			onClick={handleClick}
			className={classes}
            disabled={shouldDisable || false}>
			{label}
		</button>
	);
};

export default Button;
