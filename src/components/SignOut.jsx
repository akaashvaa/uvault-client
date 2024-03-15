import { SignOutButton } from '@clerk/clerk-react'
import logout from '../assests/logout.png'
import { useStore } from '../store.js'

export default function SignOut() {
  const { clearStorage } = useStore((state) => {
    return {
      clearStorage: state.clearStorage,
    }
  })
  const handlelogout = () => {
    // console.log('logout')
    clearStorage()
  }
  return (
    <div
      onClick={handlelogout}
      className="absolute right-8 rounded-full top-10 w-7 cursor-pointer"
    >
      <SignOutButton>
        <img src={logout} alt="logout" />
      </SignOutButton>
    </div>
  )
}
