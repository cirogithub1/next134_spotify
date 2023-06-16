"use client"

import uniqid from "uniqid"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"

import { useUser } from "@/hooks/useUser"

import useUploadModal from "@/hooks/useUploadModal"
import Modal from "./Modal"

import Input from "./Input"
import Button from "./Button"

const UploadModal = () => {
	const uploadModal = useUploadModal()	
	const { user } = useUser()
	const supabaseClient = useSupabaseClient()
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(false)

	const { register, handleSubmit, reset } = useForm<FieldValues>({
		defaultValues: {
			author: '',
			title: '',
			song: null,
			image: null
		}
	})

	const onChange = (open: boolean) => {
		if (!open) {
			reset()
			uploadModal.onClose()
		}
	}

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {

		const toastId = toast.loading('Loading...')
		
		try {
			setIsLoading(true)
			const imageFile = await values.image?.[0]
			const songFile = await values.song?.[0]

			if (!values.image?.[0] || !values.song?.[0] || !user) {
				toast.error("Some missing fields")
				setIsLoading(false)
				return
			}
			
			const uniqId = uniqid()

			//Upload song TO THE BUCKET SONGS
			const { data: songData, error: songError } = await supabaseClient
				.storage
				.from("songs")
				.upload(
					`song-${values.title}-${uniqId}`, 
					songFile,
					{
						cacheControl: "3600",
						upsert: false
					}
				)
			
			if (songError) {
				setIsLoading(false)
				toast.dismiss(toastId)
				return toast.error("Fail uploading song")
			}

			//Upload image TO THE BUCKET IMAGES
			const { data: imageData, error: imageError } = await supabaseClient
				.storage
				.from("images")
				.upload(
					`image-${values.title}-${uniqId}`, 
					imageFile,
					{
						cacheControl: "3600",
						upsert: false
					}
				)
			
			if (imageError) {
				setIsLoading(false)
				toast.dismiss(toastId)
				return toast.error("Fail uploading image")
			}

			// create the song record for the user in THE TABLE SONGS
			const { error: supabaseError } = await supabaseClient
				.from('songs')
				.insert({
					user_id: user.id,
					title: values.title,
					author: values.author,
					image_path: imageData.path,
					song_path: songData.path
				})

			if (supabaseError) {
				setIsLoading(false)
				toast.dismiss(toastId)
				console.log('/components/UploadModal.tsx supabaseError: ', supabaseError)
				return toast.error(supabaseError.message)
			}

			//If everything went well, refresh the page
			router.refresh()
			setIsLoading(false)
			toast.dismiss(toastId)
			toast.success("Song uploaded successfully")
			reset()
			uploadModal.onClose()


		} catch (error) {
			toast.dismiss(toastId)
			toast.error("Something went wrong")
		} finally {
			toast.dismiss(toastId)
			setIsLoading(false)
		}
	}

	return (
		<Modal
			title="Add a song"
			description="Upload a mp3 file"
			isOpen={uploadModal.isOpen}
			onChange={onChange}>
				<form 
					className="Form flex flex-col gap-y-4"
					onSubmit={handleSubmit(onSubmit)}>
						<Input
							id="title"
							disabled={isLoading}
							{...register("title", { required: true })}
							placeholder="Song Title" />

						<Input
							id="author"
							disabled={isLoading}
							{...register("author", { required: true })}
							placeholder="Song author" />

						<div>
							<div className="pb-1">
								Select a song
							</div>
							
							<Input
								id= "song"
								type= "file"
								disabled={isLoading}
								accept= ".mp3"
								{...register("song", { required: true })} />
						</div>

						<div>
							<div className="pb-1">
								Select an image
							</div>

							<Input
								id= "image"
								type= "file"
								disabled={isLoading}
								accept= "image/*"
								{...register("image", { required: true })} />
						</div>

						<Button 
							disabled={isLoading} 
							type="submit"
							onClick={onSubmit}>
								Upload
						</Button>
				</form>
		</Modal>
	)
}

export default UploadModal