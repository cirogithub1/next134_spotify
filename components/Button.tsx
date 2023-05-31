import { ReactNode, forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
	className,
	children,
	disabled,
	type = 'button',
	...props
}, ref) => {
	return (
		<button
			className={`
				w-full rounded-full bg-green-500 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-40 text-black font-bold hover:opacity-75 transition ${className}`}
			disabled={disabled}
			type={type}
			{...props}
		>
			{children}
		</button>
	)
})

Button.displayName = 'Button'

export default Button