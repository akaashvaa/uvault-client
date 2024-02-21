import { useState } from 'react'
import { SignIn, useUser } from '@clerk/clerk-react'
import { useStore } from '../store'
import { v4 as uuid } from 'uuid'
import validator from 'validator'
import axios from 'axios'

const URLInput = () => {
  const { isSignedIn, user } = useUser()
  const userId = user.id
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { updateTaskFlag, createNewTask } = useStore((state) => {
    return {
      updateTaskFlag: state.updateTaskFlag,
      createNewTask: state.createNewTask,
    }
  })

  const [values, setValues] = useState({
    title: '',
    url: '',
  })

  const onChange = (e) => {
    const { name, value } = e.target

    e.target.setCustomValidity('')
    setValues({
      ...values,
      [name]: value,
    })
    // console.log(name, value)
  }

  const discardChanges = () => {
    setValues({
      title: '',
      url: '',
    })
    updateTaskFlag(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitted) return

    setIsSubmitted(true)

    const { title, url } = values
    // console.log('url', url)

    if (validator.isURL(url)) {
      // URL is in the correct format
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/post`,
          {
            postId: uuid(),
            userId,
            title,
            url,
          }
        )
        const { post } = res.data
        // console.log('post', post)
        updateTaskFlag(false)
        createNewTask(post)
      } catch (error) {
        console.error('the error from frontend /api/data-post is: ', error)
      }
    } else {
      // URL is not in the correct format
      const urlInput = document.querySelector('input[name="url"]')
      urlInput.setCustomValidity('Please enter a valid URL.')
      urlInput.reportValidity()
    }
    setIsSubmitted(false)
  }

  if (!isSignedIn) return SignIn()
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full  items-center justify-center py-5 "
    >
      <div className="flex  flex-col gap-2 ml-5">
        <input
          type="text"
          name="title"
          required
          placeholder="Title"
          value={values.title}
          onChange={onChange}
          className="w-3/4 bg-primary  rounded-md h-12 px-3 border-2 border-secondary outline-none"
        />
        <input
          type="text"
          name="url"
          required
          placeholder="Only URL"
          value={values.url}
          onChange={onChange}
          autoComplete="off"
          className="w-3/4 bg-primary  rounded-md h-12 px-3 border-2 border-secondary outline-none "
        />
      </div>
      <div className="flex  flex-col gap-2 ml-5">
        <button
          type="submit"
          className="rounded-md  bg-primary  hover:bg-hover flex justify-center items-center  px-3 mr-5 py-1  border-2 border-secondary  "
        >
          <span className="flex items-center "> &#10148;</span>
        </button>
        <button
          type="button"
          onClick={discardChanges}
          className="rounded-md  bg-primary  hover:bg-hover flex justify-center items-center  px-3 mr-5 py-1  border-2 border-secondary"
        >
          <span className="flex items-center "> &#10539;</span>
        </button>
      </div>
    </form>
  )
}
export default URLInput
