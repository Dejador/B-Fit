export default function ActionButton({
  onClick,
  buttonTitle,
  className,
}: {
  onClick?: () => void;
  buttonTitle: string;
  className?: string;
}) {
  return (
    <button className={className} onClick={onClick}>
      {buttonTitle}
    </button>
  );
}
