import React from 'react';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import {CookiesProvider} from 'react-cookie';
import TopBar from './TopBar';

const LayoutContainer = styled(Container)`
	display: flex;
	padding: 16px 0;
	flex-wrap: wrap;
`;

export default function Layout({children, props}) {
	return (
		<CookiesProvider>
			<TopBar />
			<LayoutContainer {...props}>{children}</LayoutContainer>
		</CookiesProvider>
	);
}
