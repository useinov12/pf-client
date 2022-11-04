import React from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/layout/Layout';

import MainHero from '@/components/homepage/sections/MainHero';
import Showcase from '@/components/homepage/sections/Showcase';
import Demo from '@/components/homepage/sections/Demo';
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
        <Demo />
        <Showcase />
        <Expirience />
        <Instructions />
        <Reviews />
        <Banner/>
      </main>
    </Layout>
  );
}
