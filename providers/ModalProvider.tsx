"use client"

import { useEffect, useState } from 'react'

import AuthModal from '@/components/AuthModal'
import UploadModal from '@/components/UploadModal'

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
			<UploadModal />
		</>
	)
}

export default ModalProvider