import { useUser, useAuth } from '@clerk/clerk-react'
export default function Temp() {
  const { user } = useUser()
  const { userId } = useAuth()

  console.log('user : ', user)
  console.log('userId : ', userId)

  return (
    <div>
      <h1>Hello, {user.externalAccounts[0].username} welcome to Clerk</h1>
      <img src={user.externalAccounts[0].imageUrl} alt="profile" />
    </div>
  )
}
