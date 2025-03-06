import { Link } from 'react-router'
import ProductCard from '../product-card/product-card.component'
import './category-preview.styles.scss'

export default function CategoryPreview({ title, products }) {
	return (
		<div className='category-preview-container'>
			<h2>
				<Link className='title' to={title.toLowerCase()}>
					{title.toUpperCase()}
				</Link>
			</h2>
			<div className='preview'>
				{products
					.filter((_, index) => index < 4)
					.map((product) => {
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
		</div>
	)
}
