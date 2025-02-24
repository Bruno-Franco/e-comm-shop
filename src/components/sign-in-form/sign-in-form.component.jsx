import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import {
	signInUserWithEmailAndPassword,
	signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'

function SignInForm() {
	const initialFormState = {
		email: '',
		password: '',
	}

	const [formFields, SetFormFields] = useState(initialFormState)
	const { email, password } = formFields

	async function logGoogleUser() {
		try {
			await signInWithGooglePopup()
		} catch (error) {
			console.log(error)
		}
	}

	async function handleSubmit(event) {
		event.preventDefault()
		const { email, password } = formFields
		try {
			await signInUserWithEmailAndPassword(email, password)

			SetFormFields(initialFormState)
		} catch (error) {
			console.log(error)
		}
	}
	function handleChange(event) {
		const { name, value } = event.target
		SetFormFields({ ...formFields, [name]: value })
	}

	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign In with your email and password!</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					htmlFor='sign-in-email'
					label='Email'
					type='email'
					required
					name='email'
					id='sign-in-email'
					onChange={handleChange}
					value={email}
					autoComplete='email'
				/>
				<FormInput
					htmlFor='sign-in-password'
					label='Password'
					type='password'
					required
					name='password'
					id='sign-in-password'
					onChange={handleChange}
					value={password}
					autoComplete='password'
				/>
				<div className='buttons-container'>
					<Button>Sign In</Button>
					<Button
						type='button'
						onClick={logGoogleUser}
						buttonType='google'
					>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
