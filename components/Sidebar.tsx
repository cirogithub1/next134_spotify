"use client"

import { ReactNode, FC, useMemo } from "react"
import { usePathname } from "next/navigation" 

import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"

import { Box } from "./Box"
import SidebarItem from "./SidebarItem"
import Librery from "./Librery"
import { Song } from "@/types"
import usePlayer from "@/hooks/usePlayer"

interface Props {
	children: ReactNode
	songs: Song[]
}

const Sidebar: FC<Props> = ({ children, songs }) => {
	const pathname = usePathname()
	const player = usePlayer()

	const routes = useMemo(() => [
		{
			label: "Home",
			active: pathname !== "/search",
			href: "/",
			Icon: HiHome
		},
		{
			label: "Search",
			active: pathname === "/search",
			href: "/search",
			Icon: BiSearch
		}

	], [pathname])

	return (
		<div className={`flex h-full ${player.activeId && 'h-[calc(100%-80px)]'}`} >
			<div 
				className="
					hidden md:flex flex-col gap-y-2 h-full w-[300px] p-2"
			>
				<Box>
					<div 
						className="
							flex flex-col gap-y-4 px-5 py-4"
						>
							{routes.map((route) => (
								<SidebarItem 
									key={route.label}
									{...route}
								/>

							))}
					</div>
				</Box>

				<Box className="overflow-y-auto h-full">
					<Librery songs={songs} />
				</Box>
			</div>

			<main className="
				flex-1 h-full overflow-y-auto py-2">
				{children}
			</main>
		</div>
	)
}

export default Sidebar

