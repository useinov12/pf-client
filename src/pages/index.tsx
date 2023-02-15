import React from 'react';

import Layout from '@/components/page/landing/Layout';
import Banner from '@/components/page/landing/sections/Banner';
import Demo from '@/components/page/landing/sections/Demo';
import Expirience from '@/components/page/landing/sections/Expirience';
import Instructions from '@/components/page/landing/sections/Instructions';
import MainHero from '@/components/page/landing/sections/MainHero';
import Reviews from '@/components/page/landing/sections/Reviews';

export default function HomePage() {
  return (
    <Layout>
      <MainHero />
      <Demo />
      <Expirience />
      <Reviews />
      <Instructions />
      <Banner />
    </Layout>
  );
}
