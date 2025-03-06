// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth'
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FB_API_KEY,
	authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FB_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FB_APP_ID,
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth(firebaseApp)
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

// fireStore
export const db = getFirestore()

export async function addCollectionAndDocuments(collectionKey, objectsToAdd) {
	const collectionRef = collection(db, collectionKey)
	const batch = writeBatch(db)

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase())
		batch.set(docRef, object)
	})

	await batch.commit()
	console.log('Done!')
}

export async function getCategoriesAndDocuments() {
	const collectionRef = collection(db, 'categories')
	const q = query(collectionRef)

	const querySnapShot = await getDocs(q)
	const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
		const { title, items } = docSnapShot.data()
		acc[title.toLowerCase()] = items
		return acc
	}, {})

	return categoryMap
}

export async function createUserDocumentFromAuth(
	userAuth,
	additionalInfo = {}
) {
	if (!userAuth) return
	const userDocRef = doc(db, 'users', userAuth.uid)
	console.log(userAuth)
	// abaixo vamos verificar a existencia do documento na colecao
	const userSnapShot = await getDoc(userDocRef)
	console.log(userSnapShot)
	console.log(userSnapShot.exists())

	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			})
		} catch (error) {
			console.log(`Error creating the user with error - ${error}`)
		}
	}

	return userDocRef
}

export async function createAuthUserWithEmailAndPassword(email, password) {
	if (!email || !password) return

	return await createUserWithEmailAndPassword(auth, email, password)
}

export async function signInUserWithEmailAndPassword(email, password) {
	if (!email || !password) return
	try {
		return await signInWithEmailAndPassword(auth, email, password)
	} catch (error) {
		if (error.code === 'auth/invalid-credential') {
			alert(`Invalid credentials! Error - ${error.message}`)
		}
		console.log(error)
	}
}

export async function signOutUser() {
	try {
		const response = await signOut(auth)
		console.log(response)
		return response
	} catch (error) {
		console.log(error)
	}
}

export function onAuthStateChangedListener(callback) {
	return onAuthStateChanged(auth, callback)
}
