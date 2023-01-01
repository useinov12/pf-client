import React from 'react';
import Layout from '@/components/page/landing/Layout';
import MainHero from '@/components/page/landing/sections/MainHero';
import Demo from '@/components/page/landing/sections/Demo';
// import Showcase from '@/components/page/landing/sections/Showcase';
import Expirience from '@/components/page/landing/sections/Expirience';
import Instructions from '@/components/page/landing/sections/Instructions';
import Reviews from '@/components/page/landing/sections/Reviews';
import Banner from '@/components/page/landing/sections/Banner';
import { SignInForm } from '@/components/LoginForm/Form';

export default function HomePage() {
  return (
    <>
      <Layout>
        <MainHero />
        <Demo/>
        <Reviews />
        <Expirience />
        {/* <Showcase /> */}
        <Instructions />
        <Banner />
      </Layout>
      <SignInForm withCloseBtn/>
    </>
  );
}

HomePage.requireAuth = false;