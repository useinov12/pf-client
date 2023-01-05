import Button from '@/components/buttons/Button';
import clsx from 'clsx';
import { MenuSection, MenuHeader } from '../Menu';
import { usePlaidContext } from '@/services/plaid/PlaidLinkProvider';
import { BsBoxArrowInRight } from 'react-icons/bs';
import ButtonLink from '@/components/links/ButtonLink';
import ConnectedBanks from '../ConnectedBanks';

import { useConnectedBanks } from '@/services/data/queries';
import { Spinner } from '@/components/shared/Loading';

export default function BankMenu() {
  const { data, isLoading } = useConnectedBanks();

  const connectedBanksData = data?.data.detail.data;

  return (
    <>
      <MenuSection
        className={clsx(
          'w-full grow',
          'relative',
          'overflow-y-scroll',
          'relative'
        )}
      >
        <MenuHeader>
          <h4>Connected Banks</h4>
          <AddBankButton />
        </MenuHeader>

        {isLoading ? (
          <Spinner />
        ) : (
          <ConnectedBanks banksData={connectedBanksData} />
        )}
        <OpenAppButton className='fixed bottom-6 right-6' />
      </MenuSection>
    </>
  );
}

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
