import ActionButton from './action-button';

export default function WarningModal({
  open,
  onCancel,
  onConfirm,
  warningMessage,
  mainButtonText,
  mainButtonStyle,
  altButtonText,
  altButtonStyle,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  warningMessage: string;
  mainButtonText: string;
  mainButtonStyle: string;
  altButtonText?: string;
  altButtonStyle?: string;
}) {
  if (!open) return null;
  return (
    <div
      className='fixed w-full h-full bg-opacity-80 bg-main-dark-b z-10'
      onClick={() => onCancel()}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='w-[90%] md:w-[35%] fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white bg-main-dark'
      >
        <div className='text-white justify-center align-middle flex h-[80%] select-none'>
          <p className='flex text-center items-center px-12 py-6'>
            {warningMessage}
          </p>
        </div>
        <div className='flex justify-center gap-4 pb-4 select-none'>
          <div>
            <ActionButton
              className={mainButtonStyle}
              action={() => onCancel()}
              buttonTitle={mainButtonText}
            />
          </div>

          {altButtonText ? (
            <div>
              <ActionButton
                className={altButtonStyle}
                action={() => onConfirm()}
                buttonTitle={altButtonText}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div></div>
    </div>
  );
}
