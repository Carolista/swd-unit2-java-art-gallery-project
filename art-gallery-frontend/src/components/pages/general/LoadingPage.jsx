import { Spinner } from '@components/common/exports.js';
import { Main } from '@components/layout/exports';

const LoadingPage = ({ dataName }) => {
	let data = dataName || 'data';

	return (
		<Main>
			<h1>Loading</h1>
			<div>Retrieving {data} from server...</div>
			<Spinner />
		</Main>
	);
};

export default LoadingPage;
