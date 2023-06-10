"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import qs from "query-string"

import useDebounce from '@/hooks/useDebounce'
import Input from './Input'

const SearchInput = () => {
	const router = useRouter()
	const [value, setValue] = useState<string>("")
	const debounceValue = useDebounce<string>(value, 500)

	useEffect(() => {
		const query = {
			title: debounceValue
		}

		// this gona set the URL to /search?title=
		const url = qs.stringifyUrl({
			url: '/search',
			query: query
		})

		router.push(url)

	}, [debounceValue, router])

	return (
		<Input 
			placeholder='I wanna listen to...'
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	)
}

export default SearchInput