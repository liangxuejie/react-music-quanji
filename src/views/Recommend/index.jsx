import { useState, useEffect } from 'react'
import { getRecommend } from '@/service/recommend'
import useMountedState from '@/hooks/useMountedState'
import Slider from '@/base/Slider'
import styles from './style.module.scss'

const Recommend = () => {
  const isMounted = useMountedState()
  const [sliders, setSliders] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const result = await getRecommend()
      if (isMounted()) {
        setSliders(result.sliders)
        // data.sliders = result.sliders
        // data.albums = result.albums
      }
    }
    fetchData();
  }, [])

  return (
    <div className={styles.recommend}>
      <div className={styles.recommendContent}>
        <div>
          <div className={styles.sliderWrapper}>
            <div className={styles.sliderContent}>
              { sliders?.length && (
                <Slider sliders={sliders}></Slider>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommend
