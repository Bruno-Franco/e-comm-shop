import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'

export default function CheckOut() {
	const {
		cartItems,
		totalCart,
		removeItemFromCart,
		addItemToCart,
		decreaseOneItem,
	} = useContext(CartContext)

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Description</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{cartItems.map((item) => {
						const { id, name, price, quantity, imageUrl } = item
						return (
							<tr key={id}>
								<td>
									<img src={imageUrl} alt={name} />
								</td>
								<td>
									<span>{name}</span>
								</td>
								<td>
									<div
										className='arrow'
										onClick={() => {
											decreaseOneItem(item)
										}}
									>
										&#10094;
									</div>
									<span>{quantity}</span>
									<div
										className='arrow'
										onClick={() => {
											addItemToCart(item)
										}}
									>
										&#10095;
									</div>
								</td>
								<td>
									<span>{price}</span>
								</td>
								<td>
									<span
										onClick={() => {
											removeItemFromCart(item)
										}}
									>
										X
									</span>
								</td>
							</tr>
						)
					})}
				</tbody>
				<tfoot>
					<tr>
						<th colSpan={3}></th>
						<td>Total: {totalCart}€</td>
					</tr>
				</tfoot>
			</table>
		</div>
	)
}
