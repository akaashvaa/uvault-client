import { motion } from 'framer-motion'
import AnimatedSVG from './AnimatedSVG'
import { useStore } from '../store'

function ToggleSearch({ setToggleSearch, toggleSearch }) {
  const { updateTaskFlag } = useStore((state) => {
    return {
      updateTaskFlag: state.updateTaskFlag,
    }
  })
  const handleClick = () => {
    updateTaskFlag(false)
    setToggleSearch(!toggleSearch)
  }
  return (
    <div className="absolute top-7 p-1 left-7 shadow-inner rounded-md ">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ delay: 2, duration: 0.7 }}
      >
        <motion.button
          onClick={handleClick}
          className={`${
            toggleSearch && 'add'
          } bg-primary w-8 h-8 flex justify-center items-center rounded-md drop-shadow-md`}
        >
          {toggleSearch ? (
            <AnimatedSVG />
          ) : (
            <svg
              width="20"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="#8a8a8a"
              />
            </svg>
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default ToggleSearch
