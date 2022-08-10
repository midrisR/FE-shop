import React, { createContext, useReducer, useState } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// initial state
const initialState = {
	products: [],
	error: [],
};
export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);
	const [value, setValue] = useState([]);
	const [image, setImage] = useState([]);

	const resetFields = () => {
		setValue([]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(value);
		// try {
		// 	const res = await axios({
		// 		method: 'POST',
		// 		url: 'http://localhost:5000/products/',
		// 		data: value,
		// 	});
		// 	dispatch({
		// 		type: 'PRODUCTS',
		// 		payload: res,
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// 	const errRes = error.response.data.message;
		// 	dispatch({
		// 		type: 'ERROR',
		// 		payload: errRes,
		// 	});
		// }
	};
	return (
		<GlobalContext.Provider
			value={{
				products: state.products,
				error: state.error,
				setValue,
				value,
				handleSubmit,
				image,
				setImage,
				resetFields,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
