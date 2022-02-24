import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const CartRoot = styled(Paper)`
	width: 100%;
	display: flex;
	margin: 1rem;
`;

const CartContent = styled.div`
	flex: 1;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Line = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;
	align-items: center;
`;

export default function CartItem({
	goodInfo = {name: '', price: 0, image: ''},
	num,
	onRemove,
	onAdd,
	all = -1,
}) {
	const {name, price, image} = goodInfo;

	return all > -1 ? (
		<CartRoot>
			<CartContent>合计</CartContent>
			<CartContent>
				<Typography variant="body1" color="text.primary">
					￥{all}
				</Typography>
			</CartContent>
			<CartContent>
				<Line>
					<Button
						variant="contained"
						color="primary"
						size="small"
						onClick={onAdd}>
						前往结账
					</Button>
				</Line>
			</CartContent>
		</CartRoot>
	) : (
		<CartRoot>
			<CartContent>
				<img src={`http://localhost:3000/images/${image}`} alt={name} />
			</CartContent>
			<CartContent>
				<Typography variant="body1" color="text.primary">
					{name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					￥{price} x {num}件
				</Typography>
			</CartContent>
			<CartContent>
				<Line>
					<Button
						variant="contained"
						color="primary"
						size="small"
						onClick={onAdd}>
						增加
					</Button>
					<Button
						variant="contained"
						color="secondary"
						size="small"
						onClick={onRemove}>
						移除
					</Button>
				</Line>
			</CartContent>
		</CartRoot>
	);
}
