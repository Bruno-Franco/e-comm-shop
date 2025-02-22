import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

function SignIn() {
	async function logGoogleUser() {
		try {
			const { user } = await signInWithGooglePopup()
			await createUserDocumentFromAuth(user)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign In With Google Popup</button>
			<SignUpForm />
		</div>
	)
}

export default SignIn
