import { Link } from 'react-router'
import './category-item.styles.scss'

function CategoryItem({ title, imageUrl, route }) {
	return (
		<Link to={route} className='dir-category-container'>
			<div
				className='background-image'
				style={{ backgroundImage: `url(${imageUrl})` }}
			/>
			<div className='category-body-container'>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</Link>
	)
}

export default CategoryItem
