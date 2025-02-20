import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

function SignIn() {
	async function logGoogleUser() {
		try {
			const { user } = await signInWithGooglePopup()
			createUserDocumentFromAuth(user)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign In With Google Popup</button>
		</div>
	)
}

export default SignIn
