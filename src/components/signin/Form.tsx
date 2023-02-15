import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SignUp from './SignUp';
import Login from './Login';
import { Popup } from '../shared/Popup';
import Logo from '../shared/Logo';
import { useLoginForm } from '@/context/LoginFormProvider';

interface SignInFormProps {
  withCloseBtn?: boolean;
}

/* SignInForm watches LoginProvider Context state to decide if open Popup component  */
export function SignInForm({ withCloseBtn }: SignInFormProps) {
  const router = useRouter();
  const { openLoginForm, setOpenLoginForm } = useLoginForm();
  const [togglePopup, setTogglePopup] = useState(false);

  function handleTogglePopup() {
    setTogglePopup((p) => !p);
  }

  useEffect(() => {
    /* Open SignIn Popup on page load */
    setOpenLoginForm(true);
  }, []);

  useEffect(() => {
    /* if navigating away from  /signup page -> close SignIn Popup in context  */
    if (router.pathname !== '/signup') {
      setOpenLoginForm(false);
    }
  }, [router.pathname]);

  if (!openLoginForm) return null;

  return (
    <>
      <SignUpPopup
        togglePopup={togglePopup}
        handleTogglePopup={handleTogglePopup}
        withCloseBtn={withCloseBtn && withCloseBtn}
      />
      <SignInPopup
        togglePopup={togglePopup}
        handleTogglePopup={handleTogglePopup}
        withCloseBtn={withCloseBtn && withCloseBtn}
      />
    </>
  );
}

interface FormPopup {
  togglePopup: boolean;
  handleTogglePopup: () => void;
  withCloseBtn?: boolean;
}

/**
 *  Component wraps agnostic `<Popup/>` component to open a form.
 * `<Popup/>` require external state and handler to open/close popup.
 * `<SignUpPopup/>` provides handler from LoginProvider Context
 * and current `open/close` state from parent component
 */
const SignUpPopup = ({
  withCloseBtn,
  togglePopup,
  handleTogglePopup,
}: FormPopup) => {
  const { handleOpenLoginForm } = useLoginForm();
  const isOpen = togglePopup ? true : false;
  return (
    <Popup
      open={isOpen}
      handleOpen={handleOpenLoginForm}
      withCloseBtn={withCloseBtn && withCloseBtn}
    >
      <div className='flex flex-col items-center'>
        <Logo />
        <SignUp setToggleForm={handleOpenLoginForm} />
        <span className='px-3 text-center text-sm text-gray-700'>
          Already have an account?{' '}
          <button onClick={handleTogglePopup}>
            <strong
              className='cursor-pointer text-primary-600 
              hover:border-b hover:border-primary-600'
            >
              Sign In
            </strong>
          </button>
        </span>
      </div>
    </Popup>
  );
};
const SignInPopup = ({
  withCloseBtn,
  togglePopup,
  handleTogglePopup,
}: FormPopup) => {
  const { handleOpenLoginForm } = useLoginForm();
  const isOpen = togglePopup ? false : true;
  return (
    <Popup
      open={isOpen}
      handleOpen={handleOpenLoginForm}
      withCloseBtn={withCloseBtn && withCloseBtn}
    >
      <div className='flex flex-col items-center px-3'>
        <Logo />
        <Login />
        <span className='text-sm text-gray-700'>
          Don&apos;t have an account yet?{' '}
          <button onClick={handleTogglePopup}>
            <strong
              className='cursor-pointer text-center text-primary-600 
              hover:border-b hover:border-primary-600'
            >
              Sign up
            </strong>
          </button>
        </span>
      </div>
    </Popup>
  );
};
