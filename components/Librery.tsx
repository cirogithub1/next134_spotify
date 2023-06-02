"use client"
import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"

const Librery = () => {

	const handlerClick = () => {	 
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
					onClick={handlerClick}/>
			</div>

			<div 
				className="
				flex flex-col gap-y-2 mt-4 px-3"
			>
				List of songs
			</div>	
		</div>
	)
}

export default Librery