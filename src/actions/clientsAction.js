import axios from 'axios';
import { login } from './loginAction';

export const getClient = async (client_id) => {
	const res = await axios({
		method: 'get',
		url: `client/${client_id}`,
    });
	return res.data.user;
};

export const getClients = async () => {
	const res = await axios({
		method: 'get',
		url: 'clients',
	});
	return res.data.data;
};

export const setError = (errors_res) => {
	return ({
	type: 'FORM_ERRORS',
	errors_res,
})};

export const createClient = (client) => {
	console.log(client)
	
	return (dispatch) => {
		axios({
			method: 'post',
			url: 'client',
			data: {
				firstName: client.firstName,
				lastName: client.lastName,
				email: client.email,
				password: client.password,
				c_password: client.cPassword,
				phoneNumber: client.phoneNumber,
			},
		}).then((res) => {
			//empty errors
			console.log(res.status)
			dispatch(setError([]));
			const {
				token,
				user
			} = res.data;
			const {
				id,
				userType,
				firstName,
				lastName,
				email,
				phoneNumber,
			} = user;

			if (token && id && userType && firstName && lastName && email) {
				localStorage.setItem('buyselltoken', token);
				axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
				if (userType.localeCompare("CLIENT") === 0)
					dispatch(
						login({
							id,
							email,
							userType,
							firstName,
							lastName,
							phoneNumber,
						})
					);
			} else {
				console.log('error');
			}
            return res.status;
		}).catch((error) => {
			if(error.response) {
				//empty errors
				dispatch(setError([]));
				const errors = error.response.data.error;
                console.log(errors)
                let errors_res = []
				if(errors.c_password) errors_res.push({message: errors.c_password[0], name: "c_password"});
				if(errors.password) errors_res.push({message: errors.password[0], name: "password"});
				if(errors.email) errors_res.push({message: errors.email[0], name: "email"});
				if(errors.firstName) errors_res.push({message: errors.firstName[0], name: "firstName"});
				if(errors.lastName) errors_res.push({message: errors.lastName[0], name: "lastName"});
				if(errors.phoneNumber) errors_res.push({message: errors.phoneNumber[0], name: "phoneNumber"});
			}
		});
	};
};

export const startUpdateClient = ({client}) => {
	
	return (dispatch) => {
		axios({
			method: 'put',
			url: `client/${client.id}`,
			data:  {
				firstName: client.firstName,
				lastName: client.lastName,
				phoneNumber: client.phoneNumber,
			},
		}).then((res) => {
			const {
				id,
				userType,
				firstName,
				lastName,
				email,
				phoneNumber,
			} = res.data.user;
			//empty errors
			dispatch(setError([]));
			console.log(res.status);
			if (res.status === 200) {
				alert("Client successfully created")
			}
			dispatch(
				login({
					id,
					email,
					userType,
					firstName,
					lastName,
					phoneNumber,
				})
			);
		}).catch((error) => {
			if(error.response) {
				//empty errors
				dispatch(setError([]));
				const errors = error.response.data.error;
                console.log(errors)
                let errors_res = []
				if(errors.firstName) errors_res.push({message: errors.firstName[0], name: "firstName"});
				if(errors.lastName) errors_res.push({message: errors.lastName[0], name: "lastName"});
				if(errors.phoneNumber) errors_res.push({message: errors.phoneNumber[0], name: "phoneNumber"});
				dispatch(setError(errors_res));
				if (errors_res.length !== 0) {
					alert("Failed to create client")
				}
			}
		});
	};
};