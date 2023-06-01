import ActionButton from './action-button';
import { buttonStyles } from '../styles/button-styles';

export default function WarningModal({
  open,
  onCancel,
  onConfirm,
  warningMessage,
  cancelText,
  confirmText,
}: {
  open: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  warningMessage: string;
  cancelText: string;
  confirmText?: string;
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
        className='max-w-[35%] fixed top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white bg-main-dark'
      >
        <div className='text-white justify-center align-middle flex h-[80%]'>
          <p className='flex text-center items-center px-12 py-6'>{warningMessage}</p>
        </div>
        <div className='flex justify-center gap-4 pb-4'>
        <div className=''>
          <ActionButton
            className={confirmText? buttonStyles.cancel : buttonStyles.confirm}
            action={() => onCancel()}
            buttonTitle={cancelText}
          />
        </div>

        {confirmText ? (
          <div className=''>
            <ActionButton
              className={buttonStyles.confirm}
              action={() => onConfirm()}
              buttonTitle={confirmText}
            />
          </div>
        ) : null}
        </div>
      </div>
      <div></div>
    </div>
  );
}
