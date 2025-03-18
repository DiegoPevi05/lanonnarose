//import { styles } from '../styles';
import Link from '../components/ui/Link';
import { Phone, ClipboardList } from 'lucide-react';
import {useTranslation} from 'react-i18next'
import {calculateHeroFenceTopAndDelay} from '../lib/utils';
import {useEffect, useState} from 'react';
import { ChevronDown } from 'lucide-react';
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
        className="relative w-full h-[100vh] mx-auto overflow-hidden bg-hero bg-repeat z-[120]"
        style={{ backgroundSize: '250px 250px' }}
      >
            <h1 className="
              hero-heading-text
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
              top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2
              flex flex-row gap-5
            ">
              <Link className="text-sm sm:text-md gap-2" href="#catalog"><ClipboardList/>{t('See Catalog')}</Link>
              <Link className="text-sm sm:text-md gap-2" href="https://api.whatsapp.com/send?phone=19162892853&text=Hola%20Nonna%20Rose" target="_blank"><Phone/>{t('Send Message')}</Link>
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
          <span className="
            bounce
            h-auto
            w-auto
            absolute
            bottom-[30%]
            bg-secondary
            text-primary
            border-2 border-primary
            p-1
            inline-flex
            justify-center
            items-center
            rounded-full
            left-1/2 -translate-x-1/2 -translate-y-1/2
            z-[80]
            cursor-pointer
            ">
            <ChevronDown className='h-10 w-10'/>
          </span>
          {fenceItems.map((_, i) => {
            const { topValue, delay } = calculateHeroFenceTopAndDelay(
              fenceItems.length, i, 6, topDistance, 0.05, 20);
            return (
              <span
                key={"fence_item_" + i}
                style={{ top: `${topValue}%`, animationDelay: `${delay}s` }}
                className={`
                  relative
                  rounded-t-full
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
