import Link from 'next/link';

export default function LinkButton({
  route,
  buttonTitle,
  buttonDescription,
  className,
  descriptionStyle,
  Image,
  type = 'button',
}: {
  route: string;
  buttonTitle: string;
  buttonDescription?: string;
  descriptionStyle?: string;
  className?: string;
  Image?: string;
  type?: 'button' | 'submit'
}) {
  return (
    <Link className={className} href={route} type={type}>
      <div>{buttonTitle}</div>{' '}
      <div className={descriptionStyle}>{buttonDescription}</div>
    </Link>
  );
}
