import React from 'react';
import {render} from 'react-dom';
import Layout from '../components/Layout';
import CartItem from '../components/CartItem';
import {useCookies} from 'react-cookie';
import {getGoods} from '../../common/axios';

function Cart() {
	const [goods, setGoods] = React.useState([]);
	const [all, setAll] = React.useState(0);
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

	React.useEffect(() => {
		// 计算总价
		if (cookies.cart) {
			let count = 0;
			cookies.cart.forEach((item) => {
				count +=
					goods.find((v) => v.goodId === item.id)?.price * item.num;
			});
			setAll(count);
		}
	}, [goods, cookies]);

	// 移除
	const handleRemove = (id) => {
		const index = cookies.cart.findIndex((v) => v.id === id);
		const newCart = cookies.cart;
		if (--newCart[index].num < 1) {
			newCart.splice(index, 1);
		}
		setCookies('cart', newCart, {path: '/'});
	};

	// 添加
	const handleAdd = (id) => {
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
	};

	return (
		<Layout>
			{cookies.cart && cookies.cart.length && goods.length ? (
				cookies.cart.map((item) => (
					<CartItem
						key={item.id}
						goodInfo={goods.find((v) => v.goodId === item.id)}
						num={item.num}
						onRemove={() => handleRemove(item.id)}
						onAdd={() => handleAdd(item.id)}
					/>
				))
			) : (
				<span style={{margin: 'auto'}}>空空如也</span>
			)}
			<CartItem all={all} />
		</Layout>
	);
}

render(<Cart />, document.getElementById('root'));
