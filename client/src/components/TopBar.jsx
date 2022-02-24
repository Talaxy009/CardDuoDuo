import React from 'react';
import {
	Avatar,
	Container,
	Tooltip,
	MenuItem,
	Menu,
	Typography,
	IconButton,
	Button,
	Toolbar,
	Box,
	AppBar,
} from '@mui/material';
import {useCookies} from 'react-cookie';

const pages = [
	{text: '首页', url: '/'},
	{text: '购物车', url: '/cart.html'},
];

const gusterSettings = [
	{text: '登录', url: '/login.html'},
	{text: '注册', url: '/signup.html'},
];
const userSettings = [
	// {text: '账号', url: '/account.html'},
	{text: '退出登录', url: '/logout.html'},
];

function stringToColor(string) {
	let hash = 0;
	let i;

	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.substr(-2);
	}

	return color;
}

function stringAvatar(name) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: name.charAt(0),
	};
}

export default function TopBar() {
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [cookies, _setCookie, removeCookie] = useCookies(['userInfo']);
	const settings = React.useMemo(
		() => (cookies.userInfo ? userSettings : gusterSettings),
		[cookies.userInfo],
	);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleJump = (url) => {
		if (url === '/logout.html') {
			removeCookie('userInfo');
			removeCookie('cart');
		} else {
			location.assign(url);
		}
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography variant="h6" noWrap component="div">
						卡多多
					</Typography>
					<Box sx={{flexGrow: 1, display: 'flex'}}>
						{pages.map((page) => (
							<Button
								key={page.text}
								onClick={() => handleJump(page.url)}
								sx={{
									my: 2,
									color: 'white',
									display: 'block',
								}}>
								{page.text}
							</Button>
						))}
					</Box>

					<Box sx={{flexGrow: 0}}>
						<Tooltip title="更多">
							<IconButton
								size="large"
								onClick={handleOpenUserMenu}
								color="inherit"
								sx={{p: 0}}>
								{cookies.userInfo ? (
									<Avatar
										{...stringAvatar(
											cookies.userInfo?.nickname,
										)}
									/>
								) : (
									<Avatar />
								)}
							</IconButton>
						</Tooltip>
						<Menu
							sx={{mt: '45px'}}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							{settings.map((setting) => (
								<MenuItem
									key={setting.url}
									onClick={() => handleJump(setting.url)}>
									<Typography textAlign="center">
										{setting.text}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
