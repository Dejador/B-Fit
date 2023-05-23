export default function ActionButton({
  action,
  buttonTitle,
  className,
}: {
  action?: () => void;
  buttonTitle: string;
  className?: string;
}) {
  return (
    <button className={className} onClick={action}>
      {buttonTitle}
    </button>
  );
}
