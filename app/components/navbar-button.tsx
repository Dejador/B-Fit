import Link from 'next/link';

export default function NavbarButton({route='string', buttonTitle='string'}) {
  return (
    <Link className='border text-lg bg-main-light hover:bg-main-dark-b text-white px-6 py-2 transition-colors' href={route}>{buttonTitle}</Link>
  )
}
