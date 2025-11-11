const IconWithLabel = ({ id, classes, children }) => {
	// Warn developer if id is missing
	// TODO: A dependency like propTypes could be used instead
	if (!id) {
		throw new Error(`Icon needs an id!`);
	}

	return (
		<div id={`${id}-icon-container`} className='icon-with-label'>
			<i
				id={`${id}-icon`}
				className={`icon ${classes}`}
				aria-label={`${id} icon`}></i>
			{children}
		</div>
	);
};

export default IconWithLabel;
