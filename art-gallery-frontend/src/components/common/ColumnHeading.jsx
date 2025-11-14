const ColumnHeading = ({ id, classes, children, handleClick }) => {
	return (
		<th id={`${id}-column`} className={classes} onClick={handleClick}>
			{children}
		</th>
	);
};

export default ColumnHeading;
