import styles from './style.module.scss'
import React from 'react'
const { useEffect } = React
import { getRecommend } from '@/service/recommend'


const Recommend = () => {
  useEffect(() => {
    const result = getRecommend()
    console.log("result", result)
  }, [])

  return (
    <div className={styles.header}>
      Recommend
    </div>
  )
}

export default Recommend
