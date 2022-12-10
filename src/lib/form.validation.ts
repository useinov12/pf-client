import { RegisterFormCredentials } from '@/services/types';

export const isValidEmailInput = (email: string) => {
  const validRegex = /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

export const isPasswordMatch = (pass1: string, pass2: string) => {
  return pass1 === pass2;
};

export const hasMissingInputs = (
  cred: Omit<RegisterFormCredentials, 'passwordChecker'>
) => {
  for (const value of Object.values(cred)) {
    if (value === '') return true;
  }
  return false;
};
