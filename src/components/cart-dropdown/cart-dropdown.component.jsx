import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { CartContext } from '../../contexts/cart.context'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import './cart-dropdown.scss'

export default function CartDropdown() {
	const { cartItems, isOpen, setIsOpen } = useContext(CartContext)
	const navigate = useNavigate()

	function goToCheckOutAndCloseDropDown() {
		setIsOpen(!isOpen)
		return navigate('checkout')
	}

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map((item) => {
					return <CartItem key={item.id} cartItem={item} />
				})}
			</div>
			<Button onClick={goToCheckOutAndCloseDropDown}>
				GO TO CHECKOUT
			</Button>
		</div>
	)
}
