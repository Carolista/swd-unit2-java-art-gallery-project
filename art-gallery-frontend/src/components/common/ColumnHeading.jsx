const ColumnHeading = ({ label, property, current, setCurrent }) => {
	return (
		<span
			className={current === property ? 'sorted-by' : 'sortable'}
			onClick={() => setCurrent(property)}>
			{label}{' '}
			{current !== property && (
				<i className='fa-solid fa-arrow-down-a-z fa-lg'></i>
			)}
		</span>
	);
};

export default ColumnHeading;
