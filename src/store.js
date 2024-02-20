import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { enc, AES } from 'crypto-js'

const ENCRYTED_KEY = process.env.REACT_APP_ENCRYPTION_KEY

export const useStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      logout: false,
      createNewTaskFlag: false,

      createNewTask: (task) =>
        set((state) => ({ tasks: [task, ...state.tasks] })),

      updateTaskFlag: (flag) => set({ createNewTaskFlag: flag }),

      updateLogout: (flag) => set({ logout: flag }),

      deleteTask: (task) =>
        set((state) => {
          const newTasks = state.tasks.filter((el) => el.postId !== task.postId)
          return { tasks: newTasks }
        }),

      setTasks: (tasks) => set({ tasks: tasks }),

      clearStorage: () => {
        sessionStorage.clear()
      },
    }),
    {
      name: 'uvault',
      getStorage: (data) => {
        // Decrypting data when reading from storage
        const decryptedData = AES.decrypt(data, ENCRYTED_KEY).toString(enc.Utf8)
        return JSON.parse(decryptedData)
      },
      onSet: (data) => {
        // Encryping data before storing it
        const encryptedData = AES.encrypt(
          JSON.stringify(data),
          ENCRYTED_KEY
        ).toString()
        sessionStorage.setItem('uvault', encryptedData)
      },
    }
  )
)
