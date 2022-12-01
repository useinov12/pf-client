import { useContext } from 'react';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';
import Menu from './Menu';
import { ThemeContext } from '@/context/ThemeProvider';
// import { usePlaid } from '@/services/plaid';
// import LaunchLink from '@/components/plaid/LaunchLink';

const Settings = () => {
  const { mode } = useContext(ThemeContext);

  // const { linkToken, generateLinkToken } = usePlaid();
  return (
    <Menu className='relative h-full md:w-4/6 lg:w-4/5'>
      <header
        className={clsx(
          'flex items-center justify-between px-7 py-4',
          mode === 'light' ? 'bg-gray-300/70' : 'bg-gray-900/70'
        )}
      >
        <h4 className=''>Connected Banks</h4>
        <Button
          variant='green'
          className='w-24 whitespace-nowrap py-1 text-sm'
          // onClick={generateLinkToken}
        >
          Add bank
        </Button>
        {/* {linkToken && <LaunchLink token={linkToken} />} */}
      </header>

      <ul className='scroll-y h-full overflow-y-scroll'>
        {['A', 'B', 'C', 'D'].map((bank, i) => (
          <li
            key={'cabinet-bank' + i}
            className={clsx(
              'flex items-center justify-between px-7 py-3',
              'mb-4 border-b border-gray-500/50'
            )}
          >
            <h5 className='font-semibold'> Bank #{bank}</h5>
            <div className='flex gap-2'>
              <Button
                isDarkBg={mode === 'dark' && true}
                variant='light'
                className='flex w-24 items-center justify-center whitespace-nowrap py-1 text-sm'
              >
                Configure
              </Button>
              <Button
                isDarkBg={mode === 'dark' && true}
                variant='red'
                className='flex w-24 items-center justify-center py-1 text-sm'
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Menu>
  );
};

export default Settings;
