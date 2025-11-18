const Spacer = ({ marginX, marginY, character }) => {
	return (
		<div style={{ margin: `${marginY || 0} ${marginX || 0}` }}>
			{character || ''}
		</div>
	);
};

export default Spacer;
