import styles from './style.module.scss'
import cn from 'classnames'

const Confirm = ({
  confirmShow, 
  text = '', 
  confirmBtnText  = '确定', 
  cancelBtnText = '取消',
  confirm,
  cancel,
}) => {
  return (
    <>
      {confirmShow && (
        <div className={styles.confirm} onClick={(e) => {e.stopPropagation()}}>
          <div className={styles.confirmWrapper}>
            <div className={styles.confirmContent}>
              <p className={styles.text}>{text}</p>
              <div className={styles.operate}>
                <div className={cn(styles.operateBtn, styles.left)} onClick={confirm}>{confirmBtnText}</div>
                <div className={styles.operateBtn} onClick={cancel}>{cancelBtnText}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Confirm
