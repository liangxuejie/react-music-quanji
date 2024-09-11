import styles from './style.module.scss'
import Switches from '@/base/Switches/Switches'
import { useState, useEffect, useMemo, useContext } from 'react'
import Scroll from '@/base/Scroll/Scroll'
import SongList from '@/base/SongList/SongList'
import { useNavigate } from 'react-router-dom'
import { PlayMusicDispatchContext, PlayMusicStateContext, ACTIONS } from '@/reducers/playMusic'

const UserCenter = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { favoriteList, playHistory, playlist } = useContext(PlayMusicStateContext)
  const playDispath = useContext(PlayMusicDispatchContext)
  const navigate = useNavigate()

  const currentList = useMemo(() => {
    return currentIndex === 0 ? favoriteList : playHistory
  }, [currentIndex, favoriteList, playHistory])
  const viewStyle = useMemo(() => {
    const bottom = playlist.length > 0 ? '60px' : '0'
    return {
      bottom
    }
  }, [playlist?.length])

  function back() {
    navigate(-1)
  }
  function switchItem(index) {
    setCurrentIndex(index)
  }
  function random() {
    playDispath({
      type: ACTIONS.RANDOM_PLAY,
      payload: {
        list: currentList,
      },
    })
  }
  function selectSong({ song }) {
    playDispath({
      type: ACTIONS.ADD_SONG,
      payload: {
        song: song,
      },
    })
  }

  return (
    <div 
      className={styles.userCenter}
      style={viewStyle}
      // v-no-result:[noResultText]="noResult"
    >
      <div className={styles.back} onClick={back}>
        <i className={styles.IconBack}></i>
      </div>
      <div className={styles.switchesWrapper}>
        <Switches
          items={['我喜欢的', '最近播放']}
          currentIndex={currentIndex}
          switchItem={switchItem}
        ></Switches>
      </div>
      <div className={styles.playBtn} onClick={random}>
        <i className={styles.IconPlay}></i>
        <span className={styles.text}>随机播放全部</span>
      </div>
      <div className={styles.listWrapper}>
        {currentIndex===0 && (
          <Scroll classNameP={styles.listScroll}>
            <div className={styles.listInner}>
              <SongList
                songs={favoriteList}
                selectItem={selectSong}
              ></SongList>
            </div>
          </Scroll>
        )}
        {currentIndex===1 && (
          <Scroll classNameP={styles.listScroll}>
            <div className={styles.listInner}>
              <SongList
                songs={playHistory}
                selectItem={selectSong}
              ></SongList>
            </div>
          </Scroll>
        )}
      </div>
    </div>
  )
}

export default UserCenter
