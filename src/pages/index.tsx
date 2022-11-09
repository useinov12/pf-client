import React from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/homepage/layout/Layout';

import MainHero from '@/components/homepage/sections/MainHero';
import Showcase from '@/components/homepage/sections/Showcase';
import Expirience from '@/components/homepage/sections/Expirience';
import Instructions from '@/components/homepage/sections/Instructions';
import Reviews from '@/components/homepage/sections/Reviews';
import Banner from '@/components/homepage/sections/Banner';

export default function HomePage() {
  return (
    <Layout>
      <Toaster />
      <main>
        <MainHero />
        <Reviews />
        <Showcase />
        <Expirience />
        <Instructions />
        <Banner />
      </main>
    </Layout>
  );
}
