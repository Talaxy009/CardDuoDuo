import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function GoodCard({goodInfo, onAdd, onBuy}) {
	const {name, price, image} = goodInfo;

	return (
		<Card sx={{margin: 1, width: {xs: '45%', md: '30%'}}}>
			<CardMedia
				component="img"
				image={`http://localhost:3000/images/${image}`}
				alt={name}
			/>
			<CardContent>
				<Typography gutterBottom variant="h6" component="div">
					{name}
				</Typography>
				<Typography variant="body1" color="text.secondary">
					￥{price}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					variant="contained"
					color="primary"
					size="small"
					onClick={onAdd}>
					加入购物车
				</Button>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={onBuy}>
					立即购买
				</Button>
			</CardActions>
		</Card>
	);
}
