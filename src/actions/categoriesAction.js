import axios from 'axios';

export const getCategories = async () => {
	const res = await axios({
		method: 'get',
		url: 'categories',
	});
	return res.data.data;
};

export const createCategory = async (category) => {
	const res = await axios({
		method: 'post',
		url: 'category',
		data: category,
	})
	return res.status;
};

export const updateCategory = async (category) => {
	const res = await axios({
		method: 'put',
		url: `category/${category.id}`,
		data: category,
	});
	return res.status;
};

export const deleteCategory = (id) => {
	axios({
		method: 'delete',
		url: `category/${id}`,
	}).then((resp) => {
	});
};
