import { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		if (!isOpen) setIsOpen(true);
	};

	const handleCloseModal = () => {
		if (isOpen) setIsOpen(false);
	};

	return (
		<ModalContext.Provider value={{ isOpen, handleOpenModal, handleCloseModal }}>{children}</ModalContext.Provider>
	);
};
