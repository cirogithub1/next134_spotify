"use client"

import { useRouter } from 'next/navigation'
import { FC, ReactNode } from 'react'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import Button from './Button'

interface Props {
	children: ReactNode,
	className: string
}

const Header: FC<Props> = ({ children, className }) => {

	const router = useRouter()

	const handleLogout = () => {
		// 
	}

	return (
		<div 
			className={`h-fit bg-gradient-to-b from-emerald-800 Xto-emerald-200 p-6 ${className}`}
		>
			<div 
				className="
					flex w-full justify-between items-center mb-4">
				<div 
					className="
						hidden md:flex gap-x-2 items-center"
				>
					<button 
						className="
							flex items-center justify-center rounded-full bg-black hover:opacity-75 transition"
						onClick={() => router.back()}
					>
						<RxCaretLeft 
							className='
								h-6 w-6 cursor-pointer'	/>
					</button>

					<button 
						className="
							flex items-center justify-center rounded-full bg-black hover:opacity-75 transition"
						onClick={() => router.forward()}
					>
						<RxCaretRight 
							className='
								h-6 w-6 cursor-pointer'	/>
					</button>
				</div>

				<div
				 className="
				 	flex md:hidden items-center gap-x-2">
					<button 
						className='
							flex justify-center items-center rounded-full bg-white p-2 hover:opacity-60 transition'
						onClick={() => router.push('/')}
					>
						< HiHome 
							className='
								h-6 w-6 cursor-pointer text-black' />
					</button>
					
					<button 
						className='
							flex justify-center items-center rounded-full bg-white p-2 hover:opacity-60 transition'
						onClick={() => router.push('/search')}
					>
						<  BiSearch 
							className='
								h-6 w-6 cursor-pointer text-black' />
					</button>
				</div>

				<div 
					className="
						flex justify-between items-center gap-x-4"
				>
					<>
						<div>
							<Button
								className='
									bg-transparent text-neutral-300 font-medium'
							>
								Sign up
							</Button>
						</div>
						
						<div>
							<Button
								className='
									bg-gray-100 px-6 py-2'
							>
								Log in
							</Button>
						</div>
					</>
				</div>
			</div>

			<div>
				{children}
			</div>
		</div>
	)
}

export default Header