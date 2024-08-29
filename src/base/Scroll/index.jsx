import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { useEffect, useRef } from 'react'
import styles from './style.module.scss'

BScroll.use(ObserveDOM)

const Scroll = ({children, click = true, probeType = 0, onScroll}) => {
  const rootRef = useRef(null)
  const scroll = useRef(null)

  useEffect(() => {
    const scrollVal = scroll.current = new BScroll(rootRef.current, {
      observeDOM: true,
      click,
      probeType
    })
    if (probeType > 0) {
      scrollVal.on('scroll', (pos) => {
        scroll && onScroll()
      })
    }

    return () => {
      scroll.current.destroy()
    }
  }, [click, probeType])

  return (
    <div className={styles.scrollContent} ref={(ref) => (rootRef.current = ref)}>
      {children}
    </div>
  )
}

export default Scroll
