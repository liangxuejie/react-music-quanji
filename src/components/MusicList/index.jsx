import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo, useRef } from 'react'
import SongList from '@/base/SongList'

import styles from './style.module.scss'

const RESERVED_HEIGHT = 40
const MusicList = ({title, songs = [], pic, loading, rank}) => {
  const navigate = useNavigate()
  const bgImageRef = useRef(null)
  const imageHeight = useRef(0)
  const maxTranslateY = useRef(0)

  useEffect(() => {
    imageHeight.current = bgImageRef.current.clientHeight
    maxTranslateY.current = imageHeight.current - RESERVED_HEIGHT 
  }, [])
  const bgImageStyle = useMemo(() => {
    // const scrollY = state.scrollY
    let zIndex = 0
    let paddingTop = '70%'
    let height = 0
    // let translateZ = 0

    // if (scrollY > state.maxTranslateY) {
    //   zIndex = 10
    //   paddingTop = 0
    //   height = `${RESERVED_HEIGHT}px`
    //   translateZ = 1
    // }

    // let scale = 1
    // if (scrollY < 0) {
    //   scale = 1 + Math.abs(scrollY / state.imageHeight)
    // }
    return {
      zIndex,
      paddingTop,
      height,
      backgroundImage: `url(${pic})`,
      // transform: `scale(${scale})translateZ(${translateZ}px)`
    }
  }, [pic])
  const scrollStyle = useMemo(() => {
    // const bottom = this.playlist.length ? '60px' : '0'
    const bottom = '0'
    return {
      top: `${imageHeight.current}px`,
      bottom
    }
  }, [imageHeight.current])

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className={styles.musicList}>
      <div className={styles.back} onClick={goBack}>
        <i className={styles.IconBack}></i>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.bgImage} style={bgImageStyle} ref={(ref) => (bgImageRef.current = ref)}>
        <div className={styles.playBtnWrapper}
          // :style="playBtnStyle"
        >
          {songs.length > 0 && (
            <div className={styles.playBtn}
              // onClick={random}
              >
              <i className={styles.iconPlay}></i>
              <span className={styles.text}>随机播放全部</span>
            </div>
          )}
        </div>
        <div className={styles.filter}
          // :style="filterStyle"
        >
          <i className={styles.iconBack}></i>
        </div>
      </div>
      { !loading && (
        <div
          className={styles.list}
          style={scrollStyle}
          // :style="scrollStyle"
          // v-loading="props.loading"
          // v-no-result:[props.noResultText]="noResult"
          // :probe-type="3"
          // @scroll="onScroll"
        >
          <div className={styles.songListWrapper}>
            <SongList
              songs={songs}
              // @select="selectItem"
              rank={rank}
            ></SongList>
          </div>
        </div>
      )}
    </div>
  )
}

export default MusicList
