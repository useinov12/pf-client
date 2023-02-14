import { TbLogout } from 'react-icons/tb';

import Button from '@/components/buttons/Button';

import Card from '../../app/Card';

export default function UserMenu() {
  return (
    <Card className='w-1/3'>
      <div className='mb-3 flex items-center justify-between py-1'>
        <strong className='font-mono uppercase'>User menu</strong>
        <LogoutButton />
      </div>

      <div className='mr-6'>
        <p className='pl-1 text-sm opacity-70'>Account</p>
        <strong className='text-xl '>John Doe</strong>
      </div>
    </Card>
  );
}

const LogoutButton = () => {
  return (
    <Button
      variant='theme-dependent'
      className='inline-flex gap-2 whitespace-nowrap py-1 text-sm'
    >
      <span>Logout</span>
      <TbLogout className='text-xl text-red-500' />
    </Button>
  );
};
