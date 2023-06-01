import Link from 'next/link';
import Image from 'next/image';

export default function LinkButton({
  route,
  buttonTitle,
  className,
  Image,
}: {
  route: string;
  buttonTitle: string;
  className?: string;
  Image?:string
}) {
  return (
    <Link className={className} href={route}>
      {buttonTitle}
    </Link>
  );
}
