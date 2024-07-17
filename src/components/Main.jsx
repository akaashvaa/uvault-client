/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from '@clerk/clerk-react'
import { useStore } from '../store'
import TodoList from './TodoList'
import URLInput from './URLInput'
import SignOut from './SignOut'
import Spinner from './shared/Spinner'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Main() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const userId = user.id

  // const currentUser = user.externalAccounts[0]
  // console.log('userId', userId, isSignedIn)

  const { setTasks, createNewTaskFlag, updateTaskFlag } = useStore((state) => {
    return {
      tasks: state.tasks,
      setTasks: state.setTasks,
      createNewTaskFlag: state.createNewTaskFlag,
      updateTaskFlag: state.updateTaskFlag,
    }
  })
  // call the backend api to store the user id as soon as the user logs in
  const getAllItems = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/getAll/${userId}`
      )
      const { userData } = res.data
      // console.log('data', userData)
      setTasks(userData)
      // console.log('fetched data from ../getAll', userData)
    } catch (error) {
      console.error('error', error)
    } finally {
      setLoading(false)
    }
  }
  const handleCreateNewNote = () => {
    //console.log('Craete new note')
    updateTaskFlag(!createNewTaskFlag)
  }

  useEffect(() => {
    getAllItems()
    localStorage.setItem('userId', userId)
  }, [])

  return (
    <div className="flex  flex-col gap-y-6 justify-center shadow-lg items-center w-screen h-screen">
      <div className="flex flex-col">
        <h1 className="header ">UVAULT</h1>
        <p className="-translate-y-5"> store your favourite blog</p>
      </div>
      <div className=" border-2 border-primary p-1 md:w-[55%] xs:w-[70%]  w-[90%] md:h-[70%] rounded-md relative overflow-y-auto overflow-x-hidden drop-shadow-md pb-1 bg-gradient-to-t from-[#3333331a] to-[#4d4d4d23] ">
        <div className=" p-5 flex flex-col md:gap-5 gap-2  backdrop-blur-md rounded-md justify-start items-center overflow-y-auto overflow-x-hidden mb-2">
          <div className="flex p-[2px]  rounded-md w-1/2 gborder  justify-center items-center">
            <button
              onClick={handleCreateNewNote}
              className="  drop-shadow-xl bg-[#3333331a] py-1 w-full rounded-md  flex px-3 justify-center items-center  "
            >
              <span className=" text-3xl pr-3  pb-1 "> &#43; </span> <b>URL </b>
            </button>
          </div>

          {createNewTaskFlag && <URLInput />}
          {loading ? (
            <div className="h-full w-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <TodoList />
          )}
        </div>
        <SignOut />
      </div>
      <a
        className="text-center w-full text-[10px] underline"
        href="https://github.com/akaashvaa/uvault-extension"
        target="_blank"
        rel="noopener noreferrer"
      >
        add this to your extension
      </a>
    </div>
  )
}
