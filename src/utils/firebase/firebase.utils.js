// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCPRzjV-PhLfD13PPnvSuUJ_HY8_lzy5Jw',
	authDomain: 'e-comm-shop-db.firebaseapp.com',
	projectId: 'e-comm-shop-db',
	storageBucket: 'e-comm-shop-db.firebasestorage.app',
	messagingSenderId: '429963828255',
	appId: '1:429963828255:web:f6f50594725fcdb316492a',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

// fireStore
export const db = getFirestore()

export async function createUserDocumentFromAuth(userAuth) {
	const userDocRef = doc(db, 'users', userAuth.uid)
	console.log(userDocRef)
	// abaixo vamos verificar a existencia do documento na colecao
	const userSnapShot = await getDoc(userDocRef)
	console.log(userSnapShot)
	console.log(userSnapShot.exists())

	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, { displayName, email, createdAt })
		} catch (error) {
			console.log(`Error creating the user with error - ${error}`)
		}
	}

	return userDocRef
}
