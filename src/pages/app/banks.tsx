import clsx from 'clsx';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import ListOfBanks from '@/components/page/app/banks/BankList';
import BankSection from '@/components/page/app/banks/SelectedBank';
import Layout from '@/components/page/app/Layout';

import { demoData } from '@/constant/demo-data/demoData';
import { Bank, ConnectedBanksDict } from '@/services/types';

export default function BanksPage() {
  const banksData = demoData;

  return (
    <BankPageProvider connectedBanksDict={banksData.connectedBanksDict}>
      <Layout>
        <section
          data-fade='1'
          className={clsx(
            'flex',
            'px-2 md:px-6',
            'flex-col',
            'h-[85vh] w-full gap-6'
          )}
        >
          <ListOfBanks connectedBanksDict={banksData.connectedBanksDict} />
          <BankSection banksData={banksData} />
        </section>
      </Layout>
    </BankPageProvider>
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
