import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

BScroll.use(ObserveDOM)

const Scroll = ({ children, classNameP, styleP, click = true, probeType = 0, onScroll}, ref) => {
  const rootRef = useRef(null)
  const scroll = useRef(null)

  useImperativeHandle(ref, () => ({
    scroll: scroll.current
  }))

  useEffect(() => {
    const scrollVal = scroll.current = new BScroll(rootRef.current, {
      observeDOM: true,
      click,
      probeType
    })
    if (probeType > 0) {
      scrollVal.on('scroll', (pos) => {
        onScroll(pos)
      })
    }
    return () => {
      scroll.current.destroy()
    }
  }, [])

  return (
    <div className={classNameP} style={styleP} ref={(ref) => (rootRef.current = ref)}>
      {children}
    </div>
  )
}

export default forwardRef(Scroll);
