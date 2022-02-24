import React from 'react';
import {render} from 'react-dom';
import {Snackbar, Alert} from '@mui/material';
import {useCookies} from 'react-cookie';
import Layout from '../components/Layout';
import {getGoods} from '../../common/axios';
import GoodCard from '../components/GoodCard';

function Index() {
	const [goods, setGoods] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [cookies, setCookies] = useCookies(['cart']);

	React.useEffect(() => {
		// 获取产品列表
		getGoods().then(({data}) => {
			if (data.code === 200) {
				setGoods(data.data);
			} else {
				console.error(data.msg);
			}
		});
	}, []);

	// 添加购物车
	const handleAddCart = (id) => {
		if (cookies.cart) {
			const index = cookies.cart.findIndex((v) => v.id === id);
			const newCart = cookies.cart;
			if (index !== -1) {
				newCart[index].num++;
			} else {
				newCart.push({
					id: id,
					num: 1,
				});
			}
			setCookies('cart', newCart, {path: '/'});
		} else {
			setCookies(
				'cart',
				[
					{
						id: id,
						num: 1,
					},
				],
				{path: '/'},
			);
		}
		setOpen(true);
	};
	// 立即购买
	const handleBuyNow = (id) => {
		handleAddCart(id);
		location.assign('/cart.html');
	};

	return (
		<Layout>
			{goods.map((good) => (
				<GoodCard
					key={good.goodId}
					goodInfo={good}
					onAdd={() => handleAddCart(good.goodId)}
					onBuy={() => handleBuyNow(good.goodId)}
				/>
			))}
			<Snackbar
				anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
				open={open}
				autoHideDuration={3000}
				onClose={() => setOpen(false)}>
				<Alert onClose={() => setOpen(false)} severity="success">
					"加入购物车成功"
				</Alert>
			</Snackbar>
		</Layout>
	);
}

render(<Index />, document.getElementById('root'));
