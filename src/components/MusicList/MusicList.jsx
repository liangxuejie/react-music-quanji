import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import SongList from '@/base/SongList/SongList'
import Scroll from '@/base/Scroll/Scroll'
import Loading from '@/base/Loading/Loading'
import { PlayMusicDispatchContext, PlayMusicStateContext, ACTIONS } from '@/reducers/playMusic'
import styles from './style.module.scss'

const RESERVED_HEIGHT = 40
const MusicList = ({title, songs, pic, loading, rank}) => {
  const navigate = useNavigate()
  const bgImageRef = useRef(null)
  const imageHeight = useRef(0)
  const maxTranslateY = useRef(0)
  const [scrollY, setScrollY] = useState(0)
  const playDispath = useContext(PlayMusicDispatchContext)
  const { playlist } = useContext(PlayMusicStateContext)
  
  useEffect(() => {
    imageHeight.current = bgImageRef.current.clientHeight
    maxTranslateY.current = imageHeight.current - RESERVED_HEIGHT 
  }, [])
  const bgImageStyle = useMemo(() => {
    const scrollYC = scrollY
    let zIndex = 0
    let paddingTop = '70%'
    let height = 0
    let translateZ = 0

    if (scrollYC > maxTranslateY.current) {
      zIndex = 10
      paddingTop = 0
      height = `${RESERVED_HEIGHT}px`
      translateZ = 1
    }

    let scale = 1
    if (scrollYC < 0) {
      scale = 1 + Math.abs(scrollYC / imageHeight.current)
    }
    return {
      zIndex,
      paddingTop,
      height,
      backgroundImage: `url(${pic})`,
      transform: `scale(${scale})translateZ(${translateZ}px)`
    }
  }, [scrollY, maxTranslateY.current, imageHeight.current, pic])
  const playBtnStyle = useMemo(() => {
    let display = ''
    if (scrollY >= maxTranslateY.current) {
      display = 'none'
    }
    return {
      display
    }
  }, [scrollY, maxTranslateY.current])
  const filterStyle = useMemo(() => {
    let blur = 0
    if (scrollY >= 0) {
      blur = Math.min(maxTranslateY.current / imageHeight.current, scrollY / imageHeight.current) * 20
    }
    return {
      backdropFilter: `blur(${blur}px)`
    }
  }, [scrollY, maxTranslateY.current, imageHeight.current])
  const scrollStyle = useMemo(() => {
    const bottom = playlist.length > 0 ? '60px' : '0'
    return {
      top: `${imageHeight.current}px`,
      bottom
    }
  }, [playlist?.length, imageHeight.current])

  function goBack() {
    navigate(-1)
  }
  function onScroll(pos) {
    setScrollY(-pos.y)
  }
  function selectItem({song, index}) {
    playDispath({
      type: ACTIONS.SELECT_PLAY,
      payload: {
        list: songs,
        index,
      },
    })
  }
  function random() {
    playDispath({
      type: ACTIONS.RANDOM_PLAY,
      payload: {
        list: songs,
      },
    })
  }

  return (
    <div className={styles.musicList}>
      <div className={styles.back} onClick={goBack}>
        <i className={styles.IconBack}></i>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.bgImage} style={bgImageStyle} ref={(ref) => (bgImageRef.current = ref)}>
        <div className={styles.playBtnWrapper} style={playBtnStyle}>
          {songs.length > 0 && (
            <div className={styles.playBtn} onClick={random}>
              <i className={styles.iconPlay}></i>
              <span className={styles.text}>随机播放全部</span>
            </div>
          )}
        </div>
        <div className={styles.filter} style={filterStyle}>
          <i className={styles.iconBack}></i>
        </div>
      </div>
      {!loading && (
        <Scroll
          classNameP={styles.list}
          styleP={scrollStyle}
          probeType={3}
          onScroll={onScroll}
          // v-no-result:[props.noResultText]="noResult"
        >
          <div className={styles.songListWrapper}>
            <SongList
              songs={songs}
              selectItem={selectItem}
              rank={rank}
            ></SongList>
          </div>
        </Scroll>
      )}
      {loading && (
        <div className={styles.loadingWrap}>
          <Loading></Loading>
        </div>
      )}
    </div>
  )
}

export default MusicList
