import { useState } from 'react';
import clsx from 'clsx';
import { ConnectedBanksDict, Account } from '@/services/types';
import Collapse from '@/components/shared/Collapse';
import { useTheme } from '@/context/ThemeProvider';

import { FiSettings } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { IoMdArrowDroprightCircle } from 'react-icons/io';

import { useCabinetPageContext } from '@/context/CabinetContext';

const getBankList = (data: ConnectedBanksDict) => Object.keys(data);
const getAccountsByBank = (bank: string, data: ConnectedBanksDict) =>
  data[bank];

export default function ConnectedBanks({
  banksData,
}: {
  banksData: ConnectedBanksDict | undefined;
}) {
  if (!banksData) return null;
  const connectedBanksList = getBankList(banksData);
  return (
    <ul className='md:px-4'>
      {connectedBanksList.map((bank) => (
        <li key={bank} className='md:my-2'>
          <BankInstance
            bankName={bank}
            accounts={getAccountsByBank(bank, banksData)}
          />
        </li>
      ))}
    </ul>
  );
}

interface BankMenuProps {
  bankName: string;
  accounts: Account[];
}
function BankInstance({ bankName, accounts }: BankMenuProps) {
  const [open, setOpen] = useState(false);
  function handleCollapse() {
    setOpen((p) => !p);
  }
  return (
    <div
      className={clsx(
        'md:rounded',
        'h-full overflow-hidden',
        'border-t border-b border-gray-500/50 md:border',
        'shadow-sm hover:shadow-gray-400/30'
      )}
    >
      <div className='relative flex items-center gap-2 py-1 px-2'>
        <CollapseButton handleCollapse={handleCollapse} expanded={open} />

        <h5 className='font-mono font-semibold'>{bankName}</h5>

        <div className='fixed right-3 md:right-10'>
          <ConfigureBankButton />
          <RemoveBankButton />
        </div>
      </div>

      <Collapse isCollapsed={open} className='pl-5 md:pl-20'>
        <Accounts accounts={accounts} />
      </Collapse>
    </div>
  );
}

interface AccountsProps {
  accounts: Account[];
}
function Accounts({ accounts }: AccountsProps) {
  return (
    <table className='w-full table-fixed'>
      <thead>
        <tr>
          <th>Account</th>
          <th>Type</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((acc, i) => (
          <tr key={acc.name}>
            <td>{acc.name}</td>
            <td>{acc.subtype}</td>
            <td>$ {acc.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface CollapseBtnProps {
  expanded: boolean;
  handleCollapse: () => void;
}
function CollapseButton({ handleCollapse, expanded }: CollapseBtnProps) {
  const { mode } = useTheme();
  return (
    <button
      onClick={handleCollapse}
      className={clsx(
        'h-full',
        'rounded-full bg-none p-2',
        mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-500',
        expanded && 'rotate-90'
      )}
    >
      <IoMdArrowDroprightCircle className='h-7 w-7' />
    </button>
  );
}

const ConfigureBankButton = () => {
  const { mode } = useTheme();
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
const RemoveBankButton = () => {
  const { mode } = useTheme();
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
