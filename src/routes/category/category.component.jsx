import { useContext, useState, useEffect, Fragment } from 'react'
import { CategoriesContext } from '../../contexts/categories.context'
import { useParams } from 'react-router'
import './category.styles.scss'
import ProductCard from '../../components/product-card/product-card.component'

export default function Category() {
	const { category } = useParams()
	const { categoriesMap } = useContext(CategoriesContext)
	const [products, setProducts] = useState(categoriesMap[category])

	useEffect(() => {
		setProducts(categoriesMap[category])
	}, [category, categoriesMap])

	return (
		<Fragment>
			<h2 className='category-title'>{category.toUpperCase()}</h2>
			<div className='category-container'>
				{products &&
					products.map((product) => {
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
		</Fragment>
	)
}
