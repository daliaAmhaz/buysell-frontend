import axios from 'axios';

export const getRatings = async () => {
	const res = await axios({
		method: 'get',
		url: 'ratings',
	});
	return res.data.data;
};

export const createRating = async (rating) => {
	const res = await axios({
		method: 'post',
		url: 'rating',
		data: rating,
	})
	return res.status;
};

export const updateRating = async (rating) => {
	const res = await axios({
		method: 'put',
		url: `rating/${rating.id}`,
		data: {
			name: rating,
		},
	});
	return res.status;
};

export const deleteRating = (id) => {
	axios({
		method: 'delete',
		url: `rating/${id}`,
	}).then((resp) => {
	});
};
