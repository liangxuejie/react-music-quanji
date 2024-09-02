import { useMemo, useContext } from 'react'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'
import { PLAY_MODE } from '@/assets/js/constant'
import styles from './style.module.scss'

export default function useMode() {
  const {playMode} = useContext(PlayMusicStateContext)
  const playDispath = useContext(PlayMusicDispatchContext)

  const modeIcon = useMemo(() => {
    const playModeVal = playMode
    return playModeVal === PLAY_MODE.sequence
      ? styles.IconSequence
      : playModeVal === PLAY_MODE.random
        ? styles.IconRandom
        : styles.IconLoop
  }, [playMode])

  const modeText = useMemo(() => {
    const playModeVal = playMode
    return playModeVal === PLAY_MODE.sequence
      ? '顺序播放'
      : playModeVal === PLAY_MODE.random
        ? '随机播放'
        : '单曲循环'
  }, [playMode])

  function changeMode() {
    const mode = (playMode + 1) % 3
    playDispath({
      type: ACTIONS.SET_PLAY_MODE,
      payload: {
        playMode: mode,
      },
    })
  }

  return {
    modeIcon,
    modeText,
    changeMode
  }
}
