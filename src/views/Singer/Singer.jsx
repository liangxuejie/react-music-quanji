import styles from './style.module.scss'
import { useState, useEffect, useMemo, useRef } from 'react'
import { getSingerList } from '@/service/singer'
import useMountedState from '@/hooks/useMountedState'
import Scroll from '@/base/Scroll/Scroll'

const Singer = () => {
  const TITLE_HEIGHT = 30
  const [singerList, setSingerList] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [fixedStyle, setFixedStyle] = useState(null)

  const isMounted = useMountedState()
  const scrollRef = useRef(null)
  const groupRef = useRef(null)
  const listHeights = useRef(null)


  useEffect(() => {
    async function fetchData() {
      const result = await getSingerList()
      if (isMounted()) {
        setSingerList(result.singers)
      }
    }
    fetchData();
  }, [])
  useEffect(() => {
    if (!groupRef.current?.children) {
      return
    }
    const list = groupRef.current.children
    const listHeightsVal = []
    let height = 0
    listHeightsVal.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
    listHeights.current = listHeightsVal
  }, [singerList])

  const fixedTitle = useMemo(() => {
    if (scrollY < 0) {
      return ''
    }
    const currentGroup = singerList[currentIndex]
    return currentGroup ? currentGroup.title : ''
  }, [scrollY, currentIndex])
  const shortcutList = useMemo(() => {
    return singerList?.map((group) => {
      return group.title
    })
  }, [singerList])

  function onScroll(pos) {
    const newY = -pos.y
    setScrollY(newY)
    const listHeightsVal = listHeights.current

    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const heightTop = listHeightsVal[i]
      const heightBottom = listHeightsVal[i + 1]
      if (newY >= heightTop && newY < heightBottom) {
        setCurrentIndex(i)
        const distanceVal = heightBottom - newY
        getFixedStyle(distanceVal)
        break
      }
    }
  }
  function getFixedStyle(distanceVal) {
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    setFixedStyle({
      transform: `translate3d(0,${diff}px,0)`
    })
  }
  function onItemClick(item) {
    // emit('select', item)
  }

  return (
    <div className={styles.singer}>
      <Scroll 
        classNameP={styles.indexList}
        probeType='3'
        onScroll={onScroll}
        ref={(ref) => (scrollRef.current = ref)}
      >
        <ul ref={(ref) => (groupRef.current = ref)}>
          {singerList?.map((group) => {
            return (
              <li 
              className={styles.group}
              key={group.title}
              >
                <h2 className={styles.title}>{group.title}</h2>
                <ul>
                  {group.list?.map((item) => {
                    return (
                      <li 
                      className={styles.item}
                      key={item.id}
                      onClick={() => onItemClick(item)}
                      >
                        <img className={styles.avatar} src={item.pic}></img>
                        <span className={styles.name}>{item.name}</span>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
        {fixedTitle && (
          <div className={styles.fixed} style={fixedStyle}>
            <div className={styles.fixedTitle}>{fixedTitle}</div>
          </div>
        )}
        <div 
          className={styles.shortcut}
          // @touchstart.stop.prevent="onShortcutTouchStart"
          // @touchmove.stop.prevent="onShortcutTouchMove"
          // @touchend.stop.prevent
        >
          <ul>
            {shortcutList?.map((item, index) => {
              return (
                <li 
                className={styles.item}
                key={item}
                // :class="{'current':currentIndex===index}">
                >
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
      </Scroll>
    </div>
  )
}

export default Singer
