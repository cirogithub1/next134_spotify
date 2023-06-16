import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export async function middleware(req:NextRequest) {
	const res = NextResponse.next()
	
	const supabase = createMiddlewareClient({
		req,
		res
	})

	await supabase.auth.getSession()
	return res
}

export const useBearStore = create(
  persist(
    (set: any, get: any) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)