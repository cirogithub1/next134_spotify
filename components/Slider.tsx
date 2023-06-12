"use client"

import { FC } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

interface Props {
	value?: number
	onChange?: (value: number) => void
}

const Slider: FC<Props> = ({ value = 1, onChange }) => {
	const handleChange = (newValue: number[]) => {
		onChange?.(newValue[0])
	}

	return (
		<RadixSlider.Root
			className='
				relative flex items-center select-none touch-none w-full h-10'
			defaultValue={[1]}
			value={[value]}
			onValueChange={handleChange}
			max={1}
			step={.1}
			aria-label='Volume' >
				<RadixSlider.Track
					className='
						relative bg-neutral-800 grow rounded-full h-1'>
							<RadixSlider.Range 
								className='
									absolute bg-white rounded-full h-full'/>
				</RadixSlider.Track>
		</RadixSlider.Root>
	)
}

export default Slider