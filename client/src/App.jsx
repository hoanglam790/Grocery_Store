import React from 'react'
import Header from './components/user/Header'
import Footer from './components/user/Footer'
import { AppContextProvider } from './context/AppContext'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <AppContextProvider>        
        <Header />
        <Toaster />
        <main className='max-w-screen mx-auto mt-28'>
          <Outlet />
        </main>
        <Footer />
      </AppContextProvider>
    </>
  )
}

export default App
