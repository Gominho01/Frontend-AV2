import React from 'react';
import Header from './Header';
import Services from './Services';
import FounderTable from './FounderTable';
import Contact from './Contact';
import Address from './Address';
import PaymentMethods from './PaymentMethods';

const Home = () => {
  return (
    <div>
      <Header />
      <section>
        <Home />
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

