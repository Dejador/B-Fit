'use client';

import ActionButton from '../components/action-button';
import LinkButton from '../components/link-button';
import { buttonStyles } from '../styles/button-styles';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Account() {
  const router = useRouter();
  const { logout, currentUser } = useAuth();
  console.log(currentUser);

  async function onSubmit() {
    await logout();
    router.replace('/');
    return;
  }

  return (
    <>
      <div className='flex min-h-[80vh] items-center justify-center flex-col'>
        <h1 className='text-white font-bold text-xl'>My Account</h1>
        {currentUser && (
          <div className='mt-2 text-white'>
            Logged In as {currentUser.email}
          </div>
        )}
        {!currentUser && (
          <div className='mt-2 text-white'>
            Please <LinkButton
            className={buttonStyles.add}
            route={'/login'}
            buttonTitle={'Log In'}
          /> to see your details
          </div>
        )}
        {currentUser && <div className='mt-2'>
          <ActionButton
            className={buttonStyles.delete}
            action={() => onSubmit()}
            buttonTitle={'Logout'}
            type='submit'
          />
        </div>}
      </div>
    </>
  );
}
