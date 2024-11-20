import { useState } from 'react'
import { motion } from 'framer-motion'
import deleteIcon from '../assests/delete.svg'
import deleteIcon2 from '../assests/delete2.svg'
import copyIcon from '../assests/copy.svg'
import copiedIcon from '../assests/copied.svg'
import { useStore } from '../store'
import Spinner from './shared/Spinner'
import { endpoints } from "../api/config.js"
import { useAxiosInstance } from "../api/axios.js"

const TodoCard = ({ note }) => {
  const { deleteTask } = useStore((state) => ({
    deleteTask: state.deleteTask,
  }))

  const api = useAxiosInstance()
  const [copy, setCopy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [delBtn, setDelBtn] = useState(false)
  const [hover, setHover] = useState(false) // State to track hover

  const handleDeleteTask = async (note) => {
    try {
      setLoading(true)
      await api.delete(endpoints.delete(note.postId))
      deleteTask(note)
    } catch (error) {
      alert('something went wrong')
      console.log('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyUrl = ({ url }) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopy(true)
        setTimeout(() => {
          setCopy(false)
        }, 5000)
      })
      .catch((err) => console.error('Failed to copy', err))
  }

  return (
    <motion.div
      className="flex items-center gap-5 rounded-md overflow-hidden"
      onHoverStart={() => setHover(true)} // Trigger hover
      onHoverEnd={() => setHover(false)} // End hover
      layout // Enable layout animations for smooth resizing
      transition={{ duration: 0.3, ease: "easeInOut" }} // Transition for smooth resizing
    >
      <motion.a
        href={note.url}
        layout
      transition={{ type : "spring", duration: 0.5, mass :2, ease: "easeInOut" }} // Transition for smooth resizing
        rel="noreferrer"
        target="_blank"
        className={`bg-[#272727ff]  hover:bg-hover hover:text-left text-center py-3 px-4 rounded-md ${
          hover ? 'w-[85%]' : 'w-full' // Adjust width when hovering
        } transition-all duration-300 ease-in-out`}
      >
        {note.title.length > 50 ? note.title.slice(0, 50) + '...' : note.title}
      </motion.a>
      {hover && ( // Show buttons only when hovering
        <motion.div
          className="flex gap-2 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => copyUrl(note)}
            disabled={copy}
            className={`rounded-md w-[40px] h-[40px] flex justify-center items-center border-[1px] border-secondary p-2 ${
              !copy && 'hover:bg-primary hover:drop-shadow-xl'
            }`}
          >
            <img src={copy ? copiedIcon : copyIcon} alt="copy" className="w-3" />
          </button>
          <button
            disabled={loading}
            onClick={() => handleDeleteTask(note)}
            className="rounded-md w-[40px] h-[40px] flex justify-center items-center hover:bg-primary hover:drop-shadow-xl p-2 border-[1px] border-secondary"
          >
            {loading ? (
              <Spinner />
            ) : (
              <img
                src={delBtn ? deleteIcon : deleteIcon2}
                alt="delete"
                className="w-3"
                onMouseEnter={() => setDelBtn(!delBtn)}
                onMouseLeave={() => setDelBtn(!delBtn)}
              />
            )}
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TodoCard

