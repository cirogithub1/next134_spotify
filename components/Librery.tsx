"use client"

import { FC } from "react"

import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"

import { Song } from "@/types"

import { useUser } from "@/hooks/useUser"
import useOnPlay from "@/hooks/useOnPlay"
import useAuthModal from "@/hooks/useAuthModal"
import useUploadModal from "@/hooks/useUploadModal"
import useSubscribeModal from "@/hooks/useSubscribeModal"

import MediaItem from "./MediaItem"

interface Props {
	songs: Song[]
}

const Librery: FC<Props> = ({ songs }) => {
	const subscribeModal = useSubscribeModal()
	const authModal = useAuthModal()
	const uploadModal = useUploadModal()
	const { user, subscription } = useUser()

	const onPlay = useOnPlay(songs)

	const handleClick = () => {	 
		if (!user) {
			return authModal.onOpen()
		}

		if (!subscription) {
			return subscribeModal.onOpen()
		}

		return uploadModal.onOpen()
	}

	return (
		<div 
			className="
				flex flex-col">
			<div 
				className="
					flex items-center justify-between px-5 pt-4"
			>
				<div 
					className="
						inline-flex items-center gap-x-2"
				>
					<TbPlaylist className="
						text-neutral-400 h-6 w-6"/>

					<p 
						className="
						text-neutral-400 font-medium text-base">
						Your Library
					</p>

				</div>

				< AiOutlinePlus 
					className="
						text-neutral-400 h-6 w-6 cursor-pointer hover:text-white transition"
					onClick={handleClick}/>
			</div>

			<div 
				className="
				flex flex-col gap-y-2 mt-4 px-3"
			>
				{songs.map((song) => (
					<MediaItem 
						key={song.id} 
						data={song}
						onClick={(id: string) => {onPlay(id)}}/>
				))}
			</div>	
		</div>
	)
}

export default Librery