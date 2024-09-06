import { useEffect, useRef, useContext, useMemo } from 'react'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'

import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
BScroll.use(Slide)

export default function useMiniSlider() {
  const sliderWrapperRef = useRef(null)
  const sliderRef = useRef(null)
  const { playlist, currentIndex, fullScreen, playingState, playMode } = useContext(PlayMusicStateContext)
  const playDispath = useContext(PlayMusicDispatchContext)
  
  const sliderShow = useMemo(() => {
    return !fullScreen && !!playlist
  }, [fullScreen, playlist])

  useEffect(() => {
    if (!sliderShow) {
      return
    }

    sliderRef.current = new BScroll(sliderWrapperRef.current, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: {
        autoplay: false,
        loop: true
      }
    })
    // sliderRef.current.on('slidePageChanged', ({ pageX }) => {
    //   playDispath({
    //     type: ACTIONS.SET_CURRENT_INDEX,
    //     payload: {
    //       currentIndex: pageX,
    //     },
    //   })
    // })
    sliderRef.current.goToPage(currentIndex, 0, 0)

    return () => {
      if (sliderRef.current) {
        sliderRef.current.destroy()
      }
    }
  }, [sliderShow])

  useEffect(() => {
    if (sliderRef.current && sliderShow) {
      sliderRef.current.goToPage(currentIndex, 0, 0)
    }
  }, [currentIndex])

  // useEffect(() => {
  //   if (sliderRef.current && sliderShow && playlist.length) {
  //     sliderRef.current.refresh()
  //   }
  // }, [playlist])

  return {
    sliderRef,
    sliderWrapperRef
  }
}
