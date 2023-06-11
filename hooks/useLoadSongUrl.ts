import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongUrl = (song: Song) => {
	// const { supabaseClient } = useSessionContext()

	const supabaseClient = useSupabaseClient()
	// useSupabaseClient when user does not have to be authenticated

	if (!song) {
		return ""
	}

	try {
		const { data: songData } = supabaseClient
			.storage
			.from('songs')
			.getPublicUrl(song.song_path)
	
		return songData.publicUrl

	} catch (error) {
		console.log('/hooks/useLoadSong.ts/ error', error)
	}
}

export default useLoadSongUrl