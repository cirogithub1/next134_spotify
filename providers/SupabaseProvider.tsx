"use client"

import { FC, ReactNode, useState } from "react"
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

import { Database } from "@/types_db"

interface Props {
	children: ReactNode
}

const SupabaseProvider: FC<Props> = ({ children }) => {
	const [supabaseClient] = useState(() => createPagesBrowserClient<Database>())
	return (
		<SessionContextProvider supabaseClient={supabaseClient}>
			{children}
		</SessionContextProvider>
	)
}

export default SupabaseProvider