import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'

import { getLyric } from '@/service/song'
import useMountedState from '@/hooks/useMountedState'
import Lyric from 'lyric-parser'

export default function useLyric({ songReady, currentTime }) {
  const [currentLyric, setCurrentLyric] = useState(null)
  const [currentLineNum, setCurrentLineNum] = useState(0)
  const [pureMusicLyric, setPureMusicLyric] = useState('')
  const [playingLyric, setPlayingLyric] = useState('')

  const lyricScrollRef = useRef(null)
  const lyricListRef = useRef(null)

  const { playlist, currentIndex } = useContext(PlayMusicStateContext)
  const isMounted = useMountedState()
  const playDispath = useContext(PlayMusicDispatchContext)
  
  const currentSong = useMemo(() => {
    return playlist[currentIndex]
  }, [playlist, currentIndex])

  useEffect(() => {
    async function fetchData() {
      if (!currentSong?.url || !currentSong?.id) {
        return
      }
      stopLyric()
      setCurrentLyric(null)
      setCurrentLineNum(0)
      setPureMusicLyric('')
      setPlayingLyric('')
  
      const lyric = await getLyric(currentSong)
      if (isMounted()) {
        playDispath({
          type: ACTIONS.ADD_SONG_LYRIC,
          payload: {
            song: currentSong,
            lyric
          },
        })
        // if (currentSong.lyric !== lyric) {
        //   return
        // }
    
        // debugger
        const curLyric = new Lyric(lyric, handleLyric)
        setCurrentLyric(curLyric)

        const hasLyric = curLyric.lines.length
        if (hasLyric) {
          if (songReady) {
            playLyric()
          }
        } else {
          const lyricText = lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/g, '')
          setPureMusicLyric(lyricText)
          setPlayingLyric(lyricText)
        }
      }
    }
    fetchData();
  }, [currentSong, songReady])

  function handleLyric({ lineNum, txt }) {
    setCurrentLineNum(lineNum)
    setPlayingLyric(txt)
    console.log('handleLyric-lineNum', lineNum)
    const scrollComp = lyricScrollRef.current
    const listEl = lyricListRef.current
    if (!listEl) {
      return
    }
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      console.log('handleLyric-lineEl', lineEl)
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }
  function playLyric() {
    console.log('playLyric-currentTime', currentTime)
    // console.log('playLyric-currentLyric', currentLyric)
    if (currentLyric) {
      currentLyric.seek(currentTime * 1000)
    }
  }
  function stopLyric() {
    // console.log('stopLyric-currentLyric', currentLyric)
    if (currentLyric) {
      currentLyric.stop()
    }
  }

  return {
    currentLyric,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    lyricScrollRef,
    lyricListRef,
    playLyric,
    stopLyric
  }
}
