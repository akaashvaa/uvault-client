import { useState } from 'react'
import deleteIcon from '../assests/delete.svg'
import deleteIcon2 from '../assests/delete2.svg'
import copyIcon from '../assests/copy.svg'
import copiedIcon from '../assests/copied.svg'
import { useStore } from '../store'
import axios from 'axios'
import Spinner from './shared/Spinner'
const TodoCard = ({ note }) => {
  const { deleteTask } = useStore((state) => {
    return {
      deleteTask: state.deleteTask,
    }
  })

  const [open, setOpen] = useState(false)
  const [copy, setCopy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [delBtn, setDelBtn] = useState(false)

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
      className={`w-full text-[#7A7A7A] overflow-x-hidden flex  items-center gap-x-10  rounded-md px-2  `}
    >
      <a
        href={note.url}
        rel="noreferrer"
        target="_blank"
        className="w-full h-auto bg-primary hover:bg-hover overflow-hidden break-words overflow py-3 rounded-md  px-2 text-center "
      >
        {note.title.length > 50 ? note.title.slice(0, 50) + '...' : note.title}
      </a>

      <div className=" text-[0.8em] font-serif flex justify-center gap-5 items-center  rounded-md px-1">
        <button
          onClick={() => copyUrl(note)}
          disabled={copy}
          className={` rounded-md w-[50px] h-[40px] flex justify-center items-center border-[1px] p-2 border-secondary   ${
            !copy && 'hover:bg-primary hover:drop-shadow-xl'
          } `}
        >
          <img src={copy ? copiedIcon : copyIcon} alt="copy" className="w-3" />
        </button>
        <button
          onMouseEnter={() => setDelBtn(!delBtn)}
          onMouseLeave={() => setDelBtn(!delBtn)}
          disabled={loading}
          onClick={() => handleDeleteTask(note)}
          className="rounded-md w-[50px] h-[40px] flex justify-center items-center hover:bg-primary hover:drop-shadow-xl p-2 border-[1px] border-secondary   "
        >
          {loading ? (
            <Spinner />
          ) : (
            <img
              src={delBtn ? deleteIcon : deleteIcon2}
              alt="delete"
              className="w-3"
            />
          )}
        </button>
      </div>
    </div>
  )
}
export default TodoCard
