import NavbarButton from './navbar-button';

export default function Navbar() {
  return (
    <div className='flex w-11/12 m-auto mt-7'>
      <div className=''>
        <NavbarButton route={'/'} buttonTitle={'Home'} />
      </div>
      <div className=''>
      <h1 className='text-white font-bold md:fixed md:left-2/4 md:translate-x-[-50%] text-4xl text-center'>B-Fit!</h1>
      </div>
      <div className='ml-auto space-x-4'>
        <NavbarButton route={'/exercises'} buttonTitle={'Exercises'} />
        <NavbarButton route={'/routines'} buttonTitle={'Routines'} />
        <NavbarButton route={'/weekly'} buttonTitle={'Weekly Plan'} />
      </div>
    </div>
  );
}
