import { createContext, useState, useEffect } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js'
// import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext({
	categoriesMap: {},
})

export function CategoriesProvider({ children }) {
	const [categoriesMap, setCategoriesMap] = useState({})
	const value = { categoriesMap }

	useEffect(() => {
		;(async () => {
			const response = await getCategoriesAndDocuments()
			console.log(response)
			setCategoriesMap(response)
		})()
	}, [])

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	)
}
