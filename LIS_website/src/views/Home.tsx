'use client'
import { useSession } from 'next-auth/react'

const Home = () => {

  const { data: session } = useSession()

  return (
    <div className='flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden'>
      test home view {session?.user?.name}
    </div>
  )
}

export default Home
