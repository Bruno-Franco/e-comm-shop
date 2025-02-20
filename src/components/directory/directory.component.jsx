import CategoryItem from '../cotagory-item/category-item.component'
import './directory.styles.scss'

function Directory({ categories }) {
	return (
		<div className='directory-container '>
			{categories.map(({ title, id, imageUrl }) => (
				<CategoryItem key={id} title={title} imageUrl={imageUrl} />
			))}
		</div>
	)
}

export default Directory
