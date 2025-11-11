import Spacer from '@components/common/Spacer';
import { Main } from '@components/layout/exports';

const ErrorPage = ({ children }) => {
	return (
		<Main>
			<h1>ERROR</h1>
			<h3>Uh oh! Something didn't go quite right. </h3>
			<Spacer marginY='20px' />
			<div>{children}</div>
		</Main>
	);
};

export default ErrorPage;
