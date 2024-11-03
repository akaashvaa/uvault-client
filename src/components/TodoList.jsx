import { useUser } from '@clerk/clerk-react'
import { useStore } from '../store'
import TodoCard from './TodoCard'

const TodoList = () => {
  const { user } = useUser()
  const CurrentUser = user.externalAccounts[0]

  const {  filteredTask } = useStore((state) => {
    return {
      filteredTask: state.filteredTask,
    }
  })
  // console.log(tasks)
  return (
    <>
      {filteredTask.length !== 0 ? (
        <div className="flex  flex-col gap-3 w-full border-t-2 pt-5 border-secondary">
          {filteredTask.map((note) => (
            <TodoCard note={note} key={note._id} />
          ))}
        </div>
      ) : (
        <div className=" text-sm flex gap-2  justify-center items-center text-center  text-[#b1b1b1] py-5">
          <h1>Hello {CurrentUser.username || CurrentUser.firstName}</h1>
          <img
            src={CurrentUser.imageUrl}
            alt="profile"
            className="w-5 rounded-full"
          />
          <h1>, Welcome to uVault </h1>
        </div>
      )}
    </>
  )
}
export default TodoList
