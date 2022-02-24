import axios from 'axios';
import md5 from 'md5';

const server = axios.create({
	baseURL: 'http://localhost:3000',
	withCredentials: true
});

export const login = (userInfo) =>
	server.post('/login', {
		account: userInfo.account,
		password: md5(userInfo.password),
		captcha: userInfo.captcha,
	});

export const signup = (userInfo) =>
	server.post('/signup', {
		nickname: userInfo.nickname,
		account: userInfo.account,
		password: md5(userInfo.password),
		captcha: userInfo.captcha,
	});

export const getGoods = () => server.get("/goods");
