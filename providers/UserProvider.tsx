// "use client"

import { FC, ReactNode } from "react"
import { MyUserContextProvider } from "@/hooks/useUser"

interface Props {
	children: ReactNode
}

const UserProvider: FC<Props> = ({ children }) => {
	return (
		<MyUserContextProvider>{children}</MyUserContextProvider>
	)
}

export default UserProvider