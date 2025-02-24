import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-up-form.styles.scss'
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

const defaultFormFilds = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

function SignUpForm() {
	const [formFields, setFormFields] = useState(defaultFormFilds)
	const { displayName, email, password, confirmPassword } = formFields
	const [errorField, setErrorField] = useState('')

	// console.log(formFields)

	async function handleSubmit(event) {
		event.preventDefault()
		const { email, password, confirmPassword } = formFields
		if (password !== confirmPassword) {
			alert(`Password doesn't match!`)
			return
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			)

			await createUserDocumentFromAuth(user, { displayName })
			setFormFields(defaultFormFilds)
			setErrorField('')
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Email already in use. From Firebase codes!')
				console.error('Email already in use. From Firebase codes!')
				setErrorField('Email taken!')
			} else if (error.code === 'auth/invalid-email') {
				alert('Invalid email!')
				console.error('Invalid email!')
				setErrorField('Invalid email!')
			}
			console.log(error)
		}
	}

	function handleChange(event) {
		const { name, value } = event.target
		setFormFields({ ...formFields, [name]: value })
	}

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign Up with your email and password</span>
			{errorField ? <p>{errorField}</p> : ''}

			<form onSubmit={handleSubmit}>
				<FormInput
					htmlFor='displayName'
					label='Display Name'
					type='text'
					required
					name='displayName'
					id='displayName'
					onChange={handleChange}
					value={displayName}
					autoComplete='username'
				/>

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
					autoComplete='new-password'
				/>

				<FormInput
					htmlFor='confirmPassword'
					label='Confirm Password'
					type='password'
					required
					name='confirmPassword'
					id='confirmPassword'
					onChange={handleChange}
					value={confirmPassword}
					autoComplete='new-password'
				/>
				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	)
}
export default SignUpForm
