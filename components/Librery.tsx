"use client"

import { FC } from "react"
import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import useUploadModal from "@/hooks/useUploadModal"
import { Song } from "@/types"
import MediaItem from "./MediaItem"

interface Props {
	songs: Song[]
}

const Librery: FC<Props> = ({ songs }) => {
	const authModal = useAuthModal()
	const { user } = useUser()
	const uploadModal = useUploadModal()

	const handleClick = () => {	 
		if (!user) {
			return authModal.onOpen()
		}

		// for later: check supscriptions
		uploadModal.onOpen()
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
						onClick={() => {}}/>
				))}
			</div>	
		</div>
	)
}

export default Librery