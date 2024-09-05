import { useContext } from 'react'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'
import { save, remove } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant'

export default function useFavorite(styles) {
  const maxLen = 100
  const { favoriteList } = useContext(PlayMusicStateContext)
  const playDispath = useContext(PlayMusicDispatchContext)

  function getFavoriteIcon(song) {
    return isFavorite(song) ? styles.IconFavorite : styles.IconNotFavorite
  }

  function toggleFavorite(song) {
    let list
    if (isFavorite(song)) {
      list = remove(FAVORITE_KEY, compare)
    } else {
      list = save(song, FAVORITE_KEY, compare, maxLen)
    }
    playDispath({
      type: ACTIONS.SET_FAVORITE_LIST,
      payload: {
        favoriteList: list,
      },
    })

    function compare(item) {
      return item.id === song.id
    }
  }

  function isFavorite(song) {
    return favoriteList.findIndex((item) => {
      return item.id === song.id
    }) > -1
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}
