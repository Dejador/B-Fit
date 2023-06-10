'use client';

import LinkButton from '../components/link-button';
import ActionButton from '../components/action-button';
import { buttonStyles } from '../styles/button-styles';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { register, currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  console.log(currentUser);

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
      await register(email, password);
      router.back();
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('User already registered');
      } else if (err.code === 'auth/weak-password'){
        setError('Password must be al least 6 characters long');
      }
       else {
        setError('There was a problem creating your account, please try again');
      }
    }
    return;
  }

  return (
    <>
      <div className='flex h-screen fixed top-0 w-full items-center justify-center flex-col select-none'>
        <h1 className='text-white text-md md:text-xl mb-2'>
          Register
        </h1>
        {currentUser && (
          <div className='text-white'>Already registered</div>
        )}
        {!currentUser && (
          <div className='flex flex-col text-center min-w-[50%] md:min-w-[20%]'>
            {error && (
              <div className='text-alert text-center px-2 py-1 border border-alert text-sm'>
                {error}
              </div>
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Email Address'
              className='border-2 w-full mx-auto flex my-2 px-2 py-1 text-sm text-main-light placeholder:text-center outline-none focus:border-secondary-light-b'
            />
            <input
              value={password}
              onKeyDown={handleKeypress}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
              className='border-2 w-full mx-auto flex my-2 px-2 py-1 text-sm text-main-light placeholder:text-center outline-none focus:border-secondary-light-b'
            />
            <div className='mt-2'>
              <ActionButton
                className={buttonStyles.create}
                action={() => onSubmit()}
                buttonTitle={'Submit'}
                type='submit'
              />
            </div>
            <div className='text-white mt-7 text-sm min-w-[50%] md:min-w-[20%] border-t border-white text-center pt-3'>
              Already have an account? <span> </span>
              <LinkButton
                className={buttonStyles.add}
                route={'/login'}
                buttonTitle={'Log In'}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
