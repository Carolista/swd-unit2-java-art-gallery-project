import { Button } from '@components/input/exports';

const FormWithButtons = ({ id, buttonData, children }) => {
	const buttonsJSX = buttonData.map(button => {
		return (
			<Button
				id={button.id}
				key={button.id}
				label={button.label}
				type={button.type}
				handleClick={button.handleClick}
				shouldDisable={button.shouldDisable}
			/>
		);
	});
	return (
		<form id={`${id}-form`}>
			<div id={`${id}-form-inputs`}>{children}</div>
			<div className='button-group'>{buttonsJSX}</div>
		</form>
	);
};

export default FormWithButtons;
