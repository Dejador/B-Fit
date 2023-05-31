import { useState } from 'react';
import ActionButton from './action-button';

const confirmButtonStyle =
  'text-white bg-secondary-light hover:bg-secondary-light-b hover:cursor-pointer transition-colors px-2 py-1 w-[55px] text-sm';
const cancelButtonStyle =
  'text-white bg-alert hover:bg-alert-b hover:cursor-pointer transition-colors px-2 py-1 w-[55px] text-sm';

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
        className='max-w-[35%] h-[35%] fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white bg-main-dark'
      >
        <div className='text-white justify-center align-middle flex h-[80%]'>
          <p className='flex text-center items-center px-12'>{warningMessage}</p>
        </div>
        <div className='flex justify-center gap-4'>
        <div className=''>
          <ActionButton
            className={confirmText? cancelButtonStyle : confirmButtonStyle}
            action={() => onCancel()}
            buttonTitle={cancelText}
          />
        </div>

        {confirmText ? (
          <div className=''>
            <ActionButton
              className={confirmButtonStyle}
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
