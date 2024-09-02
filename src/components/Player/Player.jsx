import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'
import cn from 'classnames'
import useMode from './useMode'

import styles from './style.module.scss'

const Player = () => {
  const {playlist, currentIndex, fullScreen} = useContext(PlayMusicStateContext)
  const playDispath = useContext(PlayMusicDispatchContext)
  const { modeIcon, changeMode } = useMode()
  
  const currentSong = useMemo(() => {
    return playlist[currentIndex]
  }, [playlist, currentIndex])

  const goBack = () => {
    playDispath({
      type: ACTIONS.SET_FULL_SCREEN,
      payload: {
        fullScreen: false,
      },
    })
  }

  console.log('currentSong', currentSong)
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
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Player
