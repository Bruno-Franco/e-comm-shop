import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext({
	isOpen: false,
	setIsOpen: () => {},
	cartItem: [],
	addItemToCart: () => {},
	cartCount: 0,
	totalCart: 0,
	removeItemFromCart: () => {},
	decreaseOneItem: () => {},
})

export function CartProvider({ children }) {
	const [isOpen, setIsOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [cartCount, setCartCount] = useState(0)
	const [totalCart, setTotalCart] = useState(0)

	useEffect(() => {
		let total = 0
		cartItems.map((item) => (total += item.quantity))
		setCartCount(total)
	}, [cartItems])

	useEffect(() => {
		let totalCost = 0
		cartItems.map((item) => (totalCost += item.quantity * item.price))
		setTotalCart(totalCost)
	}, [cartItems])

	function addItemToCart(productToAdd) {
		const isHere = cartItems.find(
			(product) => product.id === productToAdd.id
		)

		if (isHere) {
			return setCartItems(
				cartItems.map((product) => {
					if (product.id === productToAdd.id) {
						return { ...product, quantity: (product.quantity += 1) }
					}
					return product
				})
			)
		} else {
			setCartItems([...cartItems, { ...productToAdd, quantity: 1 }])
		}
	}

	function removeItemFromCart(productToRemove) {
		let updatedCart = cartItems.filter((item) => {
			if (productToRemove.id !== item.id) {
				return item
			}
		})
		setCartItems(updatedCart)
	}

	function decreaseOneItem(singleProductToDecrease) {
		if (singleProductToDecrease.quantity > 1) {
			let updatedCart = cartItems.map((item) => {
				if (item.id === singleProductToDecrease.id) {
					return { ...item, quantity: (item.quantity -= 1) }
				}
				return item
			})
			setCartItems(updatedCart)
		} else {
			return removeItemFromCart(singleProductToDecrease)
		}
	}

	const value = {
		isOpen,
		setIsOpen,
		addItemToCart,
		removeItemFromCart,
		decreaseOneItem,
		cartItems,
		cartCount,
		totalCart,
	}
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
