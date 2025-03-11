import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import {LoaderProvider} from '../contexts/loader'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <LoaderProvider>
        {children}
      </LoaderProvider>
    </>
  )
}

export default Providers
