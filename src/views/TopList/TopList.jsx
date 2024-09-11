import styles from './style.module.scss'
import { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react'
import { getTopList } from '@/service/topList'
import useMountedState from '@/hooks/useMountedState'
import Loading from '@/base/Loading/Loading'
import Scroll from '@/base/Scroll/Scroll'
import storage from 'good-storage'
import { TOP_KEY } from '@/assets/js/constant'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ROUTES from '@/constants/routes'

const TopDetail = lazy(() => import('@/views/TopDetail/TopDetail'))
const TopList = () => {
  const isMounted = useMountedState()
  const [topList, setTopList] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
  function selectItem(item) {
    cacheSinger(item)
    navigate(`${ROUTES.TOPLIST}/${item.id}`, {state: { selectedData: item}})
  }
  function cacheSinger(item) {
    storage.session.set(TOP_KEY, item)
  }

  return (
    <>
      {!loading && (
        <div className={styles.topList}>
          <Scroll classNameP={styles.topListContent}>
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
          </Scroll>
          <Suspense fallback={null}>
            <Routes>
              <Route path=":id" element={<TopDetail/>} />
            </Routes>
          </Suspense>
        </div>
      )}
      {loading && (
        <Loading></Loading>
      )}
    </>
  )
}

export default TopList
