import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'
import cn from 'classnames'
import ProgressBar from './ProgressBar/ProgressBar'

import useMode from './useMode'

import styles from './style.module.scss'

const Player = () => {
  const { playlist, currentIndex, fullScreen, playingState, playMode } = useContext(PlayMusicStateContext)
  const playDispath = useContext(PlayMusicDispatchContext)
  const { modeIcon, changeMode } = useMode()
  const audioRef = useRef(null)
  const progressChanging = useRef(false)

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
  const progressPercent = useMemo(() => {
    return currentTime / currentSong?.duration
  }, [currentTime, currentSong])

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
  useEffect(() => {
    if (!songReady) {
      return
    }
    const audioEl = audioRef.current
    if (playingState) {
      audioEl.play()
      // playLyric()
    } else {
      audioEl.pause()
      // stopLyric()
    }
  }, [playingState])

  function goBack() {
    playDispath({
      type: ACTIONS.SET_FULL_SCREEN,
      payload: {
        fullScreen: false,
      },
    })
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
  function pause() {
    playDispath({
      type: ACTIONS.SET_PLAYING_STATE,
      payload: {
        playingState: false,
      },
    })
  }
  function error() {
    setSongReady(true)
  }
  function updateTime(e) {
    if (!progressChanging.current) {
      setCurrentTime(e.target.currentTime)
    }
  }
  function end() {
    setCurrentTime(0)
    if (playMode === PLAY_MODE.loop) {
      loop()
    } else {
      next()
    }
  }
  function prev() {
    const list = playlist
    if (!songReady || !list.length) {
      return
    }

    if (list.length === 1) {
      loop()
    } else {
      let index = currentIndex - 1
      if (index === -1) {
        index = list.length - 1
      }
      playDispath({
        type: ACTIONS.SET_CURRENT_INDEX,
        payload: {
          currentIndex: index,
        },
      })
    }
  }
  function next() {
    const list = playlist
    if (!songReady || !list.length) {
      return
    }

    if (list.length === 1) {
      loop()
    } else {
      let index = currentIndex + 1
      if (index === list.length) {
        index = 0
      }
      playDispath({
        type: ACTIONS.SET_CURRENT_INDEX,
        payload: {
          currentIndex: index,
        },
      })
    }
  }
  function loop() {
    const audioEl = audioRef.current
    audioEl.currentTime = 0
    audioEl.play()
    playDispath({
      type: ACTIONS.SET_PLAYING_STATE,
      payload: {
        playingState: true,
      },
    })
  }
  function ready() {
    if (songReady) {
      return
    }
    setSongReady(true)
    // playLyric()
    // savePlay(currentSong)
  }
  function toggleFavorite() {
  }
  function onProgressChanged(progressPer) {
    progressChanging.current = false
    const curTime = currentSong?.duration * progressPer
    setCurrentTime(curTime)
    audioRef.current.currentTime = curTime
    if (!playingState) {
      playDispath({
        type: ACTIONS.SET_PLAYING_STATE,
        payload: {
          playingState: true,
        },
      })
    }
    // playLyric()
  }
  function onProgressChanging(progressPer) {
    progressChanging.current = true
    const curTime = currentSong?.duration * progressPer
    setCurrentTime(curTime)
    // playLyric()
    // stopLyric()
  }

  console.log('playingState', playingState)
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
                    <ProgressBar
                      // ref="barRef"
                      progressPercent={progressPercent}
                      onProgressChanged={onProgressChanged}
                      onProgressChanging={onProgressChanging}
                    ></ProgressBar>
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
                    <i onClick={next} className={styles.IconNext}></i>
                  </div>
                  <div className={cn(styles.icon, styles.iconRight, disableCls)}>
                    <i onClick={toggleFavorite} className={styles.IconFavorite}></i>
                  </div>
                </div>
              </div>
            </div>
          )}
          <audio
            ref={(ref) => (audioRef.current = ref)}
            onCanPlay={ready}
            onPause={pause}
            onError={error}
            onTimeUpdate={updateTime}
            onEnded={end}
          ></audio>
        </div>
      )}
    </>
  )
}

export default Player
