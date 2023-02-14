import Button from '@/components/buttons/Button';
import { Spinner } from '@/components/shared/Loading';

import { BankQuery } from '@/pages/app/cabinet';
import { usePlaidContext } from '@/services/plaid/PlaidLinkProvider';

import ConnectedBanks from '../ConnectedBanks';
import Card from '../../app/Card';

export default function BankMenu({ bankQuery }: { bankQuery: BankQuery }) {
  return (
    <Card className='flex w-full flex-col justify-start gap-2 p-0'>
      <div className='flex items-center justify-between'>
        <strong className='font-mono uppercase'>Connected Banks</strong>
        <div>
          <AddBankButton />
        </div>
      </div>

      {bankQuery.isLoading ? (
        <Spinner />
      ) : (
        <ConnectedBanks banksData={bankQuery.data} />
      )}
    </Card>
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
