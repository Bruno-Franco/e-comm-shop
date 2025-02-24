import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { signInUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

function SignInForm() {
	const initialFormState = {
		email: '',
		password: '',
	}
	const [formFields, SetFormFields] = useState(initialFormState)
	const { email, password } = formFields

	function handleSubmit(event) {
		event.preventDefault()
		const { email, password } = formFields
		signInUserWithEmailAndPassword(email, password)
	}
	function handleChange(event) {
		const { name, value } = event.target
		SetFormFields({ ...formFields, [name]: value })
	}

	return (
		<div className='sign-up-container'>
			<form onSubmit={handleSubmit}>
				<FormInput
					htmlFor='email'
					label='Email'
					type='email'
					required
					name='email'
					id='email'
					onChange={handleChange}
					value={email}
					autoComplete='email'
				/>
				<FormInput
					htmlFor='password'
					label='Password'
					type='password'
					required
					name='password'
					id='password'
					onChange={handleChange}
					value={password}
					autoComplete='password'
				/>
				<Button>Sign In</Button>
			</form>
		</div>
	)
}

export default SignInForm
