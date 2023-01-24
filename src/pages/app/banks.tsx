import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import clsx from 'clsx';
import Layout from '@/components/page/app/Layout';
import { useAppPageContext } from '@/context/AppPageContext';
import {
  AccountsSection,
  StatisticSection,
  ListOfBanks,
} from '@/components/page/app/Banks';
import { demoData } from '@/constant/demoData';
import { Bank, ConnectedBanksDict } from '@/services/types';
import { getTotalBalanceByBank } from '@/lib/dataFunctions';

export default function BanksPage() {
  const { openSidebar } = useAppPageContext();
  const connectedBanksDict = demoData.connectedBanksDict;

  return (
    <BankPageProvider connectedBanksDict={connectedBanksDict}>
      <Layout>
        <section
          className={clsx(
            'pt-8 md:px-6',
            'flex h-full flex-col gap-4',
            openSidebar ? 'w-full md:w-[88.2%]' : 'w-full md:w-[95.8%]',
            'overflow-y-scroll'
          )}
        >
          <ListOfBanks connectedBanksDict={connectedBanksDict} />
          <BankSection connectedBanksDict={connectedBanksDict} />
        </section>
      </Layout>
    </BankPageProvider>
  );
}

function BankSection({
  connectedBanksDict,
}: {
  connectedBanksDict: ConnectedBanksDict;
}) {
  const { selectedBank } = useBankPageContext();
  const bankTotal =
    selectedBank &&
    getTotalBalanceByBank({
      bank: selectedBank,
      data: connectedBanksDict,
    });

  return (
    <div>
      {
        <div className='mb-6 flex items-center justify-start gap-10 px-2'>
          <h4 className='text-2xl'>
            {selectedBank ? selectedBank : 'Select bank'}
          </h4>
          <h5 className='text-2xl'>$ {selectedBank ? bankTotal : 'xxxxx'}</h5>
        </div>
      }
      <section className='my-0 flex h-full flex-col gap-x-4 lg:flex-row'>
        <AccountsSection connectedBanksDict={connectedBanksDict} />
        <StatisticSection />
      </section>
    </div>
  );
}

/* Bank page context to save selected bank card */
export function BankPageProvider({
  children,
  connectedBanksDict,
}: {
  children: ReactNode;
  connectedBanksDict: ConnectedBanksDict;
}) {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const [bankData, setBankData] = useState<Bank | null>(null);

  useEffect(() => {
    if (selectedBank) {
      setBankData(connectedBanksDict[selectedBank]);
    }
  }, [selectedBank]);

  return (
    <BankPageContext.Provider
      value={{
        setSelectedBank,
        selectedBank,
        bankData,
      }}
    >
      {children}
    </BankPageContext.Provider>
  );
}

const BankPageContext = createContext<{
  setSelectedBank: (bankName: string) => void;
  selectedBank: string | null;
  bankData: Bank | null;
}>({
  setSelectedBank: () => {},
  selectedBank: null,
  bankData: null,
});
export const useBankPageContext = () => useContext(BankPageContext);
