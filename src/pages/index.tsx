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

interface HomeProps {
  webData: WebData | undefined;
}

const Home:FC<HomeProps> = () => {

  //const { showLoader, hideLoader } = useLoader();

  const [windowSize,setWindowSize] = useState<"sm"|"md"|"lg"|"xl">("xl");

  /*const [loading,setLoading] = useState(true);*/

  useEffect(()=>{

    /*showLoader("page");

    setTimeout(()=>{

      hideLoader();

      },2000)*/

    setWindowSize(getScreenSize(window.innerWidth));
    window.addEventListener('resize',()=>{
      setWindowSize(getScreenSize(window.innerWidth));
    })

    return ()=>{
      window.removeEventListener('resize',()=>{});
    }

  },[])


  return(
    <>
      <Navbar/>
      <Hero windowSize={windowSize} title={"Bienvenido a La Nona Rose"} content="Encuentra los mejores postres que puedas encontrar"/>
      {/*
        <About webContent={webData.webContent}/>
        <Catalog webContent={webData.webContent} products={webData.products} isSection={false} />
        <Blog webContent={webData.webContent} blogs={webData.blogs}/>
        <Contact/>
      */}
    </>
  )

}

export default Home;
