import styles from './style.module.scss'
import { useMemo } from 'react'

const ProgressCircle = ({children, radius = 100, progressPercent = 0}) => {
  
  const dashArray = Math.PI * 100
  const dashOffset = useMemo(() => {
    return (1 - progressPercent) * dashArray
  }, [progressPercent])

  return (
    <div className={styles.progressCircle}>
      <svg 
        width={radius}
        height={radius}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.progressBackground}
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
        ></circle>
        <circle
          className={styles.progressBar}
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        ></circle>
      </svg>
      {children}
    </div>
  )
}

export default ProgressCircle
