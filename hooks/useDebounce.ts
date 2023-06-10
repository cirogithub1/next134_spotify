
// this is for waiting 500 ms after the user had tipped the last charater to initiate the search
// this is to prevent the search from being called too often.
// this hook is used in the SearchBar component.
"use client"

import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay?: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
		
		// on the unmount of the component, we clear the time for preventing overload
		return () => {clearTimeout(timer)}
	}, [delay, value])

	return debouncedValue

}

export default useDebounce