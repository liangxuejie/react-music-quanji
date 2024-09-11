import styles from './style.module.scss'
import { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react'
import { getTopList } from '@/service/topList'
import useMountedState from '@/hooks/useMountedState'
import Loading from '@/base/Loading/Loading'

const TopList = () => {
  const isMounted = useMountedState()
  const [topList, setTopList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const result = await getTopList()
      if (isMounted()) {
        setTopList(result.topList)
        setLoading(false)
      }
    }
    fetchData();
  }, [])
  function selectItem(singer) {
    // cacheSinger(singer)
    // navigate(`${ROUTES.SINGER}/${singer.id}`, {state: { selectedData: singer}})
  }

  return (
    <>
      {!loading && (
        <div className={styles.topList}>
          <div className={styles.topListContent}>
            <ul>
              {topList?.map((item) => {
                return (
                  <li key={item.id} className={styles.item} onClick={() => selectItem(item)}>
                      <div className={styles.icon}>
                        <img width="100" height="100" src={item.pic}></img>
                      </div>
                      <ul className={styles.songList}>
                        {item.songList?.map((song, index) => {
                          return (
                            <li key={song.id + index} className={styles.song}>
                                <span>{index + 1}. </span>
                                <span>{song.songName}-{song.singerName}</span>
                            </li>
                          )
                        })}
                      </ul>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
      {loading && (
        <Loading></Loading>
      )}
    </>
  )
}

export default TopList
