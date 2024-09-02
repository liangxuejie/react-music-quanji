import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import { PlayMusicStateContext } from '@/reducers/playMusic'

import styles from './style.module.scss'

const Player = () => {
  const playState = useContext(PlayMusicStateContext)
  console.log('playState', playState)

  return (
    <div className={styles.header}>
      Player
    </div>
  )
}

export default Player
