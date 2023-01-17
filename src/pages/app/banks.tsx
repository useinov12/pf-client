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
import { sampleData } from '@/components/page/cabinet/sections/sampleData';
import { Bank, ConnectedBanksDict } from '@/services/types';

export default function BanksPage() {
  const { openSidebar } = useAppPageContext();
  const connectedBanksDict = sampleData;

  return (
    <BankPageProvider connectedBanksDict={sampleData}>
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
          <div className='my-0 flex h-full flex-col gap-x-4 lg:flex-row'>
            <AccountsSection connectedBanksDict={connectedBanksDict} />
            <StatisticSection />
          </div>
        </section>
      </Layout>
    </BankPageProvider>
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

export const useBankPageContext = () => useContext(BankPageContext);
