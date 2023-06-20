'use client';

import ActionButton from '../../components/action-button';
import LinkButton from '../../components/link-button';
import { useAuth } from '../../context/AuthContext';
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
      currentUser.email === process.env.GUEST_EMAIL
    ) {
      setIsGuest(true);
    }
  }, []);

  return (
    <>
      <div className='flex min-h-[80vh] items-center justify-center flex-col select-none'>
        <h1 className='text-white text-xl'>My Account</h1>
        {currentUser && !isGuest && (
          <div className='mt-2 text-white'>
            Logged in as{' '}
            <span className='text-secondary-light-b'>{currentUser.email}</span>
          </div>
        )}
        {isGuest && (
          <div className='mt-2 text-white'>
            Logged in as <span className='text-secondary-alt'>Guest</span>
          </div>
        )}
        {!currentUser && (
          <div className='mt-2 text-white flex'>
            Please<span>&nbsp;</span>
            <LinkButton
              className='btn-add'
              route={'/login'}
              buttonTitle={'Log In'}
            /><span>&nbsp;</span>
            to see your details
          </div>
        )}
        {currentUser && (
          <div className='mt-2'>
            <ActionButton
              className='btn-delete'
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
