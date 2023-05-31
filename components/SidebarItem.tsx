import { FC, ReactNode } from 'react'
import { IconType } from "react-icons"
import Link from 'next/link'

interface Props {
	label: string,
	active: boolean,
	href: string,
	Icon: IconType
}

const SidebarItem: FC<Props> = ({ label, active, href, Icon }) => {
	return (
		<div>
			<Link 
				href={href}
				className={`
					flex flex-row h-auto items-center w-full gap-x-4 text-base font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1
					${active ? 'text-white' : ''}
				`}
			>
				<Icon className={`h-6 w-6 ${active ? 'text-white' : ''}`} />
				<p className="truncate w-full">
					{label}
				</p>
			</Link>
		</div>
	)
}

export default SidebarItem