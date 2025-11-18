import { use, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import { ModalContext } from '../../context/ModalContext';
import { IconButton } from '@components/input/exports';

const Modal = ({ title, children }) => {
	const modalRef = useRef(null);
	const buttonRef = useRef();

	useEffect(() => {
		buttonRef.current.focus();
	}, []);

	const { isOpen, handleCloseModal } = use(ModalContext);

	useEffect(() => {
		if (isOpen) {
			modalRef.current?.showModal();
		} else {
			modalRef.current?.close();
		}
	}, [isOpen]);

	return (
		<dialog ref={modalRef} onCancel={handleCloseModal} closedby='any'>
			<div className='modal'>
				<div className='modal-top-bar'>
					{title && <div>{title}</div>}
					<IconButton
						id='close-modal'
						ref={buttonRef}
						ariaLabel='Close Nav Menu'
						handleClick={handleCloseModal}>
						<i className='fa-solid fa-xmark close-modal-icon'></i>
					</IconButton>
				</div>
				{children}
			</div>
		</dialog>
	);
};

// Modal.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	children: PropTypes.node.isRequired,
// };

export default Modal;
