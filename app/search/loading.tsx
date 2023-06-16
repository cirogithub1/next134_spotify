"use client"

import { CircleLoader } from "react-spinners"
import { Box } from "@/components/Box"

const Loading = () => {
	return (
		<Box
			className="flex h-full items-center justify-center">
				<CircleLoader 
					color='yellow'
					loading={true}
					size={25}
					aria-label="Loading Spinner"
					data-testid="loader"/>

		</Box>
	)
}

export default Loading