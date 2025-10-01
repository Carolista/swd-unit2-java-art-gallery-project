import { createContext } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
	
    // TODO: Create a state variable to track whether the data is still loading or not
	// Set the initial state to true

	// TODO: Create three state variables to hold the data for all artworks, all artists, and all categories
	// Set the initial state to null for all three

	// TODO: Define three async functions that make the calls to the API endpoints
	// for retrieving all artworks, artists, and categories
	// Use try/catch to handle the possibility of a response other than 'ok'
	// After structuring the data using the appropriate classes, update the state variable for that data
	// You can use the relative path from the public folder to fetch from the test JSON first,
	// then switch to the actual endpoints defined in your Spring Boot application

	// TODO: Utilize the useEffect() hook to ensure all three fetching functions are called when the component first loads

	// TODO: Utilize the useEffect() hook once more, this time to check that all three of the state variables
	// for holding the data are no longer null. If that is true, they should either be empty arrays or have data in them.
	// Make sure this hook executes anytime a change to one of those three state variables is detected.

	// TODO: Update the value object to include isLoading, all three state variables holding data, and all three fetch functions

	return (
		<DataContext.Provider
			value={{}}>
			{children}
		</DataContext.Provider>
	);
};
