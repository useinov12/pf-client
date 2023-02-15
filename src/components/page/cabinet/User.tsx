import clsx from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';
import { BsGearFill } from 'react-icons/bs';
import {
  MdArrowBackIosNew,
  MdOutlineAddBox,
  MdPersonRemove,
} from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';

import Button from '@/components/buttons/Button';

import { useTheme } from '@/context/ThemeProvider';
import { usePlaidContext } from '@/services/plaid/PlaidLinkProvider';

export function UserMenu({ isMobile }: { isMobile?: boolean | undefined }) {
  const [collapse, setCollpse] = useState<boolean>(false);
  return (
    <main
      className={clsx(
        'flex h-fit w-full flex-col gap-3  lg:h-full lg:w-1/3',
        !isMobile && 'hidden lg:block'
      )}
    >
      <header
        className={clsx(
          'w-full',
          'rounded py-1 px-6 lg:px-0',
          'inline-flex  flex-none gap-7',
          isMobile && 'justify-end'
        )}
      >
        <div className='mb-2'>
          <p className='pl-1 text-sm opacity-70'>Account</p>
          <strong className='text-xl '>John Doe</strong>
        </div>

        {isMobile && (
          <SettingsMenuButton collapse={collapse} setCollpse={setCollpse} />
        )}
      </header>
      {isMobile ? (
        <section
          className={clsx(
            'ease transition-all duration-300',
            'overflow-hidden',
            collapse ? 'h-0' : 'h-72'
          )}
        >
          <Actions />
        </section>
      ) : (
        <Actions />
      )}
    </main>
  );
}

function Actions() {
  const buttonStyles = clsx(
    'w-full',
    'py-4 md:py-3 px-6',
    'border-gray-500/50',
    'text-xl lg:text-sm',
    'inline-flex gap-4 justify-end lg:justify-between',
    'border-b lg:border',
    'rounded-none lg:rounded'
  );
  return (
    <section
      className={clsx(
        'h-fit w-full',
        'flex grow flex-col  gap-1 ',
        'md:items-end lg:items-start '
      )}
    >
      <ul
        className={clsx(
          'h-full w-full',
          'flex flex-col lg:gap-2 lg:pb-5',
          'w-full'
        )}
      >
        <li className='flex-none'>
          <LogoutButton className={buttonStyles} />
        </li>
        <li className='flex-none '>
          <UserSettingsButton className={buttonStyles} />
        </li>
        <li className='flex-none '>
          <AddBankButton className={buttonStyles} />
        </li>
        <li className=' flex grow items-end '>
          <DeleteUserButton className={buttonStyles} />
        </li>
      </ul>
    </section>
  );
}

function SettingsMenuButton({
  collapse,
  setCollpse,
}: {
  collapse: boolean;
  setCollpse: Dispatch<SetStateAction<boolean>>;
}) {
  const { mode } = useTheme();
  return (
    <button
      onClick={() => setCollpse((p) => !p)}
      className={clsx(
        'border',
        'text-2xl hover:opacity-80',
        'rounded px-7 py-1',
        'inline-flex items-center justify-center gap-3 ',
        mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
      )}
    >
      <MdArrowBackIosNew
        className={clsx(
          'text-xl',
          'ease transition-all duration-100',
          collapse ? 'rotate-0' : '-rotate-90'
        )}
      />
    </button>
  );
}

function LogoutButton({ className }: { className: string }) {
  return (
    <Button className={className} variant='ghost'>
      <span>Logout</span>
      <TbLogout className='text-2xl text-red-500' />
    </Button>
  );
}

function UserSettingsButton({ className }: { className: string }) {
  return (
    <Button className={className} variant='ghost'>
      <span>Settings</span>
      <BsGearFill className='text-2xl text-gray-500' />
    </Button>
  );
}

function AddBankButton({ className }: { className: string }) {
  const { generateLinkToken } = usePlaidContext();
  const { mode } = useTheme();
  return (
    <Button variant='ghost' className={className} onClick={generateLinkToken}>
      <span>Add bank</span>
      <MdOutlineAddBox
        className={clsx(
          'text-2xl',
          mode === 'light' ? 'text-green-700' : 'text-green-500'
        )}
      />
    </Button>
  );
}

function DeleteUserButton({ className }: { className: string }) {
  return (
    <Button className={className} variant='ghost'>
      <span>Delete user</span>
      <MdPersonRemove className='text-2xl text-red-500' />
    </Button>
  );
}
