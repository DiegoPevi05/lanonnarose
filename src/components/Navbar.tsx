import { FC, useState} from 'react';
import {Logo} from '../assets/images';
import Cake from '../assets/images/cake_6.svg';
import { XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface INavigation {
  name: string;
  label: string;
  href: string;
}

const navigation:INavigation[] = [
  { name: 'home',label:'Home', href: '#' },
  { name: 'us', label:'Us',href: '#us' },
  { name: 'catalog',label:'Catalog', href: '#catalog' },
  { name: 'blog',label:'Blog' ,href: '#blog' },
  { name: 'contact',label:'Contact Us', href: '#contact' }
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
      <div className="fixed top-0 z-[140] w-full h-auto max-h-screen relative bg-transparent">
        <button 
          id="btn_open_navbar" 
          onClick={onToggleNavbar}
          className="absolute top-12 right-12 w-24 h-24">
          <img src={Cake} alt="cake_open_navbar" className="menu-btn h-16 sm:h-24 w-auto"/> 
        </button>
        <section 
          id="navbar" 
          className={`
          absolute top-0 left-0 
          px-24 py-12
          m-0
          sidebar bg-secondary overflow-hidden
          ${hasInteracted ? (isOpen ? 'open opacity-1' : 'close opacity-1') : 'opaity-0'}`}
        >

          <button 
            id="btn_close_navbar" 
            onClick={onToggleNavbar}
            className="absolute top-12 right-12 w-24 h-24">
            <XIcon className='menu-btn h-16 sm:h-24 w-auto hover:text-primary' />
          </button>

          <nav className="w-auto h-full flex flex-col justify-start items-start gap-y-12">

            <span className="inline-flex justify-center items-center p-1 rounded-full border-2 border-primary">

              <img src={Logo} alt="logo" className="h-16 sm:h-24 w-auto rounded-full"/> 

            </span>

            <ul className='mt-auto flex flex-col items-start justify-start gap-y-4'>
              {navigation.map((item,index)=>(
                <a key={"Link_"+index} 
                  href={item.href}
                >
                  <li key={"Link_"+item.name} 
                  className="navbar-link text-5xl font-bold font-heading text-primary hover:text-rose ease-in-out duration-300">{t(item.label)}</li>
                </a>
              ))}
            </ul>
          </nav>
        </section>
      </div>
  );
}

export default Navbar;
