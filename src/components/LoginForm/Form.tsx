import { useContext, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Button from '@/components/buttons/Button';
import SignUp from './SignUp';
import Login from './Login';
import Card from '@/components/page/landing/cards/Card';
import { AiOutlineClose } from 'react-icons/ai';
import { LoginFormContext } from '@/context/LoginFormProvider';

export const LoginCardComponent: React.FC = () => {
  const [toggleForm, setToggleForm] = useState(false);

  return (
    <FormCard>
      <CloseButton className='absolute right-3 top-3' />
      <Header setToggleForm={setToggleForm} />
      {toggleForm ? <Login /> : <SignUp setToggleForm={setToggleForm} />}
    </FormCard>
  );
};

function FormCard({ children }: { children: JSX.Element[] }) {
  const { openLoginForm } = useContext(LoginFormContext);

  const show = clsx(
    'scroll-y-none pointer-events-auto',
    'bg-opacity-50 bg-clip-padding backdrop-blur-sm backdrop-filter'
  );
  const hide = 'pointer-events-none opacity-0';

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50',
        ' h-screen w-screen overflow-y-hidden',
        'flex items-center justify-center px-8',
        openLoginForm ? show : hide,
        'transition-all delay-100 duration-200'
      )}
    >
      <Card
        className={clsx(
          'h-full w-full sm:w-[28rem]',
          'justify-top relative flex ',
          'flex-col items-center rounded-xl  ',
          'shadow-lg shadow-dark/40',
          openLoginForm ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
          'transition-all duration-200'
        )}
      >
        <section
          className='flex h-full w-full flex-col items-center px-2'
          data-fade='1'
        >
          {children}
        </section>
      </Card>
    </div>
  );
}

function Header({ setToggleForm }: { setToggleForm: any }) {
  return (
    <nav className='flex w-full flex-col items-center justify-center'>
      <p className='text-md mt-10 font-normal uppercase text-dark'>
        Sign in to
      </p>
      <Image src={'/images/logo.png'} width={80} height={70} />
      <h3 className='text-2xl text-dark drop-shadow'>PersonalFinance</h3>
      <div className='mt-4 flex w-full justify-center gap-2'>
        <Button
          variant='light'
          className='flex w-2/4 justify-center'
          onClick={() => setToggleForm(true)}
        >
          Sign In
        </Button>
        <Button
          variant='light'
          className='flex w-2/4 justify-center'
          onClick={() => setToggleForm(false)}
        >
          Sign Up
        </Button>
      </div>
    </nav>
  );
}

function CloseButton({ className }: { className?: string }) {
  const { setOpenLoginForm } = useContext(LoginFormContext);
  return (
    <button
      className={clsx('text-2xl font-bold text-zinc-900', className)}
      onClick={() => setOpenLoginForm(false)}
    >
      <AiOutlineClose className='text-4xl' />
    </button>
  );
}
