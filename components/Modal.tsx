import { FC, ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io' 

interface Props {
	isOpen: boolean
	title: string
	onChange: (open: boolean) => void
	description: string
	children: ReactNode
}

const { Portal, Overlay, Content, Title, Description, Close } = Dialog

const Modal: FC<Props> = ({ isOpen,	title, onChange,	description, children }) => {
	return (
		<Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
			<Portal>
				<Overlay 
					className='
						bg-neutral-900/70 backdrop-blur-sm fixed inset-0' />
				
				<Content
					className='
						fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full w-full md:h-auto md:max-h-[84vh] md:w-[91vw] md:max-w-[451px] translate-x-[-50%] translate-y-[-50%] bg-neutral-800 p-6 rounded-md'
				>
					<Title
						className='
							text-xl text-center font-bold mb-4'>
						{title}
					</Title>

					<Description 
						className='
							mb-5 text-sm leading-normal text-center'>
						{description}
					</Description>

					<div className="Children">
						{children}
					</div>

					<Close asChild>
						<button 
							className="
								absolute text-neutral-400 top-3 right-3 inline-flex h-6 w-6 appearance-none hover:text-white"
							onClick={() => onChange(false)}	
						>
							<IoMdClose className='text-xl' />
						</button>
					</Close>
				</Content>
			</Portal>

		</Dialog.Root>
	)
}

export default Modal