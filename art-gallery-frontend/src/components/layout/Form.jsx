import { Button } from '@components/form-input/exports';

// TODO: Define input-fields and button-group CSS classes and test across all forms using this component

const Form = ({ buttonData, children }) => {
	const buttonsJSX = buttonData.map(button => {
		return (
			<Button
				id={button.id}
				key={button.id}
				label={button.label}
				type={button.type}
				handleClick={button.handleClick}
			/>
		);
	});
	return (
		<form>
			<div className='input-fields'>{children}</div>
			<div className='button-group'>{buttonsJSX}</div>
		</form>
	);
};

export default Form;
