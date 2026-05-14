import NavBar from './NavBar';
import Hero from './Hero';
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
          <div className="blank-section">
            <h2>Process Section</h2>
          </div>
        </section>
        <section id="products">
          <div className="blank-section">
              <h2>Products Section</h2>
          </div>
        </section>

      </main>
    </>
  );
}
