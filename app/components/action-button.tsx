export default function ActionButton({
  action = () => { },
  buttonTitle,
  className,
  type = 'button'
}: {
  action?: () => void;
  buttonTitle: string;
  className?: string;
  type?: 'button' | 'submit'
}) {
  return (
    <button className={className} onClick={() => action()} type={type}>
      {buttonTitle}
    </button>
  );
}
