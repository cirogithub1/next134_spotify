"use Client"

import { FC } from "react"
import { Song } from "@/types"
import useLoadImage from "@/hooks/useLoadImage"

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
		<div>
			{data.title}
		</div>
	)
}

export default MediaItem