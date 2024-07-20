/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from '@clerk/clerk-react'
import { useStore } from '../store'
import TodoList from './TodoList'
import URLInput from './URLInput'
import SignOut from './SignOut'
import Spinner from './shared/Spinner'
import { Suspense, useEffect, useState } from 'react'
import axios from 'axios'
import ToggleSearch from './ToggleSearch'
import { motion } from 'framer-motion'
export default function Main() {
  const { user } = useUser()
  const [toggleSearch, setToggleSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(searchQuery)
    // make api call for search query
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
      <div className=" p-1 md:w-[55%] xs:w-[70%]  w-[90%] md:h-[70%] rounded-md  overflow-hidden drop-shadow-md pb-1 bg-gradient-to-t from-[#3333331a] to-[#4d4d4d23] ">
        <div className="relative p-5 h-full flex flex-col md:gap-5 gap-2  backdrop-blur-md rounded-md justify-start items-center  overflow-x-hidden mb-2">
          {toggleSearch ? (
            <motion.form
              onSubmit={handleSubmit}
              animate={{ rotateX: 0 }}
              transition={{ duration: 0.5 }}
              className="flex h-[60px] p-[2px] shadow-sm drop-shadow-sm rounded-md w-1/2 gborder  justify-center items-center ml-3"
            >
              <input
                type="text"
                name="searchQuery"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                placeholder="search here"
                className=" text-center  backdrop-blur-md w-full h-[60px] bg-primary rounded-md  flex px-3 justify-center items-center outline-none"
              />
            </motion.form>
          ) : (
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: 360 }}
              transition={{ duration: 0.5 }}
              className="flex p-[2px] h-[60px] shadow-sm drop-shadow-sm rounded-md w-1/2 gborder  justify-center items-center  ml-3"
            >
              <button
                onClick={handleCreateNewNote}
                className=" w-full rounded-md h-[60px] bg-primary flex px-3 justify-center items-center  "
              >
                <span className=" text-xl pr-3  pb-1 "> &#43; </span> <b>URL</b>
              </button>
            </motion.div>
          )}

          {createNewTaskFlag && <URLInput />}
          <Suspense fallback={<Spinner />}>
            <TodoList />
          </Suspense>
          <SignOut />
          <ToggleSearch
            setToggleSearch={setToggleSearch}
            toggleSearch={toggleSearch}
          />
        </div>
      </div>
      <a
        className="text-center w-full text-[14px] tracking-wider underline hover:text-white"
        href="https://github.com/akaashvaa/uvault-extension"
        target="_blank"
        rel="noopener noreferrer"
      >
        extension for this web app
      </a>
    </div>
  )
}
