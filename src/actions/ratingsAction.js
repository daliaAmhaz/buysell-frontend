import axios from 'axios';

export const getProductRatings = async (product_id) => {
	const res = await axios({
		method: 'get',
		url: `ratings/${product_id}`,
	});
	return res.data.data;
};

export const createRating = async ({rating, updateProductRatings}) => {
	const res = await axios({
		method: 'post',
		url: 'rating',
		data: rating,
	})
	updateProductRatings();
	return res.status;
};


export const updateRating = async (rating) => {
	const res = await axios({
		method: 'put',
		url: `rating/${rating.id}`,
		data: rating,
	});
	return res.status;
};

