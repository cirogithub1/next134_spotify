"use client"

import { FC, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { toast } from 'react-hot-toast'

import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'

import useAuthModal from '@/hooks/useAuthModal'
import usePlayer from '@/hooks/usePlayer'
import { useUser } from '@/hooks/useUser'
import Button from './Button'

interface Props {
	children: ReactNode,
	className?: string
}

const Header: FC<Props> = ({ children, className }) => {
	const player = usePlayer()
	const router = useRouter()
	const authModal = useAuthModal()

	const supabaseClient = useSupabaseClient()
	const { user } = useUser()

	const handleLogin = () => {
		authModal.onOpen()
	} 

	const handleLogout = async () => {
		const { error } = await supabaseClient.auth.signOut()

		player.reset()
		router.refresh()

		if (error) {
			toast.error(error.message)
		} else {
			toast.success('Logged out successfully')
		}

		router.push('/')
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
						hidden md:flex gap-x-2 items-center">
							<button 
								className="
									flex items-center justify-center rounded-full bg-black hover:opacity-75 transition"
								onClick={() => router.back()}>
									<RxCaretLeft 
										className='
										h-6 w-6 cursor-pointer'	/>
							</button>

							<button 
								className="
									flex items-center justify-center rounded-full bg-black hover:opacity-75 transition"
								onClick={() => router.forward()}>
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
						onClick={() => router.push('/')}>
							< HiHome 
								className='
								h-6 w-6 cursor-pointer text-black' />
					</button>
					
					<button 
						className='
							flex justify-center items-center rounded-full bg-white p-2 hover:opacity-60 transition'
						onClick={() => router.push('/search')}>
							<BiSearch 
								className='
								h-6 w-6 cursor-pointer text-black' />
					</button>
				</div>

				<div 
					className="
						flex justify-between items-center gap-x-4"
				>
					{user 
					? (
							<div className='flex gap-x-4 items-center'>
								<Button
									className='bg-white px-6'
									onClick={handleLogout}>
										Logout
								</Button>

								<Button
									className=''
									onClick={() => router.push('/account')}>
										<FaUserAlt />
								</Button>
							</div>
						) 
					: (
						<>
							<div>
								<Button
									className='
										bg-transparent text-neutral-300 font-medium'
									onClick={authModal.onOpen}>
										Sign up
								</Button>
							</div>
							
							<div>
								<Button
									className='
										bg-gray-100 px-6 py-1'
									onClick={handleLogin}>
										Log in
								</Button>
							</div>
						</>)}
				</div>
			</div>

			<div>
				{children}
			</div>
		</div>
	)
}

export default Header