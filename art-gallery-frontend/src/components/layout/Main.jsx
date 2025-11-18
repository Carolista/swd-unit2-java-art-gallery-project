import { FlexImage } from './exports';

const Main = ({ imageId, children }) => {
	if (imageId) {
		return (
			<main id='main' tabIndex='-1'>
				<div className='main-content'>{children}</div>
				<FlexImage id={imageId} />
			</main>
		);
	} else {
		return <main className='main-content'>{children}</main>;
	}
};

export default Main;
