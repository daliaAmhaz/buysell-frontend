import axios from 'axios';
import { logout } from './logoutAction';

export const login = (user_info) => ({
	type: 'INITIALIZE_USER_INFO',
	user_info,
});

export const setLoginError = (errors_res) => {
	return ({
	type: 'LOGIN_ERROR',
	errors_res,
})};

export const startLogin = (payload) => {
	console.log(payload)
	return (dispatch) => {
		axios({
			method: 'post',
			url: 'login',
			data: {
				email: payload.email,
				password: payload.password,
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
				if (userType.localeCompare("ADMIN") === 0)
					dispatch(
						login({
							id,
							email,
							userType,
							firstName,
							lastName,
						})
					);
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
			console.log("error", error)
			//empty errors
			dispatch(setLoginError([]));
			const errors = error.response.data.error;
			console.log(errors)
			let errors_res = []
			if(error.response) errors_res.push({message: "Wrong email or password", name: "emailPassword"});
			dispatch(setLoginError(errors_res));
		});
	};
};

export const getAuthenticatedUser = () => {
	return (dispatch) => {
		axios({
			method: 'get',
			url: 'me',
		}).then((res) => {
			const {
				id,
				userType,
				firstName,
				lastName,
				email,
				phoneNumber,
			} = res.data.user;
			console.log(res.data.user)
			if (userType && firstName && lastName && email) {
				if (userType.localeCompare("ADMIN") === 0)
					dispatch(
						login({
							id,
							email,
							userType,
							firstName,
							lastName,
						})
					);
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
				dispatch(logout());
				console.log('error');
			}
            return res.status;
		}).catch((error) => {
			if(error.response) 
				if( error.response.status === 401) {
					console.log("error.response", error.response)
					dispatch(logout());
				}
		});
	};
};

