import axios from 'axios';
import cookie from 'js-cookie';

const url = 'http://localhost:8000/users';

export const login = async (email, password) => {
	const res = await axios.post(`${url}/login`, {email, password});
	return res;
}

export const register = async (email, username, password) => {
	const res = await axios.post(`${url}/register`, {email, username, password});
	return res;
}


export const setCookie = (key, value) => {
	if(process.browser){
		cookie.set(key, value, {
			expires: 1
		});
	}
}


export const removeCookie = (key) => {
	if(process.browser){
		cookie.remove(key, {
			expires: 1
		});
	}
}


export const getCookie = (key) => {
	if(process.browser){
		return cookie.get(key);
	}
}



export const authenticate = (token, next) => {
	setCookie('token', token.token);	
	localStorage.setItem('user', JSON.stringify(token));
	next();

}

export const isAuthenticated = () => {
	if(process.browser){
		const cookieChecked = getCookie('token');
		if(cookieChecked){
			if(localStorage.getItem('user')){
				return JSON.parse(localStorage.getItem('user'));
			} else {
				return false;
			}
		}
	}
}

export const logout = async (next) => {
	if(localStorage.getItem('user')){
		removeCookie('token');
		localStorage.removeItem('user');
	}

	const res = await axios.get(`${url}/logout`);
	next();
	return res;
}

