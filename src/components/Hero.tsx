//import { styles } from '../styles';
import Link from '../components/ui/Link';
import { Phone, ClipboardList } from 'lucide-react';
import {useTranslation} from 'react-i18next'
import {calculateHeroFenceTopAndDelay} from '../lib/utils';
import {useEffect, useState} from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollToSectionButton from './ui/ScrollToSectionButton';
//import AnimatedComponent from './ui/AnimatedComponent';


interface HeroCompProps {
  windowSize: "sm" | "md" | "lg" | "xl";
  title: string;
  content: string;
}

const Hero = (props:HeroCompProps) => {

  const {t} = useTranslation();

  const {windowSize, title, content} = props;

  const [topDistance, setTopDistance] = useState<number>(20);
  const [fenceItems, setFenceItems] = useState<number[]>(Array.from({length:50},(_,i)=>i));

  useEffect(()=>{
    if(windowSize === "sm"){
      setFenceItems(Array.from({length:16},(_,i)=>i));
      setTopDistance(50);
    }else if(windowSize === "md"){
      setFenceItems(Array.from({length:20},(_,i)=>i));
      setTopDistance(40);
    }else if(windowSize === "lg"){
      setFenceItems(Array.from({length:36},(_,i)=>i));
      setTopDistance(10);
    }
  },[windowSize])

  return(
      <section
        id="hero-section"
        className="relative w-full h-[100vh] mx-auto bg-hero bg-repeat z-[120]"
        style={{ backgroundSize: '250px 250px' }}
      >
            <h1 className="
              hero-heading-text
              animation-element
              text-6xl sm:text-8xl 
              text-primary
              text-center
              font-heading 
              top-[30%] left-1/2 -translate-y-1/2
              text-wrap
              absolute
              z-[10]
            "
            >
              {title}
            </h1>
            <p className="
              hero-subtitle-text
              animation-element
              text-white
              bg-primary 
              rounded-lg
              px-4
              absolute
              text-lg sm:text-xl
              text-center
              top-[50%] left-1/2 -translate-y-1/2
              ">
              {content}
            </p>
            <div className="
              absolute
              hero-buttons
              animation-element
              top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2
              flex flex-row gap-5
            ">

              <ScrollToSectionButton sectionId='catalog' className='font-heading border-2 border-primary text-primary px-5 py-2 rounded-lg bg-secondary hover:bg-primary hover:text-white transition-all duration-300 ease-in-out active:scale-95 inline-flex gap-x-2'>
                <ClipboardList/>
                {t('See Catalog')}
              </ScrollToSectionButton>
              <a href="https://api.whatsapp.com/send?phone=19162892853&text=Hola%20Nonna%20Rose" target="_blank" className='font-heading border-2 bg-secondary border-cocoa text-cocoa px-5 py-2 rounded-lg hover:bg-cocoa hover:text-white transition-all duration-300 ease-in-out active:scale-95 inline-flex gap-x-2'>
                <Phone/>{t('Send Message')}
              </a>
            </div>
        <div
          className="
            w-full h-[30%] 
            bg-transparent
            absolute bottom-0 
            flex
            z-[50]
          "
        >
          <ScrollToSectionButton  
            sectionId="about_us"
            className="
            h-auto
            w-auto
            absolute
            bottom-[30%]
            bg-secondary
            text-primary
            duration-300
            hover:bg-primary
            hover:text-secondary
            hover:border-secondary
            border-2 border-primary
            p-1
            inline-flex
            justify-center
            items-center
            rounded-full
            left-1/2 -translate-x-1/2 -translate-y-1/2
            z-[80]
            cursor-pointer
            animation-element
            bounce
            ">
            <ChevronDown className='h-10 w-10'/>
          </ScrollToSectionButton>
          {fenceItems.map((_, i) => {
            const { topValue, delay } = calculateHeroFenceTopAndDelay(
              fenceItems.length, i, 6, topDistance, 0.05, 20);
            return (
              <span
                key={"fence_item_" + i}
                style={{ top: `${topValue}%`, animationDelay: `${delay}s` }}
                className={`
                  relative
                  rounded-full
                  shadow-lg
                  ${ i % 2 === 0 ? 'bg-fence-gradient-cocoa' : 'bg-fence-gradient'}
                  fence-item 
                  h-[110%]
                  flex-1
                `}
              />
            );
          })}
        </div>
      </section>
  )
}

export default Hero;
