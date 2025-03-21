import {useEffect, useRef, useState} from 'react';
import Repostero from '../assets/images/cake_stand.png';
import ReposteroShadowSVG from '../assets/images/cake_stand_shadow.svg?raw';
import {X} from 'lucide-react';
import Cake from "../assets/images/cake.svg";
import ProductCard from './ProductCard';

interface CatalogProps {
  products: (Cake|Dessert)[];
}

const Catalog = (props:CatalogProps) => {

  const { products } = props;

  const [selectedGroup, setSelectedGroup] = useState<(Cake|Dessert)[] | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedType, setSelectedType] = useState('CAKE');

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const selectorRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const selector = selectorRef.current;
    if (!selector) return;

    const cakeIds = [
      '#shadow_cake_1',
      '#shadow_cake_2',
      '#shadow_cake_3',
      '#shadow_cake_4',
      '#shadow_cake_5',
      '#shadow_cake_6',
      '#shadow_cake_7',
      '#shadow_cake_8'
    ];

    const elements = selector.querySelectorAll(cakeIds.join(','));

    const handleClick = (event: Event) => {
      setSelectedGroup(null);
      setOpenModal(true);

      setTimeout(() => {
        const target = event.target as SVGElement;
        const elementId = target.id;

        console.log(elementId);
        if(elementId === 'shadow_cake_1' || elementId === 'shadow_cake_2' || elementId === 'shadow_cake_3' || elementId === 'shadow_cake_4'){
          setSelectedType('DESSERT');
        }else{
          setSelectedType('CAKE');
        }
        setSelectedGroup(products.filter((product) => product.selector_ref === elementId));

      }, 800);
    };

    elements.forEach((element) => {
      element.addEventListener('click', handleClick);
    });

    // Cleanup
    return () => {
      elements.forEach((element) => {
        element.removeEventListener('click', handleClick);
      });
    };
  }, []);

  useEffect(() => {
      const selector = selectorRef.current;
      if (!selector || !selectedGroup) return;

      const cakeIds = [
        '#shadow_cake_1',
        '#shadow_cake_2',
        '#shadow_cake_3',
        '#shadow_cake_4',
        '#shadow_cake_5',
        '#shadow_cake_6',
        '#shadow_cake_7',
        '#shadow_cake_8'
      ];

      const elements = selector.querySelectorAll(cakeIds.join(','));
      elements.forEach((element) => {
        if (element.id === selectedGroup[0].selector_ref) {
          element.classList.add('selected');
        } else {
          element.classList.remove('selected');
        }
      });
    }, [selectedGroup]);



  return (
    <section id="catalog" className="w-full min-h-screen bg-hero overflow-hidden relative"
        style={{ backgroundSize: '250px 250px' }}
    >
        <div
          className="absolute left-0 bottom-0 w-[1500px] h-[750px] bg-cover bg-center"
          style={{ backgroundImage: `url(${Repostero})` }}
        >
          <svg
            ref={selectorRef}
            className="absolute left-0 bottom-0 w-full h-full"
            dangerouslySetInnerHTML={{ __html: ReposteroShadowSVG }}
          />
        </div>

        <div className={`absolute ${ openModal ? 'right-20 opacity-1': '-right-[100%] opacity-0'} top-1/2 -translate-y-1/2 w-[35%] h-[80%] bg-catalog-modal p-8 z-[160] rounded-xl shadow-lg flex flex-col justify-start items-start transition-all duration-[0.8s] bg`}>
            <button className='absolute -top-6 -right-6 bg-cocoa text-secondary rounded-full p-2 h-auto w-auto hover:scale-110 active:scale-95 duration-300' onClick={()=>toggleModal()}>
              <X className='h-12 w-12'/>
            </button>
            <p className='text-cocoa font-heading text-sm'>Birthday Cakes</p>
          <h2 className='text-primary font-heading text-6xl text-shadow-primary'>{ selectedType === 'CAKE' ? 'Cakes' : 'Desserts'}</h2>
            <div className='w-full h-full overflow-y-auto flex flex-col justify-start items-start gap-y-4 mt-6 no-scroll-bar '>
              {selectedGroup == null && (
                <div className='w-full h-full flex flex-col justify-center items-center'>
                  <img 
                   src={Cake} 
                   alt="cake" 
                   className="
                     w-36 h-36
                     vibrating-svg" 
                  />
                </div>
              )}
              {selectedGroup && selectedGroup.map((product:(Cake|Dessert)) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

    </section>
  );
}

export default Catalog;
