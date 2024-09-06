import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'
import { formatTime } from '@/assets/js/util'
import Scroll from '@/base/Scroll/Scroll'
import cn from 'classnames'
import { PLAY_MODE } from '@/assets/js/constant'
import ProgressBar from './ProgressBar/ProgressBar'
import MiniPlayer from './MiniPlayer/MiniPlayer'
import useMode from './hooks/useMode'
import useCd from './hooks/useCd'
import useMiddleInteractive from './hooks/useMiddleInteractive'
import useLyric from './hooks/useLyric'
import useFavorite from './hooks/useFavorite'
import usePlayHistory from './hooks/usePlayHistory'

import styles from './style.module.scss'

const Player = () => {
  const { playlist, currentIndex, fullScreen, playingState, playMode } = useContext(PlayMusicStateContext)
  const playDispath = useContext(PlayMusicDispatchContext)
  const { modeIcon, changeMode } = useMode(styles)
  const { cdCls, cdRef, cdImageRef } = useCd(styles)
  const { currentShow, middleLStyle, middleRStyle, onMiddleTouchStart, onMiddleTouchMove, onMiddleTouchEnd } = useMiddleInteractive()
  const { getFavoriteIcon, toggleFavorite } = useFavorite(styles)
  const { savePlay } = usePlayHistory()

  const audioRef = useRef(null)
  const barRef = useRef(null)
  const progressChanging = useRef(false)

  const [currentTime, setCurrentTime] = useState(0)
  const [songReady, setSongReady] = useState(false)
  const { curLyricLines, currentLineNum, pureMusicLyric, playingLyric, lyricScrollRef, lyricListRef, playLyric, stopLyric } = useLyric({
    songReady
  })

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
      playLyric(currentTime)
    } else {
      audioEl.pause()
      stopLyric()
    }
  }, [playingState, songReady])
  useEffect(() => {
    if (fullScreen) {
      // barRef.current.setOffsetFn(progressPercent)
    }
  }, [fullScreen])

  function goBack() {
    playDispath({
      type: ACTIONS.SET_FULL_SCREEN,
      payload: {
        fullScreen: false,
      },
    })
  }
  function togglePlay(e) {
    e.stopPropagation();
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
    playLyric(currentTime)
    savePlay(currentSong)
  }
  function onProgressChanging(progressPer) {
    progressChanging.current = true
    const curTime = currentSong?.duration * progressPer
    setCurrentTime(curTime)
    playLyric(curTime)
    stopLyric()
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
    playLyric(curTime)
  }

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
                   onTouchStart={onMiddleTouchStart}
                   onTouchMove={onMiddleTouchMove}
                   onTouchEnd={onMiddleTouchEnd}
              >
                <div className={styles.middleLeft} style={middleLStyle}>
                  <div className={styles.cdWrapper}
                    // ref="cdWrapperRef"
                  >
                    <div className={styles.cd} ref={(ref) => (cdRef.current = ref)}>
                      <img className={cn(styles.image, cdCls)} src={currentSong.pic} ref={(ref) => (cdImageRef.current = ref)}></img>
                    </div>
                  </div>
                  <div className={styles.playingLyricWrapper}>
                    <div className={styles.playingLyric}>{playingLyric}</div>
                  </div>
                </div>
                <Scroll 
                  classNameP={styles.middleRight} 
                  styleP={middleRStyle} 
                  ref={(ref) => (lyricScrollRef.current = ref)}
                >
                  <div className={styles.lyricWrapper}>
                    {curLyricLines.length > 0 && (
                      <div ref={(ref) => (lyricListRef.current = ref)}>
                        {curLyricLines.map((line, index) => {
                          return (
                            <p key={line.time} className={styles.text} className={currentLineNum === index ? cn(styles.text, styles.current) : styles.text}>
                              {line.txt}
                            </p>
                          )
                        })}
                      </div>
                    )}
                    {pureMusicLyric && (
                      <div className={styles.pureMusic}>
                        <p>{pureMusicLyric}</p>
                      </div>
                    )}
                  </div>
                </Scroll>
              </div>
              <div className={styles.bottom}>
                <div className={styles.dotWrapper}>
                  <span className={currentShow==='cd' ? cn(styles.dot, styles.active) : styles.dot}></span>
                  <span className={currentShow==='lyric' ? cn(styles.dot, styles.active) : styles.dot}></span>
                </div>
                <div className={styles.progressWrapper}>
                  <span className={cn(styles.time, styles.timeLeft)}>{formatTime(currentTime)}</span>
                  <div className={styles.progressBarWrapper}>
                    <ProgressBar
                      // ref={(ref) => (barRef.current = ref)}
                      progressPercent={progressPercent}
                      onProgressChanged={onProgressChanged}
                      onProgressChanging={onProgressChanging}
                    ></ProgressBar>
                  </div>
                  <span className={cn(styles.time, styles.timeRight)}>{formatTime(currentSong?.duration)}</span>
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
                  <div className={cn(styles.icon, styles.iconRight)}>
                    <i onClick={() => {toggleFavorite(currentSong)}} className={getFavoriteIcon(currentSong)}></i>
                  </div>
                </div>
              </div>
            </div>
          )}
          <MiniPlayer progressPercent={progressPercent} togglePlay={togglePlay}></MiniPlayer>
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
