"use client"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"

import useUploadModal from "@/hooks/useUploadModal"
import Modal from "./Modal"
import Input from "./Input"

const UploadModal = () => {
	const { isOpen, onClose } = useUploadModal()	

	const [isLoading, setIsLoading] = useState(false)

	const { register, handleSubmit, reset } = useForm<FieldValues>(
		{
			defaultValues: {
			author: '',
			title: '',
			song: null,
			image: null
		}}
	)

	const handleChange = (open: boolean) => {
		if (!open) {
			reset()
			onClose()
		}
	}

	const onFormSubmit: SubmitHandler<FieldValues> = async (values) => {
		// upload to supabase
	}

	return (
		<Modal
			title="Add a song"
			description="Upload a mp3 file"
			isOpen={isOpen}
			onChange={handleChange}>
				<form 
					className="Form"
					onSubmit={handleSubmit(onFormSubmit)}>
						<Input
							id="title"
							disabled={isLoading}
							{...register("title", { required: true })}
							placeholder="Song Title"
						/>

				</form>
				
		</Modal>
	)
}

export default UploadModal