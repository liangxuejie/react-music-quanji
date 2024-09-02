import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'
import cn from 'classnames'
import useMode from './useMode'

import styles from './style.module.scss'

const Player = () => {
  const {playlist, currentIndex, fullScreen, playingState} = useContext(PlayMusicStateContext)
  const playDispath = useContext(PlayMusicDispatchContext)
  const { modeIcon, changeMode } = useMode()
  const audioRef = useRef(null)

  const [currentTime, setCurrentTime] = useState(0)
  const [songReady, setSongReady] = useState(0)
  
  const currentSong = useMemo(() => {
    return playlist[currentIndex]
  }, [playlist, currentIndex])
  const disableCls = useMemo(() => {
    return songReady ? '' : styles.disable
  }, [songReady])
  const playIcon = useMemo(() => {
    return playingState ? styles.IconPause : styles.IconPlay
  }, [playingState])

  useEffect(() => {
    if (!currentSong?.id || !currentSong?.url) {
      return
    }
    setCurrentTime(0)
    setSongReady(false)
    const audioEl = audioRef.current
    audioEl.src = currentSong.url
    audioEl.play()
    playDispath({
      type: ACTIONS.SET_PLAYING_STATE,
      payload: {
        playingState: true,
      },
    })
  }, [currentSong])

  function goBack() {
    playDispath({
      type: ACTIONS.SET_FULL_SCREEN,
      payload: {
        fullScreen: false,
      },
    })
  }
  function prev() {
  }
  function togglePlay() {
    if (!songReady) {
      return
    }
    playDispath({
      type: ACTIONS.SET_PLAYING_STATE,
      payload: {
        playingState: !playingState,
      },
    })
  }
  function ready() {
    if (songReady) {
      return
    }
    setSongReady(true)
    // playLyric()
    // savePlay(currentSong.value)
  }

  // console.log('playingState', playingState)
  return (
    <>
      {playlist.length > 0 && (
        <div className={styles.player}>
          {fullScreen && (
            <div className={styles.normalPlayer}>
              <div className={styles.background}>
                <img src={currentSong.pic}></img>
              </div>
              <div className={styles.top}>
                <div className={styles.back} onClick={goBack}>
                  <i className={styles.IconBack}></i>
                </div>
                <h1 className={styles.title}>{currentSong.name}</h1>
                <h2 className={styles.subtitle}>{currentSong.singer}</h2>
              </div>
              <div className={styles.middle}
                        // @touchstart.prevent="onMiddleTouchStart"
                        // @touchmove.prevent="onMiddleTouchMove"
                        // @touchend.prevent="onMiddleTouchEnd"
              >
                <div className={styles.middleLeft}>
                  <div className={styles.cdWrapper}
                    // ref="cdWrapperRef"
                  >
                    <div className={styles.cd}
                      // ref="cdRef"
                    >
                      <img className={styles.image} src={currentSong.pic}
                        // ref="cdImageRef"
                        // :class="cdCls"                   
                      ></img>
                    </div>
                  </div>
                  <div className={styles.playingLyricWrapper}>
                    {/* <div className={styles.playingLyric}>{playingLyric}</div> */}
                  </div>
                </div>

                <div className={styles.middleRight}>
                  {/* <div className={styles.back} onClick={goBack}>
                    <i className={styles.IconBack}></i>
                  </div>
                  <h1 className={styles.title}>{currentSong.name}</h1>
                  <h2 className={styles.subtitle}>{currentSong.singer}</h2> */}
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.dotWrapper}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  {/* <span class="dot" :class="{'active':currentShow==='cd'}"></span>
                  <span class="dot" :class="{'active':currentShow==='lyric'}"></span> */}
                </div>
                <div className={styles.progressWrapper}>
                  <span src={cn(styles.time, styles.timeLeft)}></span>
                  <div className={styles.progressBarWrapper}>
                    {/* <progress-bar
                      ref="barRef"
                      :progress="progress"
                      @progress-changing="onProgressChanging"
                      @progress-changed="onProgressChanged"
                    ></progress-bar> */}
                  </div>
                  <span src={cn(styles.time, styles.timeRight)}></span>
                </div>
                <div className={styles.operators}>
                  <div className={cn(styles.icon, styles.iconLeft)}>
                    <i onClick={changeMode} className={modeIcon}></i>
                  </div>
                  <div className={cn(styles.icon, styles.iconLeft, disableCls)}>
                    <i onClick={prev} className={styles.IconPrev}></i>
                  </div>
                  <div className={cn(styles.icon, styles.iconCenter, disableCls)}>
                    <i onClick={togglePlay} className={playIcon}></i>
                  </div>
                  <div className={cn(styles.icon, styles.iconRight, disableCls)}>
                    <i onClick={prev} className={styles.IconNext}></i>
                  </div>
                  <div className={cn(styles.icon, styles.iconRight, disableCls)}>
                    <i onClick={prev} className={styles.IconFavorite}></i>
                  </div>
                </div>
              </div>
            </div>
          )}
          <audio
            ref={(ref) => (audioRef.current = ref)}
            onCanPlay={ready}
            // @pause="pause"
            // @error="error"
            // @timeupdate="updateTime"
            // @ended="end"
          ></audio>
        </div>
      )}
    </>
  )
}

export default Player
