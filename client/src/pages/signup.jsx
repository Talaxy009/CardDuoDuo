import React from 'react';
import {render} from 'react-dom';
import styled from 'styled-components';
import {useCookies} from 'react-cookie';
import {
	Paper,
	Button,
	TextField,
	Alert,
	Snackbar,
	Tooltip,
} from '@mui/material';
import {signup} from '../../common/axios';
import Layout from '../components/Layout';

const LoginPanel = styled(Paper)`
	padding: 16px;
	margin: auto;
	width: 500px;
`;

const Input = styled(TextField)`
	margin: 8px 0;
`;

const Line = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Code = styled.img`
	cursor: pointer;
	margin-left: 4px;
`;

const LoginButton = styled(Button)`
	width: 35%;
`;

function Signup() {
	const [imgKey, setImgKey] = React.useState(0);
	const [userInfo, setUserInfo] = React.useState({
		nickname: '',
		account: '',
		password: '',
		captcha: '',
	});
	const [loginResult, setLoginResult] = React.useState({
		open: false,
		msg: '',
		code: 0,
	});

	const handleInput = (event) => {
		switch (event.target.id) {
			case 'nickname':
				setUserInfo({...userInfo, nickname: event.target.value});
				break;
			case 'account':
				setUserInfo({...userInfo, account: event.target.value});
				break;
			case 'password':
				setUserInfo({...userInfo, password: event.target.value});
				break;
			case 'captcha':
				setUserInfo({...userInfo, captcha: event.target.value});
				break;
			default:
				break;
		}
	};

	const handleRefresh = () => setImgKey((pre) => ++pre);

	const handleSignup = async () => {
		// 判断输入框内容并提示
		if (userInfo.account.length === 0) {
			setLoginResult({
				open: true,
				code: 1,
				msg: '请输入账号',
			});
			return;
		}
		if (userInfo.password.length === 0) {
			setLoginResult({
				open: true,
				code: 2,
				msg: '请输入密码',
			});
			return;
		}
		if (userInfo.nickname.length === 0) {
			setLoginResult({
				open: true,
				code: 3,
				msg: '请输入昵称',
			});
			return;
		}
		if (userInfo.captcha.length < 4) {
			setLoginResult({
				open: true,
				code: 4,
				msg: '请输入四位数验证码',
			});
			return;
		}
		// 请求接口
		const {data} = await signup(userInfo);
		if (data.code === 200) {
			// 注册成功
			setLoginResult({open: true, code: 0, msg: data.msg}); // 提示
			location.assign('/login.html'); // 跳转到登录页
		} else {
			// 注册失败
			handleRefresh(); // 刷新验证码
			setLoginResult({open: true, code: 5, msg: data.msg}); // 提示
		}
	};

	const handleClose = () => setLoginResult({...loginResult, open: false});

	return (
		<Layout>
			<LoginPanel>
				<Input
					fullWidth
					id="account"
					type="tel"
					label="账号"
					variant="outlined"
					error={loginResult.code === 1}
					onChange={handleInput}
				/>
				<Input
					fullWidth
					id="password"
					type="password"
					label="密码"
					variant="outlined"
					error={loginResult.code === 2}
					onChange={handleInput}
				/>
				<Input
					fullWidth
					id="nickname"
					type="text"
					label="昵称"
					variant="outlined"
					error={loginResult.code === 3}
					onChange={handleInput}
				/>
				<Line>
					<Input
						id="captcha"
						label="验证码"
						variant="outlined"
						onChange={handleInput}
						error={loginResult.code === 4}
					/>
					<Tooltip placement="left" title="看不清">
						<Code
							src={`http://localhost:3000/code?key=${imgKey}`}
							onClick={handleRefresh}
						/>
					</Tooltip>
				</Line>
				<Line>
					<LoginButton
						color="primary"
						variant="contained"
						onClick={handleSignup}>
						注册
					</LoginButton>
				</Line>
			</LoginPanel>
			<Snackbar
				anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
				open={loginResult.open}
				autoHideDuration={3000}
				onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={loginResult.code === 0 ? 'success' : 'error'}>
					{loginResult.msg}
				</Alert>
			</Snackbar>
		</Layout>
	);
}

render(<Signup />, document.getElementById('root'));
