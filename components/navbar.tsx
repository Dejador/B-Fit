'use client';

import LinkButton from './link-button';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { mainPages } from '../common/data';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { currentUser } = useAuth();
  const pathName = usePathname();
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };
  const hideMenu = () => {
    setActive(false);
  };

  return (
    <>
      {/* DESKTOP */}
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1, delay: 0.5 }}
        className='hidden fixed md:flex md:w-full px-8 top-0 mt-4 z-10'
      >
        <div
          className={
            isActive ? 'animate-none' : 'w-12 align-middle hover:animate-spin'
          }
          onTouchEnd={() => setActive(true)}
        >
          <LinkButton
            className={'w-12 h-12 absolute'}
            route={'/'}
            buttonTitle={''}
          />
          <Image
            src='/assets/images/main_logo.png'
            alt='B-Fit Logo'
            width={48}
            height={48}
          />
        </div>
        <div className={'md:ml-auto align-middle flex md:space-x-4'}>
          {mainPages.map((page, index) => (
            <div key={index} className={pathName === '/' ? 'hidden' : 'flex'}>
              <LinkButton
                className={
                  pathName.includes(page.route)
                    ? 'btn-navbar-active'
                    : 'btn-navbar'
                }
                route={page.route}
                buttonTitle={page.title}
              />
            </div>
          ))}
          <LinkButton
            className={
              pathName.includes('login') || pathName.includes('register')
                ? 'btn-navbar-active'
                : 'btn-navbar'
            }
            route={currentUser === null ? '/login' : '/account'}
            buttonTitle={
              currentUser === null ? 'LogIn | Register' : 'My Account'
            }
          />
        </div>
        <div className=''>
          <h1 className='text-white font-bold md:fixed md:left-2/4 md:translate-x-[-50%] text-4xl md:text-center mt-14 select-none'>
            B-Fit!
          </h1>
        </div>
      </motion.div>
      {/* MOBILE */}
      <div className='w-full flex justify-center'>
        <div
          className={'md:hidden mt-6 cursor-pointer z-10'}
          onClick={handleToggle}
        >
          <Image
            src='/assets/images/main_logo.png'
            alt='B-Fit Logo'
            width={48}
            height={48}
          />
        </div>
        <div className='md:hidden absolute top-[86px] z-10'>
          <div
            className={
              isActive
                ? 'w-36 text-center bg-main-light border-white border'
                : 'hidden'
            }
          >
            <div
              className={pathName === '/' ? 'hidden' : 'flex-col flex h-10'}
              onClick={hideMenu}
            >
              <LinkButton
                className='btn-mobile-menu'
                route={'/'}
                buttonTitle={'Home'}
              />
            </div>
            <div className={'flex-col flex h-10'} onClick={hideMenu}>
              <LinkButton
                className='btn-mobile-menu'
                route={currentUser === null ? '/login' : '/account'}
                buttonTitle={
                  currentUser === null ? 'LogIn | Register' : 'My Account'
                }
              />
            </div>

            {mainPages.map((page, index) => (
              <div
                key={index}
                className={
                  pathName.includes(page.route) || pathName === '/'
                    ? 'hidden'
                    : 'flex-col flex h-10'
                }
                onClick={hideMenu}
              >
                <LinkButton
                  className='btn-mobile-menu'
                  route={page.route}
                  buttonTitle={page.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
