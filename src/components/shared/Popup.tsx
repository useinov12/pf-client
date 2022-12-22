import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Button from '../buttons/Button';
import Card from '../page/landing/cards/Card';
import { AiOutlineClose } from 'react-icons/ai';

interface PopupProps{
  children: JSX.Element | JSX.Element[];
  open: boolean;
  handleOpen: () => void;
  withCloseBtn?: boolean;
  withOkBtn?: boolean;
}

/**
 * Agnostic popup component.
 * Require external state and handler to open/close popup.
 * @params {boolean} open - determine open/close state
 * @params {callback} handleOpen -  handels open/close state
 * @params {boolean | undefined} withCloseBtn - redered with `X` close button
 * @params {boolean | undefined} withOkBtn -  redered with `OK` close button
 *  */
export function Popup({
  children, open, handleOpen, withCloseBtn, withOkBtn,
}: PopupProps) {
  const [openLocalState, setOpenLocalState] = useState(false);
  const show = clsx(
    'scroll-y-none pointer-events-auto',
    'bg-opacity-50 bg-clip-padding backdrop-blur-sm backdrop-filter'
  );
  const hide = 'pointer-events-none opacity-0';

  useEffect(() => {
    const timer = setTimeout(() => setOpenLocalState(open), 100);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <div
      className={clsx(
        'overflow-y-hidden',
        'fixed inset-0 z-50',
        'h-screen w-screen',
        'flex items-center justify-center',
        'transition-all delay-100',
        openLocalState ? show : hide
      )}
    >
      <Card
        className={clsx(
          'h-max w-max',
          openLocalState ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
          'transition-all delay-100 duration-200',
          'overflow-hidden'
        )}
      >
        <section className='relative flex flex-col overflow-scroll py-4'>
          {withCloseBtn && <CloseButton handleOpen={handleOpen} />}
          {children}
          {withOkBtn && <OkButton handleOpen={handleOpen} />}
        </section>
      </Card>
    </div>
  );
}

const OkButton = ({ handleOpen }: { handleOpen: () => void }) => {
  return (
    <Button 
      onClick={handleOpen} 
      className='flex items-center justify-center'>
      OK
    </Button>
  );
};

const CloseButton = ({ handleOpen }: { handleOpen: () => void }) => {
  return (
    <button
      onClick={handleOpen}
      className={clsx(
        'absolute top-2 right-2',
        'flex items-center justify-center'
      )}
    >
      <AiOutlineClose className='text-3xl' />
    </button>
  );
};
