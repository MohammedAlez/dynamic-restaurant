/* eslint-disable react/react-in-jsx-scope */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Notifications from '@/components/Notifications'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/components/AuthProvider'
import QueryProvider from '@/components/QueryProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Resturant website ',
  description: 'This is a resturant website that is created using Next js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}> 
        <AuthProvider>
          <QueryProvider>
            <Notifications /> 
            <NavBar /> 
            <div className="max-w-[1400px] mx-auto overflow-hiddenn">
              {children} 
            </div>
            <Footer />  
            <ToastContainer autoClose={2000} theme='dark' position='bottom-right'/>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
