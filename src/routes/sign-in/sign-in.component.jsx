import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

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
			<SignInForm />
			<button onClick={logGoogleUser}>Sign In With Google Popup</button>
			<SignUpForm />
		</div>
	)
}

export default SignIn
