'use client';

import ActionButton from '../components/action-button';
import LinkButton from '../components/link-button';
import { buttonStyles } from '../styles/button-styles';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Account() {
  const router = useRouter();
  const { logout, currentUser } = useAuth();
  const [isGuest, setIsGuest] = useState(false);

  async function onSubmit() {
    router.replace('/');
    await logout();
    setIsGuest(false);
    return;
  }

  useEffect(() => {
    if (
      currentUser &&
      currentUser.email === process.env.NEXT_PUBLIC_GUEST_EMAIL
    ) {
      setIsGuest(true);
    }
  }, []);

  return (
    <>
      <div className='flex min-h-[80vh] items-center justify-center flex-col'>
        <h1 className='text-white font-bold text-xl'>My Account</h1>
        {currentUser && !isGuest && (
          <div className='mt-2 text-white select-none'>
            Logged In as{' '}
            <span className='text-secondary-light-b'>{currentUser.email}</span>
          </div>
        )}
        {isGuest && (
          <div className='mt-2 text-white select-none'>
            Logged In as <span className='text-secondary-light-b'>Guest</span>
          </div>
        )}
        {!currentUser && (
          <div className='mt-2 text-white'>
            Please{' '}
            <LinkButton
              className={buttonStyles.add}
              route={'/login'}
              buttonTitle={'Log In'}
            />{' '}
            to see your details
          </div>
        )}
        {currentUser && (
          <div className='mt-2'>
            <ActionButton
              className={buttonStyles.delete}
              action={() => onSubmit()}
              buttonTitle={'Logout'}
              type='submit'
            />
          </div>
        )}
      </div>
    </>
  );
}
