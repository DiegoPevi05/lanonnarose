import {ChevronDown, ChevronUp, MilkOff, ShoppingCart} from "lucide-react";
import {WheatOff} from "lucide-react";
import {Apple, Cake, CandyOff, Cookie, Croissant, EggOff, HopOff, Leaf} from "lucide-react";
import {useCallback, useState} from "react";
import CookieIMG from "../assets/images/cookie_selector.png";
import CakeIMG from "../assets/images/cake_selector.png";
import {useCart} from "../contexts/CartContext";


interface ProductCardProps {
  product: Cake | Dessert;
}

const CakeSizeOption = ({ name, label, value, id, index, dataType, productType }: { name:string, label: string, value: string, id: string, index:number, dataType:string, productType:'CAKE' | 'DESSERT' }) => {

  const step = 6;
  const radius = 56 + index * step;

  return(
    <div 
      style={{ width: `${radius}px`, height: `${radius}px` }}
      className={`relative flex items-center group mb-2`}>
      <input
        id={id}
        name={name}
        data-type={dataType}
        type="radio"
        style={{ backgroundImage: `url(${ productType == 'CAKE' ?  CakeIMG : CookieIMG })` }}
        className={`
          appearance-none
          w-full
          h-full
          rounded-full
          border-4
          border-tertiary
          bg-cover
          bg-center
          group-hover:border-primary
          checked:border-primary
          transition-all
          duration-300
          cursor-pointer
          peer
          group-active:scale-105
          duration-300
        `}
        value={value}
      />
      <label
        htmlFor={`checkbox-${index}`}
        className={`
          group-active:scale-105
          absolute
          -bottom-4
          w-full
          h-4
          flex
          items-center
          justify-center
          text-[10px]
          text-cocoa
          group-hover:text-cocoa
          checked:text-cocoa
          pointer-events-none
          select-none
        `}
      >
        {label}
      </label>
    </div>
  );
}

const InputOption = ({ name, label, value, id, index, dataType }: { name:string, label: string, value: string, id: string, index:number, dataType:string }) => {


  let width = 5;
  if(label.length > 14){
    width = 8
  }

  return(
    <div 
      style={{ width: `${width}rem` }}
      className="relative flex items-center group">
      <input
        id={id}
        name={name}
        data-type={dataType}
        type="checkbox"
        className={`
          appearance-none
          w-full
          h-8
          rounded-full
          border-2
          border-tertiary
          bg-rose
          group-hover:border-cocoa
          group-hover:bg-cocoa
          checked:border-cocoa
          checked:bg-cocoa
          transition-all
          duration-300
          cursor-pointer
          peer
          group-active:scale-105
          duration-300
        `}
        value={value}
      />
      <label
        htmlFor={`checkbox-${index}`}
        className={`
          group-active:scale-105
          absolute
          left-0
          w-full
          h-8
          flex
          items-center
          justify-center
          text-[10px]
          text-secondary
          group-hover:text-secondary
          checked:text-primary
          pointer-events-none
          select-none
        `}
      >
        {label}
      </label>
    </div>
  );
}

const ProductCard = ({ product }: ProductCardProps) => {

  const [openOptions, setOpenOptions] = useState(false);

  const toggleOptions = () => {
    setOpenOptions(!openOptions);
  };

  const { dispatch } = useCart();

  const handleAddToCart = useCallback(() => {

    const newItem: OrderItem = {
      id: product.id,
      name: product.name,
      type: product.type,
      characteristics: {
        type: product.characteristics.type,
        size: [],
        flavor: [],
        filling: [],
        frosting: [],
        topping: [],
      },
    }

    const productItem = document.getElementById(`product_${product.id}`) as HTMLElement;

    const selectedSize = productItem.querySelector('input[name="size_selector"]:checked') as HTMLInputElement;
    if(selectedSize){
      newItem.characteristics.size.push(selectedSize.value);
      selectedSize.checked = false;
    };

    const selectedFlavor = productItem.querySelectorAll('input[name^="flavor_"]') as NodeListOf<HTMLInputElement>;
    if(selectedFlavor){
      selectedFlavor.forEach((flavor:HTMLInputElement) => {
        if(flavor.checked){
          newItem.characteristics.flavor.push(flavor.value);
          flavor.checked = false;
        }
      });
    };

    const selectedFilling = productItem.querySelectorAll('input[name^="filling_"]') as NodeListOf<HTMLInputElement>;
    if(selectedFilling){
      selectedFilling.forEach((filling:HTMLInputElement) => {
        if(filling.checked){
          newItem.characteristics.filling.push(filling.value);
          filling.checked = false;
        }
      });
    };

    const selectedFrosting = productItem.querySelectorAll('input[name^="frosting_"]') as NodeListOf<HTMLInputElement>;
    if(selectedFrosting){
      selectedFrosting.forEach((frosting:HTMLInputElement) => {
        if(frosting.checked){
          newItem.characteristics.frosting.push(frosting.value);
          frosting.checked = false;
        }
      });
    };

    const selectedTopping = productItem.querySelectorAll('input[name^="topping_"]') as NodeListOf<HTMLInputElement>;
    if(selectedTopping){
      selectedTopping.forEach((topping:HTMLInputElement) => {
        if(topping.checked){
          newItem.characteristics.topping.push(topping.value);
          topping.checked = false;
        }
      });
    };

    dispatch({ type: "ADD_ITEM", payload: {item:newItem, quantity:1 } });
    setOpenOptions(false);

  }, [product]);

  return (
    <div id={"product_"+product.id} className="fade-in w-full h-auto flex flex-col items-start justify-start p-2 rounded-lg bg-white bg-opacity-40 shadow-lg">
      <div className="w-full h-auto flex flex-row items-start justify-start gap-x-4">
        <div className="w-full h-auto flex flex-col justify-start items-start">
          <p className="text-sm font-heading text-rose inline-flex w-auto gap-x-2 items-center justify-start">
            {product.type === 'CAKE' ? <Cake/> : <Cookie/>}
            {product.header}</p>
          <p className="text-md font-heading text-cocoa mt-2">{product.name}</p>
          <p className="text-xs text-tertiary">{product.description}</p>
          <p className="text-xs text-cocoa mt-2">Indications</p>
          <p className="text-sm text-tertiary">{product.indications}</p>
        </div>
        <div className="min-w-[30%] h-full bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${product.image_ref})` }}></div>
      </div>
      <div className="w-full h-auto flex flex-row flex-wrap items-start justify-start gap-x-2 mt-2">
        {product.options.isVegan && <p className="w-auto h-auto rounded-full p-1 px-2 text-secondary bg-cocoa  hover:bg-secondary hover:text-primary border-2 border-cocoa hover:border-primary inline-flex justify-start items-center gap-x-1 text-xs"><Leaf className="h-4 w-4" /> Vegan</p>}
        {product.options.isGlutenFree && <p aria-label="gluten free" title="gluten free" className="w-auto h-auto rounded-full p-1 px-2 text-secondary bg-cocoa  hover:bg-secondary hover:text-primary border-2 border-cocoa hover:border-primary inline-flex justify-start items-center gap-x-1 text-xs"><Croissant className="h-4 w-4" /> Gluten Free</p>}
        {product.options.isDairyFree && <p aria-label="dairy free" title="dairy free" className="w-auto h-auto rounded-full p-1 px-2 text-secondary bg-cocoa  hover:bg-secondary hover:text-primary border-2 border-cocoa hover:border-primary inline-flex justify-start items-center gap-x-1 text-xs"><MilkOff className="h-4 w-4" />Dairy Free</p>}
        {product.options.isNutFree && <p aria-label="nut free" title="nut free" className="w-auto h-auto rounded-full p-1 px-2 text-secondary bg-cocoa  hover:bg-secondary hover:text-primary border-2 border-cocoa hover:border-primary inline-flex justify-start items-center gap-x-1 text-xs"><HopOff className="h-4 w-4" /> Nut Free</p>}
        {product.options.isSoyFree && <p aria-label="soy free" title="soy free" className="w-auto h-auto rounded-full p-1 px-2 text-secondary bg-cocoa  hover:bg-secondary hover:text-primary border-2 border-cocoa hover:border-primary inline-flex justify-start items-center gap-x-1 text-xs"><WheatOff className="h-4 w-4" /> Soy Free</p>}
        {product.options.isEggFree && <p aria-label="egg free" title="egg free" className="w-auto h-auto rounded-full p-1 px-2 text-secondary bg-cocoa  hover:bg-secondary hover:text-primary border-2 border-cocoa hover:border-primary inline-flex justify-start items-center gap-x-1 text-xs"><EggOff className="h-4 w-4" /> Egg Free</p>}
        {product.options.isSugarFree && <p aria-label="sugar free" title="sugar free" className="w-auto h-auto rounded-full p-1 px-2 text-secondary bg-cocoa  hover:bg-secondary hover:text-primary border-2 border-cocoa hover:border-primary inline-flex justify-start items-center gap-x-1 text-xs"><CandyOff className="h-4 w-4" />Sugar Free</p>}
        {product.options.isLowFat && <p aria-label="low fat" title="low fat" className="w-auto h-auto rounded-full p-1 px-2 text-secondary bg-cocoa  hover:bg-secondary hover:text-primary border-2 border-cocoa hover:border-primary inline-flex justify-start items-center gap-x-1 text-xs"><Apple className="h-4 w-4" /> Low Fat</p>}
      </div>
      <div className="w-full h-auto flex flex-col items-start justify-start gap-x-2 mt-2">
        <div className="w-full h-auto flex flex-row items-start justify-between gap-x-2 pr-4">
          <button onClick={toggleOptions} className="w-8 h-8 hover:text-cocoa bg-transparent inline-flex justify-start items-center text-xs active:scale-95 duration-300">{openOptions ? <ChevronUp className="h-full w-full" /> : <ChevronDown className="h-full w-full" />}</button>
          <p className="text-md font-heading text-cocoa mt-2 inline-flex gap-x-2 items-center">Order Now</p>
        </div>
        <div className={`w-full flex flex-col items-start justify-start gap-x-2 ${openOptions ? 'max-h-[450px] opacity-100' : 'max-h-0 opacity-0'} transition-all duration-300 px-2 overflow-y-scroll`}>
          <p className="text-xs text-cocoa mt-2">Size</p>

          <div className="inline-flex flex-wrap justify-start items-start gap-x-2 mt-2">
            {product.characteristics.size.map((size, index) => {
              return(
                <CakeSizeOption
                  index={index}
                  dataType="size"
                  productType={product.type}
                  key={"product_"+product.id+"size_"+index}
                  id={"size_"+index} 
                  name={"size_selector"} 
                  value={size} 
                  label={size} />
              )
            })}
          </div>


          <p className="text-xs text-cocoa mt-2">flavor</p>
          <div className="inline-flex flex-wrap justify-start items-start gap-x-2 mt-2">
            {product.characteristics.flavor.map((flavor, index) => {
              return(
                <InputOption  
                  index={index}
                  dataType="flavor"
                  key={"product_"+product.id+"flavor_"+index} 
                  id={"flavor_"+index} 
                  name={"flavor_"+index} 
                  value={flavor} 
                  label={flavor} />
              )
            })}
          </div>

          <p className="text-xs text-cocoa mt-2">filling</p>
          <div className="inline-flex flex-wrap justify-start items-start gap-x-2 mt-2">
            {product.characteristics.filling.map((filling, index) => {
              return(
                <InputOption  
                  index={index}
                  dataType="filling"
                  key={"product_"+product.id+"filling_"+index} 
                  id={"filling_"+index} 
                  name={"filling_"+index} 
                  value={filling} 
                  label={filling} />
              )
            })}
          </div>

          <p className="text-xs text-cocoa mt-2">frosting</p>
          <div className="inline-flex flex-wrap justify-start items-start gap-x-2 mt-2">
            {product.characteristics.frosting.map((frosting, index) => {
              return(
                <InputOption  
                  index={index}
                  dataType="frosting"
                  key={"product_"+product.id+"frosting_"+index} 
                  id={"frosting_"+index} 
                  name={"frosting_"+index} 
                  value={frosting} 
                  label={frosting} />
              )
            })}
          </div>

          <p className="text-xs text-cocoa mt-2">toppings</p>
          <div className="inline-flex flex-wrap justify-start items-start gap-x-2 mt-2">
            {product.characteristics.topping.map((topping, index) => {
              return(
                <InputOption  
                  index={index}
                  dataType="topping"
                  key={"product_"+product.id+"topping_"+index} 
                  id={"topping_"+index} 
                  name={"topping_"+index} 
                  value={topping} 
                  label={topping} />
              )
            })}
          </div>

          <button onClick={()=>handleAddToCart()} className="ml-auto mt-2 w-auto h-auto rounded-full p-1 px-2 hover:text-secondary hover:bg-cocoa bg-secondary text-primary border-2 hover:border-cocoa border-primary inline-flex justify-start items-center gap-x-1 active:scale-95 duration-300 text-sm">Add to Cart <ShoppingCart className="h-6 w-6" /></button>
          <p className="text-[10px] text-cocoa mt-2">*The cake will be made with the selected options, if you want a more custom option contact us directly.</p>
          <p className="text-[10px] text-cocoa mt-1">*Images are reference only.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
