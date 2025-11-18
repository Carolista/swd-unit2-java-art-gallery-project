const Footer = () => {
	let thisYear = new Date().getFullYear();

	return (
		<footer>
			<div>&copy; {thisYear} Midtown Art Gallery</div>
		</footer>
	);
};

export default Footer;
