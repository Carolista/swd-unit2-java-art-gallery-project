const DataNotFound = ({ children }) => {
	return (
		<main>
			<h1>ERROR</h1>
			<h3>Uh oh! Something didn't go quite right. </h3>
			<div>{children}</div>
		</main>
	);
};

export default DataNotFound;
