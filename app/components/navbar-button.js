import Link from 'next/link';

export default function NavbarButton({route, buttonTitle}) {
  return (
    <Link class='text-lg bg-main-light hover:bg-main-dark text-white px-6 py-2' href={route}>{buttonTitle}</Link>
  )
}
