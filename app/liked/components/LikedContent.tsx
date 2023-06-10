"use client"

import { Song } from "@/types"
import { FC } from "react"

interface Props {
	songs: Song[]
}

const LikedContent: FC<Props> = ({ songs }) => {
	return (
		<div>LikedContent</div>
	)
}

export default LikedContent