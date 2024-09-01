import { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { getRecommend } from '@/service/recommend'
import useMountedState from '@/hooks/useMountedState'
import ROUTES from '@/constants/routes'
import Slider from '@/base/Slider/Slider'
import Scroll from '@/base/Scroll/Scroll'
import storage from 'good-storage'
import { ALBUM_KEY } from '@/assets/js/constant'
import styles from './style.module.scss'

const Album = lazy(() => import('@/views/Album/Album'))
const Recommend = () => {
  const isMounted = useMountedState()
  const navigate = useNavigate()
  const [sliders, setSliders] = useState(null)
  const [albums, setAlbums] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const result = await getRecommend()
      if (isMounted()) {
        setSliders(result.sliders)
        setAlbums(result.albums)
      }
    }
    fetchData();
  }, [])
  const loading = useMemo(() => {
    return !sliders?.length && !albums?.length
  }, [sliders?.length, albums?.length])
  const selectItem = (album) => {
    cacheAlbum(album)
    navigate(`${ROUTES.RECOMMEND}/${album.id}`, {state: { selectedAlbum: album}})
  }
  const cacheAlbum = (album) => {
    storage.session.set(ALBUM_KEY, album)
  }

  return (
    <>
      {!loading && (
        <div className={styles.recommend}>
          <Scroll classNameP={styles.recommendContent}>
            <div>
              <div className={styles.sliderWrapper}>
                <div className={styles.sliderContent}>
                  { sliders?.length && (
                    <Slider sliders={sliders}></Slider>
                  )}
                </div>
              </div>
              <div className={styles.recommendList}>
                {!loading && <h1 className={styles.listTitle}>热门歌单推荐</h1> }
                <ul>
                  {albums?.map((item) => {
                    return (
                      <li 
                      className={styles.item}
                      key={item.id}
                      onClick={() => selectItem(item)}
                      >
                        <div className={styles.icon}>
                          <a href={item.link}>
                            <img width="60" height="60" src={item.pic}/>
                          </a>
                        </div>
                        <div className={styles.text}>
                          <div className={styles.name}>
                            {item.username}
                          </div>
                          <div className={styles.title}>
                            {item.title}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </Scroll>
          <Suspense fallback={null}>
            <Routes>
              <Route path=":albumId" element={<Album/>} />
            </Routes>
          </Suspense>
        </div>
      )}
    </>
  )
}

export default Recommend
