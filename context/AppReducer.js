export default (state, action) => {
	switch (action.type) {
		// transactions
		case 'PRODUCTS':
			return {
				...state,
				products: action.payload,
			};

		case 'ERROR':
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};
