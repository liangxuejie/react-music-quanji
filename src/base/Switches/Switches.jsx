import styles from './style.module.scss'
import {useMemo} from 'react'
import cn from 'classnames'

const Switches = ({items, currentIndex, switchItem}) => {

  const activeStyle = useMemo(() => {
    const x = 120 * currentIndex
    return {
      transform: `translate3d(${x}px, 0, 0)`
    }
  }, [currentIndex])

  return (
    <ul className={styles.switches}>
      {items?.map((item, index) => {
        return (
          <li 
          key={item}
          onClick={() => switchItem(index)}
          className={currentIndex === index ? cn(styles.switchItem, styles.active) : styles.switchItem}
          >
            <span>{item}</span>
          </li>
        )
      })}
      <div className={styles.activeBar} style={activeStyle}></div>
    </ul>
  )
}

export default Switches
