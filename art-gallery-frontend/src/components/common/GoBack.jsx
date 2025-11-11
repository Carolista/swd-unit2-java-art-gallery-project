import IconWithLabel from './IconWithLabel';

const GoBack = ({ text, handleClick }) => {
	return (
		<span className='link-like' onClick={handleClick}>
			<IconWithLabel
				id='go-back'
				classes='fa-solid fa-circle-arrow-left icon-space-right'>
				{text}
			</IconWithLabel>
		</span>
	);
};

export default GoBack;
