import { useContext, useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';
import Menu from '../Menu';
import { ThemeContext } from '@/context/ThemeProvider';
import { useQuery } from 'react-query';
import { getConnectedBanks } from '@/services/api';
import { usePlaidContext } from '@/services/plaid/PlaidLinkProvider';
import LaunchLink from '@/components/plaid/LaunchLink';
import logger from '@/lib/logger';
import { FiSettings } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { IoMdArrowDroprightCircle } from 'react-icons/io';

import { useCabinetPageContext } from '@/context/CabinetContext';
import { Account, ConnectedBanks } from '@/services/types';


const getBankList = (data:ConnectedBanks) =>  Object.keys(data);
const getAccountsByBank = (bank: string, data:ConnectedBanks) => data[bank];

const BankMenu = () => {
  const { data, isLoading } = useQuery(['banks'], getConnectedBanks, {
    onSuccess: (response) => {
      logger(response, 'Connected banks response');
      // structure data
    },
    // refetch:false
  });

  return (
    <Menu className={clsx('relative', 'overflow-y-scroll', 'w-4/6')}>
      <Header />
      <ConnectedBanks banksData={data?.data.detail.data!}/>
    </Menu>
  );
};
export default BankMenu;




const Header = () => {
  const { mode } = useContext(ThemeContext);
  const { linkToken } = usePlaidContext();
  return (
    <header
      className={clsx(
        'sticky top-0 z-40',
        'flex items-center justify-between px-7 py-4',
        mode === 'light' ? 'bg-gray-300' : 'bg-gray-900'
      )}
    >
      <h4>Connected Banks</h4>
      <AddBankBtn />
      {linkToken && <LaunchLink token={linkToken} />}
    </header>
  );
};


interface ConnectedBanksProps{
  banksData:ConnectedBanks
}
function ConnectedBanks({banksData}:ConnectedBanksProps){
  const connectedBanksList = getBankList(banksData)
  return (
    <ul className=''>
      {connectedBanksList.map((bank) => (
        <li key={bank}>
          <BankInstance bankName={bank} accounts={getAccountsByBank(bank, banksData)} />
        </li>
      ))}
    </ul>
  );
};

interface BankMenuProps {
  bankName: string;
  accounts: Account[];
}
function BankInstance({ bankName, accounts }: BankMenuProps) {
  const [expanded, setExpand] = useState(false);

  function handleExpand() {
    setExpand((p) => !p);
  }

  return (
    <div
      className={clsx(
        'scroll-y h-full overflow-y-scroll',
        'border-b border-t border-gray-500/50',
        'shadow-md hover:shadow-gray-400/30'
      )}
    >
      <div className='flex items-center justify-between px-4 py-1'>
        <div className='flex items-center gap-x-2'>
          <ExpandBtn handleExpand={handleExpand} expanded={expanded} />
          <h5 className='font-mono font-semibold'>{bankName}</h5>
        </div>

        <div className='flex items-center gap-x-2'>
          <ConfigureBtn />
          <RemoveBtn />
        </div>
      </div>
      <ExpandSection expanded={expanded} accounts={accounts} />
    </div>
  );
}

interface ExpandSectionProps {
  expanded: boolean;
  accounts: Account[];
}
function ExpandSection({ expanded, accounts }: ExpandSectionProps) {
  return (
    <ul
      className={clsx(
        'overflow-hidden pl-5 md:pl-20',
        'flex gap-5',
        expanded ? 'h-full' : 'h-0'
      )}
    >
      {accounts.map((acc, i) => (
        <li key={acc.name}>
          <AccountInfo account={acc} />
        </li>
      ))}
    </ul>
  );
}

interface AccountInfoProps {
  account: Account;
}
function AccountInfo({ account }: AccountInfoProps) {
  return (
    <div className='flex items-center justify-between'>
      <h5>{account.bank_name}</h5>
      <h5>{account.subtype}</h5>
      <h5>{account.balance}</h5>
    </div>
  );
}

interface ExpandBtnProps {
  expanded: boolean;
  handleExpand: () => void;
}
function ExpandBtn({ handleExpand, expanded }: ExpandBtnProps) {
  const { mode } = useContext(ThemeContext);
  return (
    <button
      onClick={handleExpand}
      className={clsx(
        'z-0',
        'rounded-full bg-none p-2 ',
        mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-500',
        expanded && 'rotate-90'
      )}
    >
      <IoMdArrowDroprightCircle className='h-7 w-7' />
    </button>
  );
}

const AddBankBtn = () => {
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

const ConfigureBtn = () => {
  const { mode } = useContext(ThemeContext);
  const { handleBankConfigPopup } = useCabinetPageContext();
  return (
    <button
      className={clsx(
        'rounded-full bg-none p-2 ',
        mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-500'
      )}
      onClick={handleBankConfigPopup}
    >
      <FiSettings className='h-6 w-6' />
    </button>
  );
};

const RemoveBtn = () => {
  const { mode } = useContext(ThemeContext);
  const { handleDeleteBankPopup } = useCabinetPageContext();
  return (
    <button
      className={clsx(
        'rounded-full bg-none p-2 ',
        mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-500'
      )}
      onClick={handleDeleteBankPopup}
    >
      <MdDelete className='h-6 w-6' />
    </button>
  );
};
