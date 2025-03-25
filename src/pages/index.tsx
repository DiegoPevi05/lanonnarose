import { FC,useState, useEffect} from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import {WebData} from '../interfaces'
//import { useLoader } from '../contexts/loader';
import {getScreenSize} from '../lib/utils';
import About from '../components/About';
import Events from '../components/Events';
import Catalog from '../components/Catalog';
import products from '../lib/data';
import Contact from '../components/Contact';
import ShoppingCart from '../components/Cart';

interface HomeProps {
  webData: WebData | undefined;
}

const Home:FC<HomeProps> = () => {


  //const { showLoader, hideLoader } = useLoader();

  const [windowSize,setWindowSize] = useState<"sm"|"md"|"lg"|"xl">("xl");

  /*const [loading,setLoading] = useState(true);*/

  useEffect(()=>{

    setWindowSize(getScreenSize(window.innerWidth));
    window.addEventListener('resize',()=>{
      setWindowSize(getScreenSize(window.innerWidth));
    })

    return ()=>{
      window.removeEventListener('resize',()=>{});
    }

  },[])

  useEffect(() => {
    // Select elements after mount
    const animationElements = document.querySelectorAll('.animation-element');

    if (animationElements.length === 0) {
      console.warn('No .animation-element found in the DOM!');
      return;
    }

    // Create an IntersectionObserver instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }         
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    // Observe each animation element
    animationElements.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup on unmount
    return () => {
      animationElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []); // Empty dependency array: Runs once on mount

  return(
    <div className='relative scroll-snap-parent'>
      <ShoppingCart/>
      <Navbar/>
      <Hero windowSize={windowSize} title={"Bienvenido a La Nona Rose"} content="Encuentra los mejores postres que puedas encontrar"/>
      <About/>
      <Events windowSize={windowSize}/>
      <Catalog windowSize={windowSize} products={products}/>
      <Contact/>
    </div>
  )

}

export default Home;
