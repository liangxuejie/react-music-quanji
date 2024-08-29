import { useState, useEffect, useMemo } from 'react'
import { getRecommend } from '@/service/recommend'
import useMountedState from '@/hooks/useMountedState'
import Slider from '@/base/Slider'
import Scroll from '@/base/Scroll'
import styles from './style.module.scss'

const Recommend = () => {
  const isMounted = useMountedState()
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

  return (
    <>
      {!loading && (
        <div className={styles.recommend}>
          <Scroll>
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
                      // @click="selectItem(item)"
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
        </div>
      )}
    </>
  )
}

export default Recommend
