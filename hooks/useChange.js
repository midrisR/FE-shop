import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useChange() {
	const [value, setValue] = useState('');
	const [error, setError] = useState([]);
	const [product, setProcuts] = useState([]);
	const [image, setImage] = useState([]);
	// upload image
	console.log(image);
	// add product
	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = new FormData();
		body.append('name', value.name);
		body.append('price', value.price);
		body.append('wholesaler', value.wholesaler);
		body.append('stock', value.stock);
		body.append('image', image);
		body.append('description', value.description);
		body.append('weight', value.weight);
		body.append('long', value.long);
		body.append('wide', value.wide);
		body.append('preOrder', value.preOrder);
		body.append('sku', value.sku);
		body.append('condition', value.condition);

		body.forEach((value, key) => {
			console.log(key + ' ' + value);
		});
		try {
			const res = await axios({
				method: 'post',
				url: 'http://localhost:5000/products/',
				data: value,
			});
			setProcuts(res.data);
		} catch (error) {
			const errRes = error.response.data.message;
			setError(errRes);
		}
	};

	return {
		value,
		setValue,
		error,
		setError,
		image,
		setImage,
		setProcuts,
		handleSubmit,
	};
}
