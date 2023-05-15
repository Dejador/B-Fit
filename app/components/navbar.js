import NavbarButton from './navbar-button';

export default function Navbar() {
  return (
    <nav-container class='flex w-11/12 m-auto mt-4'>
      <div class=''>
        <NavbarButton route={'/'} buttonTitle={'Home'} />
      </div>
      <div class=''>
      <h1 class='text-main-dark-b font-bold text-lg'>B-Fit!</h1>
      </div>
      <div class='ml-auto space-x-4'>
        <NavbarButton route={'/exercises'} buttonTitle={'Exercises'} />
        <NavbarButton route={'/routines'} buttonTitle={'Routines'} />
        <NavbarButton route={'/weekly'} buttonTitle={'Weekly Plan'} />
      </div>
    </nav-container>
  );
}
