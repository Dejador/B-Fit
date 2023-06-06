import LinkButton from '../components/link-button';
import { buttonStyles } from '../styles/button-styles';

export default function Login() {
  return (
    <>
      <div className='flex h-screen items-center justify-center flex-col'>
        <h1 className='text-white font-bold text-xl'>Log In</h1>
        <input type="text" placeholder='Email Address' className='w-[15%] mx-auto flex my-2 px-2 py-1 text-sm text-main-light placeholder:text-center outline-none' />
        <input type="password" placeholder='Password' className='w-[15%] mx-auto flex my-2 px-2 py-1 text-sm text-main-light placeholder:text-center outline-none' />

      <div className='text-white'>Need an account? <span> </span> 
      <LinkButton
              className={buttonStyles.add}
              route={'/signup'}
              buttonTitle={'Sign Up'}
            /></div>
      </div>
    </>
  );
}
