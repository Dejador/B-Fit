import Link from 'next/link';

export default function MainButton({route, buttonTitle}) {
  return (
    <Link class='border text-2xl bg-main-light hover:bg-main-dark text-white px-16 py-12' href={route}>{buttonTitle}</Link>
  )
}
