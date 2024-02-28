import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { enc, AES } from 'crypto-js'

const secretKey = process.env.REACT_APP_ENCRYPTION_KEY

const encrypt = (data) => {
  return AES.encrypt(JSON.stringify(data), secretKey).toString()
}

const decrypt = (encryptedData) => {
  const bytes = AES.decrypt(encryptedData, secretKey)
  return JSON.parse(bytes.toString(enc.Utf8))
}

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
        localStorage.removeItem('uvault')
      },
    }),
    {
      name: 'uvault',
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const encryptedData = localStorage.getItem(key)
          return encryptedData ? decrypt(encryptedData) : null
        },
        setItem: (key, data) => {
          const encryptedData = encrypt(data)
          localStorage.setItem(key, encryptedData)
        },
        removeItem: (key) => localStorage.removeItem(key),
      })),
    }
  )
)
