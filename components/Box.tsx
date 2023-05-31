import { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode,
	className?: string
}

export const Box: FC<Props> = ({
	children,
	className}) => {
	return (
		<div 
			className={`${className} bg-neutral-900 rounded-lg h-fit w-full`}
		>
			{children}
		</div>
	)
}