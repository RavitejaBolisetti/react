import React, { useEffect, useState } from 'react'
import ContentBody from './ContentBody'
import MainContentSkelaton from '../loadingSkelaton/MainContentSkelaton'
import TopNav from '../Common1/TopNav'

function MainContent({ theme, userData }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  return (
    <>
      {isLoading ? (
        <MainContentSkelaton theme={theme} />
      ) : (
        <div className={`w-full h-full ${theme === 'dark' ? 'text-white' : 'text-black'} xl:pl-[32px] xs:pl-[20px] xs:pr-[20px] px-[10px]`}>
          <TopNav userData={userData} theme={theme} />
          <ContentBody theme={theme} />
        </div>
      )}
    </>
  )
}

export default MainContent
