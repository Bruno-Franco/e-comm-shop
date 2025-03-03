import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './checkout-item.styles.scss'

export default function CheckoutItem({ item }) {
	const { removeItemFromCart, addItemToCart, decreaseOneItem } =
		useContext(CartContext)
	const { name, price, quantity, imageUrl } = item

	function handlerIncrease() {
		return addItemToCart(item)
	}
	function handlerDecrease() {
		return decreaseOneItem(item)
	}
	function handlerRemove() {
		return removeItemFromCart(item)
	}

	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img src={imageUrl} alt={name} />
			</div>

			<span className='name'>{name}</span>

			<span className='quantity'>
				<div className='arrow' onClick={handlerDecrease}>
					&#10094;
				</div>
				<span className='value'>{quantity}</span>
				<div className='arrow' onClick={handlerIncrease}>
					&#10095;
				</div>
			</span>

			<span className='price'>{price}</span>

			<div className='remove-button' onClick={handlerRemove}>
				&#10005;
			</div>
		</div>
	)
}
