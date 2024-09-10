import styles from './style.module.scss'
import { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import { getSingerList } from '@/service/singer'
import useMountedState from '@/hooks/useMountedState'

const Singer = () => {
  const [singerList, setSingerList] = useState(null)
  const isMounted = useMountedState()
  useEffect(() => {
    async function fetchData() {
      const result = await getSingerList()
      if (isMounted()) {
        setSingerList(result.singers)
      }
    }
    fetchData();
  }, [])

  const shortcutList = useMemo(() => {
    return singerList?.map((group) => {
      return group.title
    })
  }, [singerList])

  function onItemClick(item) {
    // emit('select', item)
  }

  return (
    <div className={styles.singer}>
      <div className={styles.indexList}>
        <ul
        // ref="groupRef"
        >
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
        {/* {fixedTitle && (
          <div className={styles.fixed} style={fixedStyle}>
            <div className={styles.fixedTitle}>{fixedTitle}</div>
          </div>
        )} */}
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
      </div>
    </div>
  )
}

export default Singer
