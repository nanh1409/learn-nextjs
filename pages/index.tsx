import React from 'react';
import { MainLayout } from '../components/layout';
import { NextPageWithLayout } from '../models/common';
import { HeroSection } from '../components/home';
import { Box } from '@mui/system';

const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <HeroSection />
    </Box>
  );
};

Home.Layout = MainLayout;

export default Home;
