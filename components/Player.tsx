"use client"

import useGetSongById from '@/hooks/useGetSongById'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import usePlayer from '@/hooks/usePlayer'
import PlayerContent from './PlayerContent'

const Player = () => {
	const player = usePlayer()
	const { song } = useGetSongById(player.activeId)

	const songUrl = useLoadSongUrl(song!)
	// exclamation point is for typescript to know that songUrl could be null

	if (!song || !songUrl || !player.activeId) {
		return <div>Player Null</div>
	} 

	return (
		<div
			className='
				fixed bottom-0 bg-black w-full py-2 h-20 px-4'>
					<PlayerContent
						key={songUrl}
						song={song}
						songUrl={songUrl} />
		</div>
	)
}

export default Player