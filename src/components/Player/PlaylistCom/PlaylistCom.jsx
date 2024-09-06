import styles from './style.module.scss'
import cn from 'classnames'
import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'
import useMode from '../hooks/useMode'
import useFavorite from '../hooks/useFavorite'

const PlaylistCom = ({playlistShow, hidePlaylist}) => {
  const { playlist, currentIndex, fullScreen, playingState, playMode, sequenceList } = useContext(PlayMusicStateContext)
  const { modeIcon, modeText, changeMode } = useMode(styles)
  const { getFavoriteIcon, toggleFavorite } = useFavorite(styles)
  const removing = useRef(false)

  const currentSong = useMemo(() => {
    return playlist[currentIndex]
  }, [playlist, currentIndex])

  function getCurrentIcon(song) {
    if (song.id === currentSong.id) {
      return styles.IconPlay
    }
  }

  function showConfirm() {
    // confirmRef.value.show()
  }
  function selectItem(song) {
    // const index = playlist.value.findIndex((item) => {
    //   return song.id === item.id
    // })

    // store.commit('setCurrentIndex', index)
    // store.commit('setPlayingState', true)
  }
  function showAddSong() {
    // addSongRef.value.show()
  }
  function removeSong(e, song) {
    e.stopPropagation();
    // if (removing.value) {
    //   return
    // }
    // removing.value = true
    // store.dispatch('removeSong', song)
    // if (!playlist.value.length) {
    //   hide()
    // }
    // setTimeout(() => {
    //   removing.value = false
    // }, 300)
  }
  function stopPropagation() {
    // addSongRef.value.show()
  }

  return (
    <>
      {playlistShow && playlist.length > 0 && (
        <div className={styles.playlist} onClick={(e) => {hidePlaylist(e)}}>
          <div className={styles.listWrapper} onClick={(e) => {e.stopPropagation()}}>

            <div className={styles.listHeader}>
              <div className={styles.title}>
                <i className={cn(styles.icon, modeIcon)} onClick={changeMode}></i>
                <span className={styles.text}>{modeText}</span>
                <span className={styles.clear} onClick={showConfirm}>
                  <i className={styles.IconClear}></i>
                </span>
              </div>
            </div>

            <div className={styles.listContent}>
              <ul
              // ref="listRef"
              >
                {sequenceList?.map((song) => {
                  return (
                    <li 
                      className={styles.item}
                      key={song.id}
                      onClick={() => selectItem(song)}
                    >
                      <i className={cn(styles.current, getCurrentIcon(song))}></i>
                      <span className={styles.text}>{song.name}</span>
                      <span className={styles.favorite} onClick={() => toggleFavorite(song)}>
                        <i className={getFavoriteIcon(song)}></i>
                      </span>
                      <span className={removing ? cn(styles.delete, styles.disable) : styles.delete} onClick={(e) => {removeSong(e, song)}}>
                        <i className={styles.IconDelete}></i>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className={styles.listAdd}>
              <div className={styles.add} onClick={showAddSong}>
                <i className={styles.IconAdd}></i>
                <span className={styles.text}>添加歌曲到队列</span>
              </div>
            </div>

            <div className={styles.listFooter} onClick={(e) => {hidePlaylist(e)}}>
              <span>关闭</span>
            </div>

          </div>

          {/* <confirm
            ref="confirmRef"
            @confirm="confirmClear"
            text="是否清空播放列表？"
            confirm-btn-text="清空"
          ></confirm> */}

        </div>
      )}
    </>
  )
}

export default PlaylistCom
