"use client"

import { FC, useState } from "react"
import { toast } from "react-hot-toast"

import { Price, ProductWithPrice } from "@/types"
import { useUser } from "@/hooks/useUser"
import { postData } from "@/libs/helpers"

import Modal from "./Modal"
import Button from "./Button"
import useSubscribeModal from "@/hooks/useSubscribeModal"
import { getStripe } from "@/libs/stripeClient"

interface Props {
	products: ProductWithPrice[]
}

const formatPrice = (price: Price) => {
	const priceString = new Intl.NumberFormat('en-EU', {
		style: "currency",
		currency: price.currency,
		minimumFractionDigits: 2
	}).format((price?.unit_amount || 0) / 100)

	return priceString
}

const SubscribeModal: FC<Props> = ({ products }) => {
	const subscribeModal = useSubscribeModal()
	const { user, isLoading, subscription } = useUser()
	const [priceIdLoading, setPriceIdLoading] = useState<string>()

	const onChange = (open: boolean) => {
		if (!open) {
			subscribeModal.onClose()
		}
	}

	const handleCheckout = async (price: Price) => {
		setPriceIdLoading(price.id)

		if (!user) {
			setPriceIdLoading(undefined)
			return toast.error("Please log in to continue")
		}

		if (subscription) {
			setPriceIdLoading(undefined)
			return toast("You are already subscribed")
		} 

		try {
			const { sessionId } = await postData({
				url: '/api/create-checkout-session',
				data: { price }
			})

			const stripe = await getStripe()
			stripe?.redirectToCheckout({ sessionId })

		} catch (error) {
			console.log("/components/SubscribeModal.tsx handleCheckout error: ", error)
			toast.error("Something went wrong")
		} finally {
			setPriceIdLoading(undefined)
		}
	}

	let content = (
		<div className="text-center">
			No products yet {products.length}
		</div>
	)

	if (products.length) {
		content = (
			<div>
				{products.map((product) => {
					if (!product.prices?.length) {
						return (
							<div key={product.id}>
								No prices available
							</div>
						)
					}

					return product.prices.map((price) => (
						<Button 
							key={price.id}
							className="mb-4"
							disabled={isLoading || price.id === priceIdLoading}
							onClick={() => handleCheckout(price)}>
							{`Subscribe for $${formatPrice(price)} a ${price.interval}`}
						</Button>
					))
				})}
			</div>
		)
	}

	if (subscription) {
		content = (
			<div className="text-center">
				Already subscribed 
			</div>
		)
	}

	return (
		<Modal 
			title= "Only Premium users"
			description="Listen in Spoty Premium"	
			isOpen={subscribeModal.isOpen}
			onChange={onChange}>
				{content}
		</Modal>
	)
}

export default SubscribeModal