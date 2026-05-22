import {useState} from 'react';
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


export default function EthioNug() {
  const [lang, setLang] = useState('en');
  return (
    <>
    <div className = {lang == 'am' ? "lang--am" : "lang-en"}>
        <NavBar lang={lang} setLang={setLang} />
        <main>
          <section id="home">
            <Hero lang={lang} />
          </section>
          <section id="process">
            <Process lang={lang} />
          </section>
          <section id="products">
            <OurProducts lang={lang}/>
          </section>
          <section id="about">
            <About lang={lang}/>
          </section>
          <section id="testimonials">
            <Testimonials lang={lang}/>
          </section>
          <section id="faqs">
            <FAQs lang={lang}/>
          </section>
          <section id="contact">
            <Contact lang={lang}/>
          </section>
          <footer>
            <Footer lang = {lang}/>
          </footer>
        </main>
    </div>
    </>
  );
}
