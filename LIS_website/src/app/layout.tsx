/* eslint-disable import/no-unresolved */
// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import { Suspense } from 'react'
import LoadingPage from './loading'

export const metadata = {
  title: 'Vissan',
  description:
    'Vissan'
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' dir={direction} suppressHydrationWarning={true}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <Suspense fallback={<LoadingPage />}>
          {children}
        </Suspense>
      </body>
    </html >
  )
}

export default RootLayout
