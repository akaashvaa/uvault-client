import { SignOutButton } from '@clerk/clerk-react'
import logout from '../assests/logout.svg'
import { useStore } from '../store.js'

export default function SignOut() {
  const { clearStorage } = useStore((state) => {
    return {
      clearStorage: state.clearStorage,
    }
  })
  const handlelogout = () => {
    clearStorage()
  }
  return (
    <div
      onClick={handlelogout}
      className="absolute grid content-center right-8 rounded-md p-2 w-8 h-8 bg-primary border border-secondary top-7 cursor-pointer"
    >
      <SignOutButton>
        <img src={logout} alt="logout" />
      </SignOutButton>
    </div>
  )
}
