import {
  PlaidLinkProvider,
  usePlaidContext,
} from '@/services/plaid/PlaidLinkProvider';
import Layout from '@/components/page/cabinet/Layout';
import UserMenu from '@/components/page/cabinet/sections/User';
import BankMenu from '@/components/page/cabinet/sections/Banks';
import {
  CabinetPageProvider,
  useCabinetPageContext,
} from '@/context/CabinetContext';
import { Popup } from '@/components/shared/Popup';
import Button from '@/components/buttons/Button';
import LaunchLink from '@/components/plaid/LaunchLink';

export default function CabinetPage() {
  return (
    <PlaidLinkProvider>
      <CabinetPageProvider>
        <Cabinet />
      </CabinetPageProvider>
    </PlaidLinkProvider>
  );
}
CabinetPage.requireAuth = true;

const Cabinet = () => {
  const { linkToken } = usePlaidContext();
  return (
    <>
      <Layout>
        <UserMenu />
        <BankMenu />
      </Layout>
      <DeleteBankPopup />
      <ConfigBankPopup />
      {/* generate plaid link on Add Bank click to open Plaid UI */}
      {linkToken && <LaunchLink token={linkToken} />}
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
