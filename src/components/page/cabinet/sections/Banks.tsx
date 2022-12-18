import Button from '@/components/buttons/Button';
import clsx from 'clsx';
import Menu from '../Menu';
import { usePlaidContext } from '@/services/plaid/PlaidLinkProvider';
import LaunchLink from '@/components/plaid/LaunchLink';
import { BsBoxArrowInRight } from 'react-icons/bs';
import ButtonLink from '@/components/links/ButtonLink';
import MenuHeader from '../MenuHeader';
import ConnectedBanks from '../ConnectedBanks';

//wait backend
// import { useConnectedBanks } from '@/services/data/queries';

// import { data } from './sampleData';

const BankMenu = () => {
  const { linkToken } = usePlaidContext();
  // const {data} = useConnectedBanks()

  return (
    <>
      <Menu
        className={clsx(
          'w-full grow md:w-3/4',
          'relative',
          'overflow-y-scroll',
          'relative'
        )}
      >
        <MenuHeader>
          <h4>Connected Banks</h4>
          <AddBankButton />
        </MenuHeader>

        {/* <ConnectedBanks banksData={data} /> */}
        <OpenAppButton className='fixed bottom-6 right-6' />
      </Menu>

      {/* generate plaid link on Add Bank click */}
      {/* {linkToken && <LaunchLink token={linkToken} userId={}/>} */}
    </>
  );
};
export default BankMenu;

const AddBankButton = () => {
  const { generateLinkToken } = usePlaidContext();
  return (
    <Button
      variant='green'
      className='w-24 whitespace-nowrap py-1 text-sm'
      onClick={generateLinkToken}
    >
      Add bank
    </Button>
  );
};

const OpenAppButton = ({ className }: { className?: string }) => {
  return (
    <ButtonLink
      href='/app/overview'
      variant='theme-dependent'
      className={clsx('flex gap-2 py-1', className)}
    >
      <span className='text-sm'>Open app</span>
      <BsBoxArrowInRight className='text-xl' />
    </ButtonLink>
  );
};
