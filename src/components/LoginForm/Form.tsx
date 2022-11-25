import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Button from '@/components/buttons/Button';
import SignUp from './SignUp';
import Login from './Login';
import Card from '@/components/homepage/cards/Card';
import { useRouter } from 'next/router';
import { AiOutlineClose } from 'react-icons/ai';
import { LoginFormContext } from '@/context/LoginFormProvider';
// import { UserContext } from '@/context/UserProvider';
import { login, register } from '@/services/user';

export const LoginCardComponent: React.FC = () => {
  const router = useRouter();
  // const { setUser } = React.useContext(UserContext);
  const { openLoginForm, setOpenLoginForm } =
    React.useContext(LoginFormContext);

  const [toggleForm, setToggleForm] = React.useState(false);
  const [formInputs, setformInputs] = React.useState(emptyForm);

  function handleCredentials(e: ChangeEvent<HTMLInputElement>) {
    setformInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  }

  const { username, password, first_name, last_name, passwordChecker } = formInputs;

  const registerCred = {
    username: username,
    password: password,
    first_name: first_name,
    last_name: last_name,
  };

  const LoginCred = {
    username: username,
    password: password,
  };

  async function onRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isPasswordMatch(password, passwordChecker)) {
      toast.error('Password does not match!');
      return;
    }

    if (hasMissingInputs(registerCred)) {
      toast.error(`Fill all missing fields!`);
      return;
    }

    const { status } = await register(registerCred);

    if (status === 201) {
      setformInputs(emptyForm);
      setToggleForm(true);
    }
  }

  async function onLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidEmailInput(username)) {
      toast.error('Invalid email address!');
      return;
    }

    const { status } = await login(LoginCred);

    if (status === 200) {
      setOpenLoginForm(false);
      router.push('/cabinet');
    }
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 h-screen w-screen overflow-y-hidden',
        'flex items-center justify-center px-8',
        openLoginForm
          ? 'scroll-y-none pointer-events-auto bg-opacity-50 bg-clip-padding backdrop-blur-sm backdrop-filter '
          : 'pointer-events-none opacity-0',
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
          <CloseButton
            setOpenLoginForm={setOpenLoginForm}
            className='absolute right-3 top-3'
          />
          <Header setToggleForm={setToggleForm} />

          {toggleForm ? (
            <Login
              credentials={formInputs}
              handleSubmit={onLoginSubmit}
              handleCredentials={handleCredentials}
            />
          ) : (
            <SignUp
              credentials={formInputs}
              handleSubmit={onRegisterSubmit}
              handleCredentials={handleCredentials}
            />
          )}
        </section>
      </Card>
    </div>
  );
};

function Header({ setToggleForm }: { setToggleForm: any }) {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

function CloseButton({
  setOpenLoginForm,
  className,
}: {
  setOpenLoginForm: any;
  className?: string;
}) {
  return (
    <button
      className={clsx('text-2xl font-bold text-zinc-900', className)}
      onClick={() => setOpenLoginForm(false)}
    >
      <AiOutlineClose className='text-4xl' />
    </button>
  );
}

const isValidEmailInput = (email: string) => {
  const validRegex = /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

const isPasswordMatch = (pass1: string, pass2: string) => {
  return pass1 === pass2;
};

const hasMissingInputs = (
  cred: Omit<RegisterFormCredentials, 'passwordChecker'>
) => {
  for (const value of Object.values(cred)) {
    if (value === '') return true;
  }
  return false;
};

export interface RegisterFormCredentials {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  passwordChecker: string;
}

const emptyForm = {
  username: '',
  first_name: '',
  last_name: '',
  password: '',
  passwordChecker: '',
};