/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from '@clerk/clerk-react'
import { useStore } from '../store'
import TodoList from './TodoList'
import URLInput from './URLInput'
import SignOut from './SignOut'
import { useEffect } from 'react'
import axios from 'axios'

export default function Main() {
  const { user } = useUser()

  const userId = user.id

  // const currentUser = user.externalAccounts[0]
  // console.log('userId', userId, isSignedIn)

  const { setTasks, createNewTaskFlag, updateTaskFlag, logout } = useStore(
    (state) => {
      return {
        tasks: state.tasks,
        logout: state.logout,
        setTasks: state.setTasks,
        createNewTaskFlag: state.createNewTaskFlag,
        updateTaskFlag: state.updateTaskFlag,
      }
    }
  )
  // call the backend api to store the user id as soon as the user logs in
  const getAllItems = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/getAll/${userId}`
      )
      const { userData } = res.data
      // console.log('data', userData)
      setTasks(userData)
      // console.log('fetched data from ../getAll', userData)
    } catch (error) {
      console.error('error', error)
    }
  }
  const handleCreateNewNote = () => {
    //console.log('Craete new note')
    updateTaskFlag(!createNewTaskFlag)
  }

  useEffect(() => {
    getAllItems()
  }, [])

  return (
    <div className="flex  flex-col gap-y-6 justify-center shadow-lg items-center w-screen h-screen">
      <div className="flex flex-col">
        <h1 className="header ">UVAULT</h1>
        <p className="-translate-y-5"> store your favourite blog</p>
      </div>
      <div className="bg-primary  md:p-4 p-1 md:w-[55%] xs:w-[70%]  w-[90%] md:h-[70%] rounded-md relative overflow-y-auto overflow-x-hidden ">
        <div className="py-5 flex flex-col md:gap-5 gap-2 bg-primary  pt-5 rounded-md justify-start items-center overflow-y-auto overflow-x-hidden ">
          <button
            onClick={handleCreateNewNote}
            className=" border-[3px] w-1/2 rounded-md border-secondary flex px-3 justify-center items-center  "
          >
            <span className=" text-3xl pr-3  pb-1 "> &#43; </span> <b>URL </b>
          </button>

          {createNewTaskFlag && <URLInput />}
          {!logout && <TodoList />}
        </div>
        <SignOut />
      </div>
    </div>
  )
}
