import React, { useContext } from "react";
import { HiArrowTopRightOnSquare, HiUserCircle } from 'react-icons/hi2'
import { RouteContext } from "../App";
import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { useAuth } from "../hooks/useAuth";
import { useOpensaucedUserCheck } from "../hooks/useOpensaucedUserCheck";

function Home() {
  const {setCurrentPage} = useContext(RouteContext)
  const {user} = useAuth()
  const {currentTabIsOpensaucedUser, checkedUser} = useOpensaucedUserCheck()

  return (
    <div className="grid grid-cols-1 divide-y divide-white/40 divider-y-center-2 min-w-[320px] text-white">
      <header className='flex justify-between'>
        <img src={OpenSaucedLogo} alt="OpenSauced logo" className='w-[45%]' />
        {user &&
          <button 
            onClick={e=> {
              setCurrentPage('profile', {userName: user.user_name})
            }}
            className='flex gap-1 items-center hover:text-orange text-white no-underline'>
            {user?.user_name}
            <img
              src={`https://github.com/${user?.user_name}.png`}
              alt="profile image"
              className='rounded-full w-6 aspect-square border border-orange' />
          </button>}
      </header>
      <main className='main-content'>
        <h3 className='text font-medium text-base leading-10'>Tools:</h3>
        <div className='tools flex flex-col gap-2'>
          <a
            target='_blank'
            href={`https://insights.opensauced.pizza/feed`}
            className='flex items-center bg-slate-700 hover:bg-slate-700/70 text-white hover:text-orange no-underline gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm'
          >
            <HiArrowTopRightOnSquare />
            Go to Highlights feed
          </a>
          <a
            target='_blank'
            href={`https://insights.opensauced.pizza`}
            className='flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm'
          >
            <HiArrowTopRightOnSquare />
            Go to Dashboard
          </a>
          {
            currentTabIsOpensaucedUser &&
            <button
              onClick={e => {
                setCurrentPage('profile', {userName: checkedUser})
              }} 
              className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm">
                <HiUserCircle />
                View {checkedUser}'s profile
            </button>
          }
        </div>
      </main>
    </div>
  );
}

export default Home;
