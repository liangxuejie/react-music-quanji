import { useContext } from 'react'
import { PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'
import { PLAY_KEY } from '@/assets/js/constant'
import { save } from '@/assets/js/array-store'

export default function usePlayHistory() {
  const maxLen = 200
  const playDispath = useContext(PlayMusicDispatchContext)

  function savePlay(song) {
    const songs = save(song, PLAY_KEY, (item) => {
      return item.id === song.id
    }, maxLen)

    playDispath({
      type: ACTIONS.SET_PLAY_HISTORY,
      payload: {
        playHistory: songs,
      },
    })
  }

  return {
    savePlay
  }
}
