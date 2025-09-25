import Spinner from "../common/Spinner";

const Loading = ({ dataName }) => {

    // TODO: Add spinner similar to Garden Planning Tool idea

    let data = dataName || "data";

	return (
		<main className="main-content">
            <h1>Loading</h1>
			<div>Retrieving {data} from server...</div>
            <Spinner />
		</main>
	);
};

export default Loading;
