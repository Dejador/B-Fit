'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import LinkButton from './link-button';
import { buttonStyles } from '../styles/button-styles';
import { mainPages } from '../common/data';
import Image from 'next/image';
import { useAuth } from '../app/context/AuthContext';

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
      <div className='hidden fixed md:flex md:w-full px-8 pt-2 z-10'>
        <div className='w-12 align-middle hover:animate-spin'>
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
                    ? buttonStyles.navbarActiveButtonStyle
                    : buttonStyles.navbarButtonStyle
                }
                route={page.route}
                buttonTitle={page.title}
              />
            </div>
          ))}
          <LinkButton
            className={
              pathName.includes('login') || pathName.includes('register')
                ? buttonStyles.navbarActiveButtonStyle
                : buttonStyles.navbarButtonStyle
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
      </div>
      {/* MOBILE */}
      <div className='w-full flex justify-center'>
        <div
          className={
            isActive
              ? 'md:hidden mt-6 cursor-pointer hover:animate-spin z-10'
              : 'md:hidden mt-6 cursor-pointer z-10'
          }
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
                className={buttonStyles.mobileMenuButtonStyle}
                route={'/'}
                buttonTitle={'Home'}
              />
            </div>
            <div className={'flex-col flex h-10'} onClick={hideMenu}>
              <LinkButton
                className={buttonStyles.mobileMenuButtonStyle}
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
                  className={buttonStyles.mobileMenuButtonStyle}
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
