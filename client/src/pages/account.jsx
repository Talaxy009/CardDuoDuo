import React from 'react';
import {render} from 'react-dom';
import styled from 'styled-components';
import {useCookies} from 'react-cookie';
import {
	Paper,
	Avatar,
} from '@mui/material';
import Layout from '../components/Layout';

const AccountPanel = styled(Paper)`
	padding: 16px;
	margin: auto;
	width: 500px;
`;

const Line = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

function Login() {
	const [cookies, setCookie] = useCookies(['userInfo']);

	return (
		<Layout>
			<AccountPanel>
                <Line></Line>
            </AccountPanel>
		</Layout>
	);
}

render(<Login />, document.getElementById('root'));
