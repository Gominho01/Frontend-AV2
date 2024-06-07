import React from 'react';
import Header from '../components/HomePage/Header';
import Services from '../components/HomePage/Services';
import FounderTable from '../components/HomePage/FounderTable';
import Contact from '../components/HomePage/Contact';
import Address from '../components/HomePage/Address';
import History from '../components/HomePage/History';
import PaymentMethods from '../components/HomePage/PaymentMethods';

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
        <Contact />
        <Address />
        <PaymentMethods />
      </footer>
    </div>
  );
};

export default Home;

