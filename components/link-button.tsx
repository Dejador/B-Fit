import Link from 'next/link';
import Image from 'next/image';

export default function LinkButton({
  route,
  buttonTitle,
  buttonDescription,
  className,
  descriptionStyle,
  Image,
}: {
  route: string;
  buttonTitle: string;
  buttonDescription?: string;
  descriptionStyle?: string;
  className?: string;
  Image?: string;
}) {
  return (
    <Link className={className} href={route}>
      <div>{buttonTitle}</div>{' '}
      <div className={descriptionStyle}>{buttonDescription}</div>
    </Link>
  );
}
