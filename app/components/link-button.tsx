import Link from 'next/link';

export default function LinkButton({
  route,
  buttonTitle,
  className,
}: {
  route: string;
  buttonTitle: string;
  className?: string;
}) {
  return (
    <Link className={className} href={route}>
      {buttonTitle}
    </Link>
  );
}
