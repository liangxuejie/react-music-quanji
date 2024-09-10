import { useState, useEffect, useMemo, useRef } from 'react'

export default function useShortcut(singerList, groupRef, scrollRef) {
  const ANCHOR_HEIGHT = 18
  const touch = useRef({})

  const shortcutList = useMemo(() => {
    return singerList?.map((group) => {
      return group.title
    })
  }, [singerList])

  function onShortcutTouchStart(e) {
    e.stopPropagation();
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex

    scrollTo(anchorIndex)
  }
  function onShortcutTouchMove(e) {
    e.stopPropagation();
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    const anchorIndex = touch.anchorIndex + delta

    scrollTo(anchorIndex)
  }
  function onShortcutTouchEnd(e) {
    e.stopPropagation();
  }

  function scrollTo(index) {
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcutList.length - 1, index))
    const targetEl = groupRef.current.children[index]
    const scroll = scrollRef.current.scroll
    scroll.scrollToElement(targetEl, 0)
  }

  return {
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove,
    onShortcutTouchEnd,
  }
}
