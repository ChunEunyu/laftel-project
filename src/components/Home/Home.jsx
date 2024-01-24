import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HomeSlider from './HomeSlider';

const Home = () => {
  return (
    <>
      <div>
        <Header />
        <div className='h-screen'>
          <HomeSlider className='z-10' />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
