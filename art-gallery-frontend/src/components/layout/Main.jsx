const Main = ({ imageData, children }) => {
	if (imageData) {
		return (
			<main>
				<div className='main-content'>{children}</div>
				<img src={imageData.src} alt={imageData.alt} width='100%' />
			</main>
		);
	} else {
		return <main className='main-content'>{children}</main>;
	}
};

export default Main;
