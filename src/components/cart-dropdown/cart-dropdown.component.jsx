import Button from '../button/button.component'
import './cart-dropdown.scss'

export default function CartDropdown({ style }) {
	return (
		<div className='cart-dropdown-container' style={style}>
			<div className='cart-items'></div>
			<Button>GO TO CHECKOUT</Button>
		</div>
	)
}
