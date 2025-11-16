import Spacer from '@components/common/Spacer';
import { Main } from '@components/layout/exports';

const ErrorPage = ({ children }) => {
	return (
		<Main>
			<h1>ERROR</h1>
			<h2>Uh oh! Something didn't go quite right. </h2>
			{/* <Spacer marginY='20px' /> */}
			<div>{children}</div>
		</Main>
	);
};

export default ErrorPage;
