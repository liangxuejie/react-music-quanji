import { useState, useRef } from 'react'

export default function useMiddleInteractive() {
  const [currentShow, setCurrentShow] = useState('cd')
  const [middleLStyle, setMiddleLStyle] = useState(null)
  const [middleRStyle, setMiddleRStyle] = useState(null)
  const touch = useRef({})
  const currentView = useRef('cd')

  function onMiddleTouchStart(e) {
    Promise.resolve(() => {
      e.preventDefault();
    });
    touch.current.startX = e.touches[0].pageX
    touch.current.startY = e.touches[0].pageY
    touch.current.directionLocked = ''
  }

  function onMiddleTouchMove(e) {
    Promise.resolve(() => {
      e.preventDefault();
    });
    const deltaX = e.touches[0].pageX - touch.current.startX
    const deltaY = e.touches[0].pageY - touch.current.startY

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    if (!touch.current.directionLocked) {
      touch.current.directionLocked = absDeltaX >= absDeltaY ? 'h' : 'v'
    }

    if (touch.current.directionLocked === 'v') {
      return
    }

    const left = currentView.current === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
    touch.current.percent = Math.abs(offsetWidth / window.innerWidth)

    if (currentView.current === 'cd') {
      if (touch.current.percent > 0.2) {
        setCurrentShow('lyric')
      } else {
        setCurrentShow('cd')
      }
    } else {
      if (touch.current.percent < 0.8) {
        setCurrentShow('cd')
      } else {
        setCurrentShow('lyric')
      }
    }

    setMiddleLStyle({
      opacity: 1 - touch.current.percent
    })

    setMiddleRStyle({
      transform: `translate3d(${offsetWidth}px, 0, 0)`
    })
  }

  function onMiddleTouchEnd(e) {
    Promise.resolve(() => {
      e.preventDefault();
    });
    let offsetWidth
    let opacity
    if (currentShow === 'cd') {
      currentView.current = 'cd'
      offsetWidth = 0
      opacity = 1
    } else {
      currentView.current = 'lyric'
      offsetWidth = -window.innerWidth
      opacity = 0
    }

    const duration = 300

    setMiddleLStyle({
      opacity,
      transitionDuration: `${duration}ms`
    })

    setMiddleRStyle({
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitionDuration: `${duration}ms`
    })
  }

  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd
  }
}
