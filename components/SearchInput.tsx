"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import qs from "query-string"

import useDenbounce from '@/hooks/useDenbounce'
import Input from './Input'

const SearchInput = () => {
	const router = useRouter()
	const [value, setValue] = useState<string>("")
	const debounceValue = useDenbounce<string>(value, 500)

	useEffect(() => {
		const query = {
			title: debounceValue
		}

		const url = qs.stringifyUrl({
			url: '/search',
			query: query
		})

		router.push(url)

	}, [debounceValue, router])

	return (
		<Input 
			placeholder='I want to listen to...'
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	)
}

export default SearchInput