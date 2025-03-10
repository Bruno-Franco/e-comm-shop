import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'

function CartIcon() {
	const { isOpen, setIsOpen, cartCount } = useContext(CartContext)

	return (
		<div
			className='cart-icon-container'
			onClick={() => {
				setIsOpen(!isOpen)
			}}
		>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{cartCount}</span>
		</div>
	)
}

export default CartIcon
