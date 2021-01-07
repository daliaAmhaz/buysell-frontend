import axios from 'axios';

export const getProduct = async (product_id) => {
	const res = await axios({
		method: 'get',
		url: `product/${product_id}`,
    });
	return res.data.user;
};

export const getProducts = async () => {
	const res = await axios({
		method: 'get',
		url: 'products',
	});
	return res.data.data;
};

export const getClientProducts = async (client_id) => {
	const res = await axios({
		method: 'get',
		url: `products/${client_id}`,
	});
	return res.data.data;
};

export const setError = (errors_res) => {
	return ({
	type: 'FORM_ERRORS',
	errors_res,
})};

export const createProduct = async (product) => {
	console.log(product)
	const formData = new FormData()
    formData.append('image', product.image);
	formData.append('name', product.name);
	formData.append('description', product.description);
	formData.append('remaining', product.remaining.toString());
	formData.append('price', product.price.toString());
	formData.append('latitude', product.latitude.toString());
	formData.append('longitude', product.longitude.toString());
    formData.append('isSold', product.isSold ? "1" : "0");
    formData.append('isNegotiable', product.isNegotiable ? "1" : "0");
	for(let x = 0; x < product.categories.length; x++) {
		formData.append('category_ids[]', product.categories[x].id.toString())
	}

    const res = await axios({
        method: 'post',
        url: 'product',
        data: formData,
    })
    
	return res.status;
};

export const updateProduct = async (product) => {
    const formData = new FormData()
    formData.append('image', product.image);
	formData.append('name', product.name);
	formData.append('description', product.description);
	formData.append('remaining', product.remaining.toString());
	formData.append('price', product.price.toString());
	formData.append('latitude', product.latitude.toString());
	formData.append('longitude', product.longitude.toString());
    formData.append('isSold', product.isSold ? "1" : "0");
    formData.append('isNegotiable', product.isNegotiable ? "1" : "0");
	for(let x = 0; x < product.categories.length; x++) {
		formData.append('category_ids[]', product.categories[x].id.toString())
	}

    const res = await axios({
        method: 'post',
        url: `product/${product.id}`,
        data: formData,
    })
    
	return res.status;
};

export const deleteProduct = (id) => {
	axios({
		method: 'delete',
		url: `product/${id}`,
	}).then((resp) => {
	});
};

