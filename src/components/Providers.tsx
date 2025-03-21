import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import {LoaderProvider} from '../contexts/loader'
import {CartProvider} from '../contexts/CartContext'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <CartProvider>
        <LoaderProvider>
          {children}
        </LoaderProvider>
      </CartProvider>
    </>
  )
}

export default Providers
