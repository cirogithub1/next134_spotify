"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { FaPlay } from 'react-icons/fa'

interface Props {
	image: string
	name: string
	href: string
}

const ListItem: FC<Props> = ({image, name, href}) => {

	const router = useRouter()

	const handleClick = () => {
		router.push(href)
	}

	return (
		<button 
			className="
				flex relative group items-center rounded-md overflow-hidden pr-4 gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition"
		>
			<div className="relative min-h-[56px] min-w-[56px]">
				<Image
					className='
						object-cover p-0'
					fill
					src={image}
					alt={name}
					sizes='20'
					placeholder="blur"
					blurDataURL={image} 
				/>
			</div>

			<p className="font-medium truncate py-4">
				{name}
			</p>

			<div
				className="
					absolute flex opacity-0 rounded-full items-center justify-center bg-green-500 p-4 drop-shadow-md right-2 group-hover:opacity-100 hover:scale-105 transition"
				onClick={handleClick}
			>
				<FaPlay className="text-black" />
			</div>
		</button>
	)
}

export default ListItem