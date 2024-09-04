import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'
import { getLyric } from '@/service/song'
import useMountedState from '@/hooks/useMountedState'
import Lyric from 'lyric-parser'

export default function useLyric({ songReady }) {
  const [curLyricLines, setCurLyricLines] = useState([])
  const [currentLineNum, setCurrentLineNum] = useState(0)
  const [pureMusicLyric, setPureMusicLyric] = useState('')
  const [playingLyric, setPlayingLyric] = useState('')

  const lyricScrollRef = useRef(null)
  const lyricListRef = useRef(null)
  const currentLyric = useRef(null)

  const { playlist, currentIndex } = useContext(PlayMusicStateContext)
  const playDispath = useContext(PlayMusicDispatchContext)
  const isMounted = useMountedState()
  
  const currentSong = useMemo(() => {
    return playlist[currentIndex]
  }, [playlist, currentIndex])

  useEffect(() => {
    async function fetchData() {
      if (!currentSong?.url || !currentSong?.id) {
        return
      }
      stopLyric()
      currentLyric.current = null
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
    
        currentLyric.current = new Lyric(lyric, handleLyric)
        setCurLyricLines(currentLyric.current.lines)
        const hasLyric = currentLyric.current.lines.length
        if (hasLyric) {
          playLyric(0)
        } else {
          const lyricText = lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/g, '')
          setPureMusicLyric(lyricText)
          setPlayingLyric(lyricText)
        }
      }
    }
    fetchData();
  }, [currentSong])

  function handleLyric({ lineNum, txt }) {
    setCurrentLineNum(lineNum)
    setPlayingLyric(txt)
    const scrollComp = lyricScrollRef.current
    const listEl = lyricListRef.current
    if (!listEl) {
      return
    }
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }
  function playLyric(currentTime) {
    if (currentLyric.current && songReady) {
      currentLyric.current.seek(currentTime * 1000)
    }
  }
  function stopLyric() {
    if (currentLyric.current) {
      currentLyric.current.stop()
    }
  }

  return {
    curLyricLines,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    lyricScrollRef,
    lyricListRef,
    playLyric,
    stopLyric
  }
}
