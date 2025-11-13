import Spacer from '@components/common/Spacer';
import { Link } from 'react-router';

const NavMenu = ({ links, nonLinks }) => {
	nonLinks = nonLinks || [];

	const linksJSX = links.map(link => {
		return (
			<Link
				key={link.id}
				className='link'
				to={link.to}
				onClick={link.handleClick}>
				{link.label}
			</Link>
		);
	});
	const nonLinksJSX = nonLinks.map(nonLink => {
		return (
			<span
				key={nonLink.id}
				className='link'
				onClick={nonLink.handleClick}>
				{nonLink.label}
			</span>
		);
	});

	return (
		<nav className='nav-menu'>
			{linksJSX}
			{nonLinks.length && (
				<>
					<Spacer character='|' />
					{nonLinksJSX}
				</>
			)}
		</nav>
	);
};

export default NavMenu;
