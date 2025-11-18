import { NavLink } from 'react-router';

const DynamicNavLink = ({ to, handleClick, children }) => {
	return (
		<NavLink
			to={to}
			onClick={handleClick}
			className={({ isActive }) =>
				isActive ? 'active-link' : 'nav-link'
			}>
			{children}
		</NavLink>
	);
};

export default DynamicNavLink;
