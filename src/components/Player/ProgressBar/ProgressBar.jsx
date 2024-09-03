import styles from './style.module.scss'
import { useState, useEffect, useMemo, useRef } from 'react'

const progressBtnWidth = 16
const ProgressBar = ({progressPercent = 0, onProgressChanged, onProgressChanging}) => {
  const progressBarRef = useRef(null)
  const progressRef = useRef(null)
  const touch = useRef({})
  const [offset, setOffset] = useState(0)

  const progressStyle = useMemo(() => {
    return {
      width: `${offset}px`
    }
  }, [offset])
  const btnStyle = useMemo(() => {
    return {
      transform: `translate3d(${offset}px,0,0)`
    }
  }, [offset])

  useEffect(() => {
    setOffsetFn(progressPercent)
  }, [progressPercent])

  function setOffsetFn(progressPercent) {
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth
    setOffset(barWidth * progressPercent)
  }
  function onClick(e) {
    const rect = progressBarRef.current.getBoundingClientRect()
    const offsetWidth = e.pageX - rect.left
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth
    const progressPer = offsetWidth / barWidth
    onProgressChanged(progressPer)
  }
  function onTouchStart(e) {
    setTimeout(() => {
      e.preventDefault();
    }, 0);
    touch.current.x1 = e.touches[0].pageX
    touch.current.beginWidth = progressRef.current.clientWidth
  }
  function onTouchMove(e) {
    Promise.resolve(() => {
      e.preventDefault();
    });
    const delta = e.touches[0].pageX - touch.current.x1
    const tempWidth = touch.current.beginWidth + delta
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth
    const progressPer = Math.min(1, Math.max(tempWidth / barWidth, 0))
    setOffset(barWidth * progressPer)
    onProgressChanging(progressPer)
  }
  function onTouchEnd(e) {
    e.preventDefault();
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth
    const progressPer = progressRef.current.clientWidth / barWidth
    onProgressChanged(progressPer)
  }
  
  return (
    <div className={styles.progressBar} onClick={onClick} ref={(ref) => (progressBarRef.current = ref)}>
      <div className={styles.barInner}>
        <div className={styles.progress} style={progressStyle} ref={(ref) => (progressRef.current = ref)}></div>
        <div 
          className={styles.progressBtnWrapper} 
          style={btnStyle}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className={styles.progressBtn}></div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
