import { FC, useState} from 'react';
import {Logo} from '../assets/images';
import Cake from '../assets/images/cake_6.svg';
import { XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollToSectionButton from './ui/ScrollToSectionButton';

interface INavigation {
  name: string;
  label: string;
  href: string;
}

const navigation:INavigation[] = [
  { name: 'home',label:'navbar.home', href: 'hero-section' },
  { name: 'about_us',label:'navbar.about_us' ,href: 'about_us' },
  { name: 'events', label:'navbar.events',href: 'events' },
  { name: 'catalog',label:'navbar.catalog', href: 'catalog' },
  { name: 'contact',label:'navbar.contact_us', href: 'contact_us' }
]

const Navbar: FC = () => {

  const {  t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // Tracks if user has toggled the sidebar

  const onToggleNavbar = () => {
    setIsOpen((prev) => !prev); // Toggle the open state
    setHasInteracted(true); // Mark that the user has interacted
  };


  return(
      <div className="pointer-events-none fixed top-0 bottom-0 left-0 right-0 z-[140] w-full h-auto max-h-screen bg-transparent">
        <button 
          id="btn_open_navbar" 
          onClick={onToggleNavbar}
          className="absolute top-6 sm:top-12 right-6 sm:right-12 w-auto h-auto pointer-events-auto">
          <img src={Cake} alt="cake_open_navbar" className="menu-btn h-14 sm:h-24 sm:h-24 w-auto"/> 
        </button>
        <section 
          id="navbar" 
          className={`
          absolute 
          px-10 sm:px-24 py-6 sm:py-12
          m-0
          sidebar bg-secondary overflow-hidden
          ${hasInteracted ? (isOpen ? 'open opacity-1' : 'close opacity-1') : 'opaity-0'}`}
        >

          <button 
            id="btn_close_navbar" 
            onClick={onToggleNavbar}
            className="absolute top-6 sm:top-12 right-6 sm:right-12 w-auto h-auto">
            <XIcon className='menu-btn h-16 sm:h-24 w-auto hover:text-primary' />
          </button>

          <nav className="w-auto h-full flex flex-col justify-start items-start gap-y-12">

            <span className="inline-flex justify-center items-center p-1 rounded-full border-2 border-primary">

              <img src={Logo} alt="logo" className="h-16 sm:h-24 w-auto rounded-full"/> 

            </span>

            <ul className='mt-auto flex flex-col items-start justify-start gap-y-4'>
              {navigation.map((item,index)=>(
                <ScrollToSectionButton key={"Link_"+index} 
                  sectionId={item.href}
                  onHandle={onToggleNavbar}
                >
                  <li key={"Link_"+item.name} 
                    className="navbar-link text-3xl sm:text-5xl font-bold font-heading text-primary hover:text-rose ease-in-out duration-300">{t(item.label)}</li>
                </ScrollToSectionButton>
              ))}
            </ul>
          </nav>
        </section>
      </div>
  );
}

export default Navbar;
