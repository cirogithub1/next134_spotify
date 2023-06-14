import Stripe from "stripe"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

import { stripe } from "@/libs/stripe"
import {
	upsertProductRecord,
	upsertPriceRecord,
	subscriptionStatusChange
} from "@/libs/supabaseAdmin"

const relevantEvents = new Set(
	[
		"product.created", 
		"product.updated",
		"price.created",
		"price.updated",
		"checkout.session.completed",
		"customer.subscription.created",
		"customer.subscription.updated",
		"customer.subscription.deleted"
	]
) 

export async function POST(request: Request) {
	const body = await request.text()
	const sig = headers().get("Stripe-Signature")
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

	let event: Stripe.Event
	try {
		if (!sig || !webhookSecret) {
			return
		}

		event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
	} catch (error: any) {
		console.log('/webhooks/toute/ Error message :', error.message)
		return new NextResponse(`Webhook Error : ${error.message}` , { status: 400 })
	}

	if (relevantEvents.has(event.type)) {
		try {
			switch (event.type) {
				case "product.created":
					break
				case "product.updated":
					await upsertProductRecord(event.data.object as Stripe.Product)
					break
				case "price.created":
					break
				case "price.updated":
					await upsertPriceRecord(event.data.object as Stripe.Price)	
					break
				case "checkout.session.completed":
					const checkoutSession = event.data.object as Stripe.Checkout.Session
					if (checkoutSession.mode === 'subscription') {
						const subscriptionId = checkoutSession.subscription
						await subscriptionStatusChange(
							subscriptionId as string,
							checkoutSession.customer as string,
							true
						)
					}
					break
				case "customer.subscription.created":
						break
				case "customer.subscription.updated":
						break
				case "customer.subscription.deleted":
					const subscription = event.data.object as Stripe.Subscription
					await subscriptionStatusChange(
						subscription.id as string,
						subscription.customer as string,
						event.type === "customer.subscription.deleted"
					)
					break		
				default:
					throw new Error("/Webhook/ Unhandled relevant event type")
			}
		} catch (error: any) {
			console.log('/webhooks/toute/ Error message :', error.message)
			return new NextResponse(`Webhook Error : ${error.message}` , { status: 400 })
		}
	}

	return NextResponse.json({ received: true }, { status: 200 })
}