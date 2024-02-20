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

  const handleCreateNewNote = () => {
    //console.log('Craete new note')
    updateTaskFlag(!createNewTaskFlag)
  }

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

  useEffect(() => {
    getAllItems()
  }, [])

  return (
    <div className="bg-primary rounded-md relative">
      <div className="todo-list-item py-5 flex flex-col gap-5 bg-primary  pt-5 rounded-md justify-start items-center overflow-y-auto ">
        <button
          onClick={handleCreateNewNote}
          className=" border-[3px] rounded-md border-secondary flex px-3 justify-center items-center  "
        >
          <span className=" text-3xl pr-3  pb-1 "> &#43; </span> <b>URL </b>
        </button>

        {createNewTaskFlag && <URLInput />}
        {!logout && <TodoList />}
      </div>
      <SignOut />
    </div>
  )
}
