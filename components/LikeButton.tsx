"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"

interface Props {
	songId: string
}

const LikeButton: FC<Props> = ({ songId }) => {
	const router = useRouter()
	const { supabaseClient } = useSessionContext()
	const [isLiked, setIsLiked] = useState(false)
	const Icon = isLiked ? AiFillHeart : AiOutlineHeart

	const authModal = useAuthModal()
	const { user } = useUser()

	
	async function handleLike() {
		if (!user) {
			return authModal.onOpen()
		}

		if (isLiked) {
			const { error } = await supabaseClient
				.from('liked_songs')
				.delete()
				.eq('song_id', songId)
				.eq('user_id', user?.id)

			if (error) {
				console.log(error)
			} else {
				setIsLiked(false)
			}

		} else {
			const { error } = await supabaseClient
				.from('liked_songs')
				.insert({
					song_id: songId,
					user_id: user?.id
				})

			if (error) {
				console.log('/component/LikeButton/ error', error)
			} else {
				setIsLiked(true)
			}
		}

		router.refresh()
	}

	useEffect(() => {
		if (!user) {
			return
		}
		
		async function fetchData() {
			const { data, error } = await supabaseClient
				.from('liked_songs')
				.select('*')
				.eq('song_id', songId)
				.eq('user_id', user?.id)
				.single()

			if (!error && data) {
				setIsLiked(true)
			}
		}

		fetchData()

	}, [user, songId, supabaseClient])

	return (
		<button
			className="
				hover:opacity-60 transition"
			onClick={handleLike}>
				<Icon 
					color={isLiked ? 'red' : 'white'}
					size={25}/>
		</button>
	)
}

export default LikeButton