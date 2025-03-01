import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'
import './product-card.styles.scss'
import Button from '../button/button.component'

function ProductCard({ name, price, image, product }) {
	const { addItemToCart } = useContext(CartContext)
	function addProductToCart() {
		return addItemToCart(product)
	}
	return (
		<div className='product-card-container'>
			<img src={image} alt={name} />
			<div className='footer'>
				<span className='name'>{name}</span>
				<span className='price'>{price}€</span>
			</div>
			<Button onClick={addProductToCart} buttonType='inverted'>
				ADD TO CARD
			</Button>
		</div>
	)
}

export default ProductCard
