import React from 'react'
import SearchBar from '../components/SearchBar'

function Layout({ children }) {
  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <SearchBar />
      </div>
      {children}
    </>
  )
}

export default Layout