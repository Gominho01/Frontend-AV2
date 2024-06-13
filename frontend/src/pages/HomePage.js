import React from 'react';
import Header from '../components/HomePage/Header';
import Services from '../components/HomePage/Services';
import FounderTable from '../components/HomePage/FounderTable';
import Footer from '../components/HomePage/Footer';
import History from '../components/HomePage/History';

const Home = () => {
  return (
    <div>
      <Header />
      <section>
        <History />
        <Services />
        <FounderTable />
      </section>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default Home;

