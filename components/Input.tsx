import { forwardRef, InputHTMLAttributes } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>(({
	className,
	type,
	disabled,
	...props
}, ref) => {
	return (
		<input
			className={`
				flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none ${className}`}
			type ={type}
			disabled={disabled}
			ref={ref} //this is needed to make the ref values work
			{...props}
		/>
	)
})

Input.displayName = "Input"

export default Input