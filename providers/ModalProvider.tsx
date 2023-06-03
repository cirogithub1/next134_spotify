"use client"

import { useEffect, useState } from 'react'

import AuthModal from '@/components/AuthModal'

const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false)
	
	useEffect(() => {
		setIsMounted(true)
	}, [])
	
	// is page is already mounted return nothing 'n prevent HydrationError
	if (!isMounted) return null

	return (
		<>
			<AuthModal />
		</>
	)
}

export default ModalProvider