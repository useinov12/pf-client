import Image from 'next/image';

import ArrowLink from '@/components/links/ArrowLink';
import Layout from '@/components/page/app/Layout';

export default function ComingSoonBanner() {
  return (
    <Layout>
      <div className=' h-full w-full  lg:h-[87vh]' data-fade='1'>
        <div className='flex h-full w-full flex-col items-center justify-center gap-5'>
          <Image src='/images/logo.png' width={70} height={66} alt='logo' />
          <h1>Coming soon...</h1>
          <ArrowLink href='https://ruslan-useinov.com/blog/personal-finance'>
            Read about progress
          </ArrowLink>
        </div>
      </div>
    </Layout>
  );
}
