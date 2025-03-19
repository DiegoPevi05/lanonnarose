import Repostero from '../assets/images/cake_stand.png';
import Repostero_Shadow from '../assets/images/cake_stand_shadow.svg?react';

const Catalog = () => {
  return (
    <section id="catalog" className="w-full min-h-screen bg-transparent overflow-hidden relative">
        <div
          className="absolute left-0 bottom-0 w-[1500px] h-[750px] bg-cover bg-center"
          style={{ backgroundImage: `url(${Repostero})` }}
        >
          <Repostero_Shadow className="absolute left-0 bottom-0 w-full h-full"/>
        </div>
    </section>
  );
}

export default Catalog;
