import { useContext } from 'react'
import { ProductsContext } from '../../contexts/products.context'
import ProductCard from '../../components/product-card/product-card.component'
import './shop.styles.scss'

function Shop() {
	const { products } = useContext(ProductsContext)
	return (
		<div className='products-container'>
			{products.map((product) => {
				const { id, name, price, imageUrl } = product
				return (
					<ProductCard
						key={id}
						name={name}
						price={price}
						image={imageUrl}
						product={product}
					/>
				)
			})}
		</div>
	)
}

export default Shop
