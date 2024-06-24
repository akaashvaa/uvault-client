import { useState } from 'react'
import deleteIcon from '../assests/delete.svg'
import copyIcon from '../assests/copy.svg'
import copiedIcon from '../assests/copied.svg'
import { useStore } from '../store'
import axios from 'axios'

const TodoCard = ({ note }) => {
  const { deleteTask } = useStore((state) => {
    return {
      deleteTask: state.deleteTask,
    }
  })

  const [open, setOpen] = useState(false)
  const [copy, setCopy] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDeleteTask = async (note) => {
    // console.log(
    //   'Task Deleted',
    //   note.postId,
    // )

    try {
      setLoading(true)
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/v1/delete/${note.postId}`
      )
      // const data = res.data
      // console.log('deleted response ', data)
      deleteTask(note)
      setOpen(false)
    } catch (error) {
      alert('something went wrong')
      console.log('the error from frontend /api/data-post is: ', error)
    } finally {
      setLoading(false)
    }
  }

  const ShowDetails = (note) => {
    // console.log('show details clicked')
    setOpen(!open)
  }

  const copyUrl = ({ url }) => {
    // console.log('copied')
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopy(true)
        setTimeout(() => {
          setCopy(false)
        }, 5000)
      })
      .catch((err) => {
        return console.error('failed to copy', err)
      })
  }

  return (
    <div
      className={`w-full overflow-x-hidden flex justify-center items-center gap-x-10  rounded-md px-2  `}
    >
      {!open ? (
        <a
          href={note.url}
          rel="noreferrer"
          target="_blank"
          className="w-full  h-auto py-3 text-center drop-shadow-md bg-secondary rounded-md  px-2  "
        >
          {note.title.length > 10
            ? note.title.slice(0, 10) + '...'
            : note.title}
        </a>
      ) : (
        <div className="w-full text-[0.8em] font-serif flex justify-center gap-5 items-center  rounded-md px-1">
          <button
            onClick={() => copyUrl(note)}
            disabled={copy}
            className={` rounded-md  py-3 px-5 border-[1px] border-secondary flex  ${
              !copy && 'hover:bg-hover'
            } `}
          >
            <img
              src={copy ? copiedIcon : copyIcon}
              alt="copy"
              className="w-5"
            />
          </button>
          <button
            disabled={loading}
            onClick={() => handleDeleteTask(note)}
            className="rounded-md  hover:bg-hover py-3 px-5 border-[1px] border-secondary   "
          >
            <img src={deleteIcon} alt="delete" className="w-5" />
          </button>
        </div>
      )}

      <button
        onClick={() => ShowDetails(note)}
        className="rounded-md flex justify-center items-center bg-primary hover:bg-hover  px-6 py-2   "
      >
        <span className="flex items-center "> &#9776;</span>
      </button>
    </div>
  )
}
export default TodoCard
