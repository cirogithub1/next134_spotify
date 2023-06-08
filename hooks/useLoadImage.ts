import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (song: Song) => {
	const supabaseClient = useSupabaseClient()

	if (!song) {
		return null
	}

	try {
		const { data: imageData } = supabaseClient
			.storage
			.from('images')
			.getPublicUrl(song.image_path)
		
			return imageData.publicUrl

	} catch (error) {
		console.log("/hooks/useLoadImage", error)	
	}

}

export default useLoadImage