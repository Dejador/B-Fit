import Link from 'next/link';

export default function MainButton({route='string', buttonTitle='string'}) {
  return (
    <Link className='border text-2xl bg-main-light hover:bg-main-dark-b text-white px-16 py-12 opacity-90 transition-colors' href={route}>{buttonTitle}</Link>
  )
}
