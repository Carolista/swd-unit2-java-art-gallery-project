import { use, useEffect } from 'react';
import { useLocation } from 'react-router';
import useScreenWidth from '@hooks/useScreenWidth';
import { ModalContext } from '@context/ModalContext';
import { DynamicNavLink, Modal } from './exports';
import { IconButton } from '@components/input/exports';

const NavMenu = ({ links, nonLinks }) => {
	nonLinks = nonLinks || [];

	const { isOpen, handleOpenModal, handleCloseModal } = use(ModalContext);

	const screenWidth = useScreenWidth();

	const location = useLocation();

	useEffect(() => {
		if (isOpen) handleCloseModal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

	const linksJSX = links.map(link => {
		return (
			<DynamicNavLink
				key={link.id}
				to={link.to}
				handleClick={link.handleClick}>
				{link.label}
			</DynamicNavLink>
		);
	});
	const nonLinksJSX = nonLinks.map(nonLink => {
		return (
			<span
				key={nonLink.id}
				className='nav-link'
				onClick={nonLink.handleClick}>
				{nonLink.label}
			</span>
		);
	});

	const Menu = () => {
		return (
			<nav>
				{linksJSX}
				{nonLinks.length ? nonLinksJSX : ''}
			</nav>
		);
	};

	return (
		<>
			{screenWidth < 768 ? (
				<>
					<IconButton
						handleClick={handleOpenModal}
						ariaLabel='Open Nav Menu'>
						<i className='fa-solid fa-bars open-nav-menu-icon'></i>
					</IconButton>
					<Modal>
						<Menu />
					</Modal>
				</>
			) : (
				<Menu />
			)}
		</>
	);
};

export default NavMenu;
