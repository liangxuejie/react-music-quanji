import styles from './style.module.scss'
import { useMemo, useContext } from 'react'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'
import useCd from '../hooks/useCd'
import useMiniSlider from '../hooks/useMiniSlider'

import ProgressCircle from '../ProgressCircle/ProgressCircle'
import cn from 'classnames'

const MiniPlayer = ({progressPercent, togglePlay}) => {
  const { playlist, currentIndex, fullScreen, playingState, playMode } = useContext(PlayMusicStateContext)
  const playDispath = useContext(PlayMusicDispatchContext)
  const { cdCls, cdRef, cdImageRef } = useCd(styles)
  const { sliderWrapperRef } = useMiniSlider()
 
  const currentSong = useMemo(() => {
    return playlist[currentIndex]
  }, [playlist, currentIndex])
  const miniPlayIcon = useMemo(() => {
    return playingState ? styles.IconPauseMini : styles.IconPlayMini
  }, [playingState])

  function showNormalPlayer() {
    playDispath({
      type: ACTIONS.SET_FULL_SCREEN,
      payload: {
        fullScreen: true,
      },
    })
  }
  function showPlaylist(e) {
    e.stopPropagation();
  }

  return (
    <>
      {!fullScreen && (
        <div className={styles.miniPlayer} onClick={showNormalPlayer}>
          <div className={styles.cdWrapper}>
            <div className={styles.cd} ref={(ref) => (cdRef.current = ref)}>
              <img
                ref={(ref) => (cdImageRef.current = ref)}
                width="40"
                height="40"
                src={currentSong.pic}
                className={cdCls}
              ></img>
            </div>
          </div>
          <div className={styles.sliderWrapper} ref={(ref) => (sliderWrapperRef.current = ref)}>
            <div className={styles.sliderGroup}>
              {playlist?.map((song) => {
                return (
                  <div className={styles.sliderPage} key={song.id}>
                    <h2 className={styles.name}>{song.name}</h2>
                    <p className={styles.desc}>{song.singer}</p>
                  </div>    
                )
              })}
            </div>
          </div>
          <div className={styles.control}>
            <ProgressCircle radius="32" progressPercent={progressPercent}>
              <i className={cn(styles.iconMini, miniPlayIcon)} onClick={togglePlay}></i>
            </ProgressCircle>
          </div>

          <div className={styles.control} onClick={showPlaylist}>
            <i className={styles.IconPlaylist}></i>
          </div>

          {/* <playlist ref="playlistRef"></playlist> */}
        </div>
      )}
    </>
  )
}

export default MiniPlayer
