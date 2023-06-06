"use client"

import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import useAuthModal from '@/hooks/useAuthModal'
import Modal from './Modal'

const AuthModal = () => {
	const supabaseClient = useSupabaseClient()
	const router = useRouter()
	const { session } = useSessionContext()
	const { onClose , isOpen } = useAuthModal()
 
	const handleChange = (open: boolean) => {
		if (!open) {
			onClose()
		}
	}

	useEffect(() => {
		if (session) {
			router.refresh()
			onClose()
		}
	}, [session, onClose, router])
	
	return (
		<Modal 
			title='Welcome back'
			description='Login to your account to continue'
			isOpen={isOpen}
			onChange={handleChange}
		>
			<Auth 
				supabaseClient={supabaseClient}
				providers={['google', 'github']}
				magicLink
				theme='dark'
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: 'rgb(64, 64, 64)',
								brandAccent: 'rgb(34, 197, 94)'
							}
						}
					}
				}}/>
		</Modal>
	)
}

export default AuthModal