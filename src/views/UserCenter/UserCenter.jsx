import styles from './style.module.scss'
import Switches from '@/base/Switches/Switches'
import { useState, useEffect, useMemo, useContext } from 'react'

const UserCenter = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  function back() {
    // this.$router.back()
  }
  function switchItem(index) {
    setCurrentIndex(index)
  }

  return (
    <div 
      className={styles.userCenter}
      // v-no-result:[noResultText]="noResult"
    >
      <div className={styles.back} onClick={back}>
        <i className={styles.IconBack}></i>
      </div>
      <div className={styles.switchesWrapper}>
        <Switches
          items={['我喜欢的', '最近播放']}
          currentIndex={currentIndex}
          switchItem={switchItem}
        ></Switches>
      </div>
    </div>
  )
}

export default UserCenter
