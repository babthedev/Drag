import Header from './Header';
import Hero from './Hero';
import Highlights from './Highlights';
import Alternables from './Alternables';
import Footer from './Footer';
import Testimonials from './Testimonials'; // Import Testimonials component
import { selectDarkMode } from '../features/homeSlice';
import { useSelector } from 'react-redux';
import Pricing from './Pricing';

const Homepage = () => {
  const isDarkMode = useSelector(selectDarkMode);

  return (
    <div className={` ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header />
      <Hero />
      <Highlights />
      <Alternables />
      <Pricing />
      <Testimonials/>
      <Footer />
    </div>
  );
};

export default Homepage;
