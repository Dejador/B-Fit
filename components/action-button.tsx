export default function ActionButton({
  action = () => { },
  buttonTitle,
  className,
  type = 'button',
  disabled = false
}: {
  action?: () => void;
  buttonTitle: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit'
}) {
  return (
    <button className={className} onClick={() => action()} type={type} disabled={disabled}>
      {buttonTitle}
    </button>
  );
}
