import { StoreProvider } from './context/StoreContext.jsx';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import Bestsellers from './components/Bestsellers.jsx';
import PromoBanner from './components/PromoBanner.jsx';
import Shop from './components/Shop.jsx';
import WhyUs from './components/WhyUs.jsx';
import FestivalKits from './components/FestivalKits.jsx';
import Testimonials from './components/Testimonials.jsx';
import ContactCTA from './components/ContactCTA.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Toasts from './components/Toasts.jsx';

export default function App() {
  return (
    <StoreProvider>
      <div id="top">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-maroon-900 focus:px-4 focus:py-2 focus:text-ivory-50">
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">
          <Hero />
          <Categories />
          <Bestsellers />
          <PromoBanner />
          <Shop />
          <WhyUs />
          <FestivalKits />
          <Testimonials />
          <ContactCTA />
        </main>
        <Footer />
        <CartDrawer />
        <Toasts />
      </div>
    </StoreProvider>
  );
}
