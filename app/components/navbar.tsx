'use client';

import { useState } from 'react';
import LinkButton from './link-button';
import { buttonStyles } from '../styles/button-styles';
import Image from 'next/image';

export default function Navbar() {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };
  const hideMenu = () => {
    setActive(false);
  };

  return (
    <>
      <div className='hidden fixed md:flex md:w-full px-8 pt-2'>
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
        <div className='md:ml-auto align-middle flex md:space-x-4'>
          <LinkButton
            className={buttonStyles.navbarButtonStyle}
            route={'/exercises'}
            buttonTitle={'Exercises'}
          />
          <LinkButton
            className={buttonStyles.navbarButtonStyle}
            route={'/routines'}
            buttonTitle={'Routines'}
          />
          <LinkButton
            className={buttonStyles.navbarButtonStyle}
            route={'/weekly'}
            buttonTitle={'Weekly Plan'}
          />
          <LinkButton
            className={buttonStyles.navbarButtonStyle}
            route={'/login'}
            buttonTitle={'LogIn | SignUp'}
          />
        </div>
        <div className=''>
          <h1 className='text-white font-bold md:fixed md:left-2/4 md:translate-x-[-50%] text-4xl md:text-center mt-14'>
            B-Fit!
          </h1>
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <div
          className={
            isActive
              ? 'md:hidden flex w-12 h-12 mt-6 cursor-pointer hover:animate-spin'
              : 'md:hidden flex w-12 h-12 mt-6 cursor-pointer'
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
                ? 'w-36 h-[200px] text-center bg-main-light border-white border'
                : 'hidden'
            }
          >
            <div className='mb-10' onClick={hideMenu}>
              <LinkButton
                className={buttonStyles.mobileMenuButtonStyle}
                route={'/'}
                buttonTitle={'Home'}
              />
            </div>
            <div className='mb-20' onClick={hideMenu}>
              <LinkButton
                className={buttonStyles.mobileMenuButtonStyle}
                route={'/login'}
                buttonTitle={'LogIn | SignUp'}
              />
            </div>
            <div className='mb-[120px]' onClick={hideMenu}>
              <LinkButton
                className={buttonStyles.mobileMenuButtonStyle}
                route={'/exercises'}
                buttonTitle={'Exercises'}
              />
            </div>
            <div className='mb-[160px]' onClick={hideMenu}>
              <LinkButton
                className={buttonStyles.mobileMenuButtonStyle}
                route={'/routines'}
                buttonTitle={'Routines'}
              />
            </div>
            <div onClick={hideMenu}>
              <LinkButton
                className={buttonStyles.mobileMenuButtonStyle}
                route={'/weekly'}
                buttonTitle={'Weekly Plan'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
