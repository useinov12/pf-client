import clsx from 'clsx';

import usePageProtection from '@/hooks/usePageProtection';

import Button from '@/components/buttons/Button';
import Layout from '@/components/page/app/Layout';
import BankMenu from '@/components/page/cabinet/Banks';
import { UserMenu as DesktopUserMenu } from '@/components/page/cabinet/User';
import LaunchLink from '@/components/plaid/LaunchLink';
import { Popup } from '@/components/shared/Popup';

import { demoData } from '@/constant/demo-data/demoData';
import {
  CabinetPageProvider,
  useCabinetPageContext,
} from '@/context/CabinetContext';
import { PageLoading } from '@/pages/app/overview';
import { useAuth } from '@/services/auth/queries';
import { useConnectedBanks } from '@/services/data/queries';
import {
  PlaidLinkProvider,
  usePlaidContext,
} from '@/services/plaid/PlaidLinkProvider';
import { ConnectedBanksDict } from '@/services/types';

export default function CabinetPage() {
  const { pageIsValidated } = usePageProtection();

  const { data: user, isSuccess } = useAuth();

  if (!pageIsValidated) return <PageLoading />;

  const isLoggedIn = isSuccess && user;

  return (
    <CabinetPageProvider>
      <PlaidLinkProvider>
        {isLoggedIn ? <CabinetPrivate /> : <CabinerPublic />}
      </PlaidLinkProvider>
    </CabinetPageProvider>
  );
}

function CabinetPrivate() {
  const { linkToken } = usePlaidContext();
  const { data, isLoading, isSuccess, isError } = useConnectedBanks();

  return (
    <>
      <Cabinet
        bankQuery={{
          data,
          isLoading,
          isSuccess,
          isError,
        }}
      />
      {/* generate plaid link on Add Bank click to open Plaid UI */}
      {linkToken && <LaunchLink token={linkToken} />}
    </>
  );
}

function CabinerPublic() {
  const data = demoData.connectedBanksDict;

  return (
    <Cabinet
      bankQuery={{
        data,
        isLoading: false,
        isSuccess: false,
        isError: false,
      }}
    />
  );
}

interface CabinetProps {
  bankQuery: BankQuery;
}

const Cabinet = ({ bankQuery }: CabinetProps) => {
  return (
    <>
      <Layout>
        <section
          data-fade='1'
          className={clsx(
            'flex',
            'px-0 md:px-6',
            'flex-col md:flex-row',
            'h-[87vh] w-full gap-4',
            'overflow-hidden'
          )}
        >
          <DesktopUserMenu />
          <BankMenu bankQuery={bankQuery} />
        </section>
      </Layout>

      <DeleteBankPopup />
      <ConfigBankPopup />
    </>
  );
};

const DeleteBankPopup = () => {
  const { openDeletePopup, handleDeleteBankPopup } = useCabinetPageContext();
  return (
    <Popup
      open={openDeletePopup}
      handleOpen={handleDeleteBankPopup}
      withCloseBtn
    >
      <div className='flex w-80 flex-col items-center justify-start p-3'>
        <h3 className='mb-3'>Remove bank</h3>
        <h5 className='text-center'>
          Your access token will be deleted. You will be able to re-connect bank
          by clicking `Add bank`
        </h5>
        <Button variant='red' className='mt-4'>
          Remove
        </Button>
      </div>
    </Popup>
  );
};

const ConfigBankPopup = () => {
  const { handleBankConfigPopup, openConfigPopup } = useCabinetPageContext();
  const { generateLinkToken } = usePlaidContext();
  return (
    <Popup
      open={openConfigPopup}
      handleOpen={handleBankConfigPopup}
      withCloseBtn
    >
      <div className='flex w-80 flex-col items-center justify-start p-3'>
        <h3 className='mb-3'>Configure Bank</h3>
        <h5 className='text-center'>
          Your will be redirected to the bank app. You will be able to configure
          permissions and credentials for PersonalFinance app
        </h5>
        <Button variant='primary' className='mt-6' onClick={generateLinkToken}>
          Go to the Bank
        </Button>
      </div>
    </Popup>
  );
};

export type BankQuery = {
  data: ConnectedBanksDict | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};
