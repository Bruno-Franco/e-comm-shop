import './form-input.styles.scss'

function FormInput({ label, htmlFor, ...otherProps }) {
	return (
		<div className='group'>
			<input className='form-input' {...otherProps} />
			{label && (
				<label
					htmlFor={htmlFor}
					className={`${
						otherProps.value.length ? 'shrink' : null
					} form-input-label`}
				>
					{label}
				</label>
			)}
		</div>
	)
}

export default FormInput
