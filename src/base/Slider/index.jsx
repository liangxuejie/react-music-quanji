import { useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import styles from './style.module.scss'

BScroll.use(Slide)
const Slider = ({ sliders }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const rootRef = useRef(null)
  const slider = useRef(null)

  useEffect(() => {
    const sliderVal = slider.current = new BScroll(rootRef.current, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true
    })
    sliderVal.on('slideWillChange', (page) => {
      setCurrentPageIndex(page.pageX)
    })

    return () => {
      slider.current.destroy()
    }
  }, [])

  return (
    <div className={styles.slider} ref={(ref) => (rootRef.current = ref)}>
      <div className={styles.sliderGroup}>
        {sliders?.map((item) => {
          return (
            <div className={styles.sliderPage} key={item.id}>
              <a href={item.link}>
                <img src={item.pic}/>
              </a>
            </div>
          )
        })}
      </div>
      <div className={styles.dotsWrapper}>
        {sliders?.map((item, index) => {
          return (
            <span
              className={ currentPageIndex === index ? cn(styles.dot, styles.active) : styles.dot } 
              key={item.id}
            >
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default Slider
