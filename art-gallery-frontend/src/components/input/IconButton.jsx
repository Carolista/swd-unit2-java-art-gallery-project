const IconButton = ({ id, ref, ariaLabel, handleClick, children }) => {
	const handleKeyDown = event => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	};

	return (
		<div
			id={`${id}-button`}
			className='icon-button'
			ref={ref || null}
			tabIndex='0'
			role='button'
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			aria-label={ariaLabel}>
			{children}
		</div>
	);
};

export default IconButton;
