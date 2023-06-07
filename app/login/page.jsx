'use client';

import LinkButton from '../components/link-button';
import ActionButton from '../components/action-button';
import { buttonStyles } from '../styles/button-styles';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login, currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  async function onSubmit() {
    if (!email || !password) {
      setError('Please enter Email and Password');
      return;
    }

    try {
      await login(email, password);
      router.back();
    } catch (err) {
      setError('Incorrect Email or Password');
    }
    return;
  }

  async function onGuestSubmit() {
    try {
      await login(
        process.env.NEXT_PUBLIC_GUEST_EMAIL,
        process.env.NEXT_PUBLIC_GUEST_PASSWORD
      );
      router.back();
    } catch (err) {
      setError('An error occurred, pleas try again later');
    }
    return;
  }

  return (
    <>
      <div className='flex h-screen fixed top-0 w-full items-center justify-center flex-col'>
        <h1 className='text-white font-bold text-md md:text-xl mb-2 select-none'>
          Log In
        </h1>
        {currentUser && <div className='text-white select-none'>Already logged in</div>}
        {!currentUser && <div className='flex flex-col text-center min-w-[50%] md:min-w-[20%]'>
          {error && (
            <div className='text-alert select-none text-center px-2 py-1 border border-alert text-sm'>
              {error}
            </div>
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email Address'
            className='border-2 mx-auto w-full flex my-2 px-2 py-1 text-sm text-main-light placeholder:text-center outline-none focus:border-secondary-light-b'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeypress}
            type='password'
            placeholder='Password'
            className='border-2 mx-auto w-full flex my-2 px-2 py-1 text-sm text-main-light placeholder:text-center outline-none focus:border-secondary-light-b'
          />
          <div className='mt-2'>
            <ActionButton
              className={buttonStyles.create}
              action={() => onSubmit()}
              buttonTitle={'Submit'}
              type='submit'
            />
          </div>
          <div className='mt-2 text-white text-sm'>or</div>
          <div className='mt-2'>
            <ActionButton
              className={buttonStyles.create}
              action={() => onGuestSubmit()}
              buttonTitle={'Continue as Guest'}
              type='submit'
            />
          </div>
          <div className='text-white mt-7 text-sm select-none border-t border-white text-center pt-3'>
            Need an account? <span> </span>
            <LinkButton
              className={buttonStyles.add}
              route={'/register'}
              buttonTitle={'Register'}
            />
          </div>
        </div>}
      </div>
    </>
  );
}
