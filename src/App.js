import React from 'react'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react'

import Main from './components/Main'

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <Main />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  )
}

export default App
