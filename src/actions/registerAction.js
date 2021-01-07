import axios from 'axios';

export const register = (user_info) => ({
	type: 'INITIALIZE_USER_INFO',
	user_info,
});

export const setError = (errors_res) => {
	return ({
	type: 'REGISTER_ERROR',
	errors_res,
})};

export const startRegister = (payload) => {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: 'register',
			data: {
				firstName: payload.firstName,
				lastName: payload.lastName,
				email: payload.email,
				password: payload.password,
				c_password: payload.cPassword,
				phoneNumber: payload.phoneNumber,
			},
		}).then((res) => {
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
						register({
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
				if(errors.firstName) errors_res.push({message: errors.firstName[0], name: "firstName"});
				if(errors.lastName) errors_res.push({message: errors.lastName[0], name: "lastName"});
				if(errors.email) errors_res.push({message: errors.email[0], name: "email"});
				if(errors.password) errors_res.push({message: errors.password[0], name: "password"});
				if(errors.c_password) errors_res.push({message: errors.c_password[0], name: "c_password"});
				if(errors.phoneNumber) errors_res.push({message: errors.phoneNumber[0], name: "phoneNumber"});
				dispatch(setError(errors_res));
			}
		});
	};
};
