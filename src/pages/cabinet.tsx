import { PlaidLinkProvider } from '@/services/plaid/PlaidLinkProvider';
import Layout from '@/components/page/cabinet/Layout';
import UserMenu from '@/components/page/cabinet/sections/User';
import BankMenu from '@/components/page/cabinet/sections/Banks';
import {
  CabinetPageProvider,
  useCabinetPageContext,
} from '@/context/CabinetContext';
import { Popup } from '@/components/Popup';
import Button from '@/components/buttons/Button';

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
  return (
    <>
      <Layout>
        <UserMenu />
        <BankMenu />
      </Layout>
      <DeleteBankPopup />
      <SettingsPopup />
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

const SettingsPopup = () => {
  const { handleBankConfigPopup, openConfigPopup } = useCabinetPageContext();
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
        <Button variant='primary' className='mt-6'>
          Go to the Bank
        </Button>
      </div>
    </Popup>
  );
};
