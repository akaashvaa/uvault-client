/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "@clerk/clerk-react";
import { useStore } from "../store";
import TodoList from "./TodoList";
import URLInput from "./URLInput";
import SignOut from "./SignOut";
import Spinner from "./shared/Spinner";
import { useEffect, useState } from "react";
import ToggleSearch from "./ToggleSearch";
import { motion } from "framer-motion";
import { useAxiosInstance } from "../api/axios.js";
import { endpoints } from "../api/config.js";

import debounce from "debounce";

export default function Main() {
  const [toggleSearch, setToggleSearch] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  const api = useAxiosInstance();
  //console.log(userId, token)

  // const currentUser = user.externalAccounts[0]
  // console.log('userId', user:width: ,Id, isSignedIn)

  const {
    tasks,
    setTasks,
    setFilteredTask,
    createNewTaskFlag,
    updateTaskFlag,
  } = useStore((state) => {
    return {
      tasks: state.tasks,
      setTasks: state.setTasks,
      createNewTaskFlag: state.createNewTaskFlag,
      updateTaskFlag: state.updateTaskFlag,
      setFilteredTask: state.setFilteredTask,
    };
  });
  // call the backend api to store the user id as soon as the user logs in
  const getAllItems = async () => {
    try {
      if (tasks.length === 0) setLoading(true);
      else setFilteredTask(tasks);
      const res = await api.get(endpoints.getAll(userId));
      const { userData } = res.data;
      // console.log('data', userData)
      setTasks(userData);
      setFilteredTask(userData);
      // console.log('fetched data from ../getAll', userData)
    } catch (error) {
      console.error("error", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateNewNote = () => {
    //console.log('Craete new note')
    updateTaskFlag(!createNewTaskFlag);
  };

  const handleSearch = debounce((query) => {
    //console.log(query)
    const filteredTask = tasks.filter(
      (item) => item.title.includes(query) || item.url.includes(query),
    );
    setFilteredTask(filteredTask);
    //console.log(filteredTask)
  }, 300);

  useEffect(() => {
    getAllItems();

    localStorage.setItem("userId", userId);
  }, []);

  return (
    <div className="flex  flex-col gap-y-6 justify-center shadow-lg items-center w-screen h-screen">
      <div className="flex flex-col">
        <h1 className="header ">UVAULT</h1>
        <p className="-translate-y-5"> store your favourite blog</p>
      </div>
      <div className=" p-1 md:w-[55%] xs:w-[70%]  w-[90%] md:h-[70%] rounded-md  overflow-hidden drop-shadow-md pb-1 bg-gradient-to-t from-[#3333331a] to-[#4d4d4d23] ">
        <div className="relative p-5 h-full flex flex-col md:gap-5 gap-2  backdrop-blur-md rounded-md justify-start items-center  overflow-x-hidden mb-2">
          {toggleSearch ? (
            <motion.div
              initial={{ rotateX: 180 }}
              animate={{ rotateX: 0 }}
              transition={{ duration: 0.5 }}
              className="flex h-[60px] p-[2px] shadow-sm drop-shadow-sm rounded-md w-1/2 gborder  justify-center items-center ml-3"
            >
              <form onSubmit={(e) => e.preventDefault()} className="w-full">
                <input
                  type="text"
                  name="searchQuery"
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="search here"
                  className=" text-center  backdrop-blur-md w-full h-[60px] bg-primary rounded-md  flex px-3 justify-center items-center outline-none"
                />
              </form>
            </motion.div>
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
          {loading ? (
            <Spinner />
          ) : error ? (
            <h1 className=" text-red-700 ">Error while fetching data</h1>
          ) : (
            <TodoList />
          )}
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
  );
}
