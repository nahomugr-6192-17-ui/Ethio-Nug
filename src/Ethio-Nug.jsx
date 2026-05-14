import NavBar from './NavBar.jsx';
import Hero from './Hero.jsx';
import Process from './Process.jsx';
import OurProducts from './OurProducts.jsx';
import About from './About.jsx';
import Testimonials from './Testimonials.jsx';
import FAQs from './FAQs.jsx';
import Contact from './Contact.jsx';
import Footer from './Footer.jsx';
import './index.css';
import './BlankPlaceHolder.css';


export default function EthioNug() {
  return (
    <>
      <NavBar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="process">
          <Process/>
        </section>
        <section id="products">
          <OurProducts/>
        </section>
        <section id="about">
          <About/>
        </section>
        <section id="testimonials">
          <Testimonials/>
        </section>
        <section id="faqs">
          <FAQs/>
        </section>
        <section id="contact">
          <Contact/>
          
        </section>
        <footer>
          <Footer/>
        </footer>
      </main>
    </>
  );
}
