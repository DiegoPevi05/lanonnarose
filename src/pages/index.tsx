import { FC,useState, useEffect} from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
//import Catalog from '../components/Catalog';
//import Contact from '../components/Contact';
//import About from '../components/About';
//import Blog from '../components/Blog';
import {WebData} from '../interfaces'
//import Loader from '../components/ui/Loader';
//import { useLoader } from '../contexts/loader';
import {getScreenSize} from '../lib/utils';
import Events from '../components/Events';
import Catalog from '../components/NewCatalog';

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
    console.log('Animation elements found:', animationElements.length);

    if (animationElements.length === 0) {
      console.warn('No .animation-element found in the DOM!');
      return;
    }

    // Create an IntersectionObserver instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Adding in-view to:', entry.target);
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
    <div className='relative'>
      <Navbar/>
      <Hero windowSize={windowSize} title={"Bienvenido a La Nona Rose"} content="Encuentra los mejores postres que puedas encontrar"/>
      <Events/>
      <Catalog/>
      {/*
        <About webContent={webData.webContent}/>
        <Catalog webContent={webData.webContent} products={webData.products} isSection={false} />
        <Blog webContent={webData.webContent} blogs={webData.blogs}/>
        <Contact/>
      */}
    </div>
  )

}

export default Home;
