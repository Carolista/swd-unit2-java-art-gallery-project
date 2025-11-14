import ColumnHeading from './ColumnHeading';

const SortIcon = () => <i className='fa-solid fa-arrow-down-a-z fa-lg'></i>;

const SortableColumnHeading = ({
	id,
	classes,
	property,
	current,
	setCurrent,
	children,
}) => {
	const alignRight = classes?.includes('align-right') || false;

	const isCurrent = current === property;

	return (
		<ColumnHeading
			id={id}
			classes={`${classes} ${isCurrent ? 'sorted-by' : 'sortable'}`}
			handleClick={() => setCurrent(property)}>
			{alignRight && !isCurrent && <SortIcon />} {children}{' '}
			{!alignRight && !isCurrent && <SortIcon />}
		</ColumnHeading>
	);
};

export default SortableColumnHeading;
