import NavBar from './NavBar';
import Hero from './Hero';
import './index.css';

export default function EthioNug() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        {/* Future sections: Process, Products, About, Testimonials, FAQs */}
      </main>
    </>
  );
}
