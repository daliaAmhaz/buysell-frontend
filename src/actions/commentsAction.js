import axios from 'axios';

export const getProductComments = async (product_id) => {
	const res = await axios({
		method: 'get',
		url: `comments/${product_id}`,
	});
	return res.data.data;
};

export const createComment = async ({comment, initProductComments}) => {
	const res = await axios({
		method: 'post',
		url: 'comment',
		data: comment,
	})
	initProductComments();
	return res.status;
};

export const deleteComment = (id) => {
	axios({
		method: 'delete',
		url: `comment/${id}`,
	}).then((resp) => {
	});
};
