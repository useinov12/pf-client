import { PlaidLinkProvider } from '@/services/plaid';
import Layout from '@/components/page/cabinet/layout/Layout';
import User from '@/components/page/cabinet/sections/User';
import Settings from '@/components/page/cabinet/sections/Settings';

export default function CabinetPage() {
  return (
    <PlaidLinkProvider>
      <Cabinet />
    </PlaidLinkProvider>
  );
}
CabinetPage.requireAuth = true;

const Cabinet = () => {
  return (
    <Layout>
      <User/>
      <Settings/>
    </Layout>
  );
};
