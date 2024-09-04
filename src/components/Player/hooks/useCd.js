import { useRef, useContext, useMemo, useEffect } from 'react'
import { PlayMusicStateContext } from '@/reducers/playMusic'

export default function useCd(styles) {
  const cdRef = useRef(null)
  const cdImageRef = useRef(null)
  const innerTransform = useRef(null)

  const { playingState } = useContext(PlayMusicStateContext)

  const cdCls = useMemo(() => {
    if(cdImageRef.current) {
      innerTransform.current = getComputedStyle(cdImageRef.current).transform
    }
    return playingState ? styles.playing : ''
  }, [playingState])

  useEffect(() => {
    if (!playingState && cdRef.current && cdImageRef.current) {
      syncTransform()
    }
  }, [playingState])

  function syncTransform() {
    const wrapperTransform = getComputedStyle(cdRef.current).transform
    if(wrapperTransform === 'none') {
      cdRef.current.style.transform = innerTransform.current
    } else {
      cdRef.current.style.transform = innerTransform.current.concat(' ', wrapperTransform)
    }
  }

  return {
    cdCls,
    cdRef,
    cdImageRef
  }
}
