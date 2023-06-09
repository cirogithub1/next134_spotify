"use Client"

import { FC } from "react"
import { Song } from "@/types"
import useLoadImage from "@/hooks/useLoadImage"
import Image from "next/image"

interface Props {
	data: Song
	onClick?: (id:string) => void
}

const MediaItem: FC<Props> = ({ data , onClick }) => {
	const imageUrl = useLoadImage(data)

	const handleClick = () => {
		if (onClick) {
			return onClick(data.id)
		}

		// turn on player
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
								fill />

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