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
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

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
		const response = await signInWithEmailAndPassword(auth, email, password)
		console.log(response)
	} catch (error) {
		if (error.code === 'auth/invalid-credential') {
			alert(`Invalid credentials! Error - ${error.message}`)
		}
		console.log(error)
	}
}
