"use Client"

import { FC } from "react"
import Image from "next/image"

import { Song } from "@/types"
import useLoadImage from "@/hooks/useLoadImage"
import usePlayer from "@/hooks/usePlayer"

interface Props {
	data: Song
	onClick?: (id:string) => void
}

const MediaItem: FC<Props> = ({ data , onClick }) => {
	const player = usePlayer()
	const imageUrl = useLoadImage(data)

	const handleClick = () => {
		if (onClick) {
			return onClick(data.id)
		}

		return player.setId(data.id)
	}

	return (
		<div
			className="
				flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
			onClick={handleClick}>
				<div 
					className="
						relative rounded-md min-h-[47px] min-w-[47px] overflow-hidden">
							<Image 
								src={imageUrl || '/images/liked.png'}
								alt={imageUrl || '/images/liked.png'}
								className="object-cover"
								fill 
								sizes="100%"/>

				</div>

				<div 
					className="
						flex flex-col gap-y-1 overflow-hidden">
							<p className="text-white trumcate">
								{data.title}
							</p>

							<p className="text-neutral-400 text-sm truncate">
								{data.author}
							</p>
				</div>
		</div>
	)
}

export default MediaItem