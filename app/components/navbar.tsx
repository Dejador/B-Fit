import NavbarButton from './navbar-button';

export default function Navbar() {
  return (
    <>
      <div className='hidden fixed md:flex w-full p-8'>
        {/* <div className='fixed flex w-full px-8 bg-main-dark z-10 py-8'> */}
        <div className=''>
          <NavbarButton route={'/'} buttonTitle={'Home'} />
        </div>
        <div className='md:ml-auto md:space-x-4'>
          <NavbarButton route={'/exercises'} buttonTitle={'Exercises'} />
          <NavbarButton route={'/routines'} buttonTitle={'Routines'} />
          <NavbarButton route={'/weekly'} buttonTitle={'Weekly Plan'} />
        </div>
        <div className=''>
          <h1 className='text-white font-bold md:fixed md:left-2/4 md:translate-x-[-50%] text-4xl md:text-center mt-12'>
            B-Fit!
          </h1>
        </div>
      </div>
      <div className='md:hidden flex pt-8 pb-4 pl-8'>
        <h1 className='border text-lg bg-main-light hover:bg-main-dark-b text-white px-9 py-2 transition-colors'>
          B-Fit!
        </h1>
        <p className='text-white w-full absolute ml-24 align-middle py-3'>
          &#x25BD;
        </p>
      </div>
      <div className='flex-row pl-8 md:hidden'>
        <div className='mb-5'>
          <NavbarButton route={'/exercises'} buttonTitle={'Exercises'} />
        </div>
        <div className='mb-5'>
          <NavbarButton route={'/routines'} buttonTitle={'Routines'} />
        </div>
        <div>
          <NavbarButton route={'/weekly'} buttonTitle={'Weekly Plan'} />
        </div>
      </div>
    </>
  );
}
