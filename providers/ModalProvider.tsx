"use client"

import { FC, useEffect, useState } from 'react'

import AuthModal from '@/components/AuthModal'
import UploadModal from '@/components/UploadModal'
import SubscribeModal from '@/components/SubscribeModal'
import { ProductWithPrice } from '@/types'

interface Props {
	products: ProductWithPrice[]
}
const ModalProvider: FC<Props> = ({ products }) => {
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
			<SubscribeModal products={products} />
		</>
	)
}

export default ModalProvider