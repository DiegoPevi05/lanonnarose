import {useCallback, useEffect, useState} from "react";
import Cart from "../assets/images/cart.svg";
import {X} from "lucide-react";
import {useCart} from "../contexts/CartContext";
import Cake from "../assets/images/cake_4.svg";
import Dessert from "../assets/images/cake_5.svg";

interface OrderItemCartProps {
  id: string;
  item: OrderItem;
  quantity: number;
}

const formatStringArray = (arr: string[]) => {
  return arr.join(", ");
}

// Function to generate the WhatsApp link
function generateWhatsAppLink(items:{ id: string; item: OrderItem; quantity: number }[]) {


    let phoneNumber = "+51936120461"; // Replace with your phone number
    // Map each item to a formatted string
    const itemLines = items.map(((orderItem:any) => {
        const characteristics = orderItem.item.characteristics; // Corrected spelling
        const details = [];

        // Include only non-empty characteristics
        if (characteristics.size.length > 0) {
            details.push(`size: ${formatStringArray(characteristics.size)}`);
        }
        if (characteristics.flavor.length > 0) {
            details.push(`flavor: ${formatStringArray(characteristics.flavor)}`);
        }
        if (characteristics.filling.length > 0) {
            details.push(`filling: ${formatStringArray(characteristics.filling)}`);
        }
        if (characteristics.frosting.length > 0) {
            details.push(`frosting: ${formatStringArray(characteristics.frosting)}`);
        }
        if (characteristics.topping.length > 0) {
            details.push(`topping: ${formatStringArray(characteristics.topping)}`);
        }

        // Construct the item line with quantity and name
        return `- ${orderItem.quantity}x ${orderItem.item.name}${details.length > 0 ? ", " + details.join(", ") : ""}.`;
    }));

    // Build the full message
    const message = "Order:\n" + itemLines.join("\n");

    // URL-encode the message
    const encodedMessage = encodeURIComponent(message);

    // Return the WhatsApp link
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

const OrderItemCart = ({ id, item, quantity }: OrderItemCartProps) => {

  const { dispatch } = useCart();

  const handleRemoveItemCart = useCallback(() => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, [dispatch,id]);


  return (
    <div className="w-full h-auto rounded-xl bg-secondary p-4 border-2 border-gray-200 shadow-lg relative">
      <button onClick={handleRemoveItemCart} className='absolute top-3 right-3 bg-cocoa text-secondary hover:bg-secondary hover:text-primary hover:border-primary border-2 border-cocoa rounded-full p-1 h-auto w-auto hover:scale-110 active:scale-95 duration-300'>
        <X className='h-4 w-4'/>
      </button>
      <div className="w-full h-full flex flex-row justify-start items-center gap-2">
        <div className="w-[25%] h-full flex justify-center items-center px-1">
          <img src={item.type == "CAKE" ? Cake : Dessert} alt={item.name} className="w-full h-auto"/>
        </div>
        <div className="w-full h-full flex flex-col justify-start items-start">
          <p className="text-cocoa font-heading text-xs">{item.name}</p>
          <p className="text-primary text-xs mb-2"><label className="text-cocoa font-bold">Quantity</label>: X {quantity}</p>
          <div className="flex flex-row flex-wrap gap-x-4">
            <p className="text-primary text-[10px]"><label className="text-cocoa font-bold">size</label>: {formatStringArray(item.characteristics.size)}</p>
            <p className="text-primary text-[10px]"><label className="text-cocoa font-bold">flavor</label>: {formatStringArray(item.characteristics.flavor)}</p>
            <p className="text-primary text-[10px]"><label className="text-cocoa font-bold">filling</label>: {formatStringArray(item.characteristics.filling)}</p>
            <p className="text-primary text-[10px]"><label className="text-cocoa font-bold">frosting</label>: {formatStringArray(item.characteristics.frosting)}</p>
            <p className="text-primary text-[10px]"><label className="text-cocoa font-bold">toppings</label>: {formatStringArray(item.characteristics.topping)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShoppingCart = () => {

  const [isOpen, setIsOpen] = useState(false);
  const onToggleShopCart = () => {
    setIsOpen((prev) => !prev); // Toggle the open state
  };

  const {state} = useCart();

  const [link, setLink] = useState<string>(generateWhatsAppLink(state.items));

  useEffect(()=>{
    setLink(generateWhatsAppLink(state.items));
  },[state])

  return(
    <div className="pointer-events-none fixed top-0 bottom-0 left-0 right-0 z-[140] w-full h-auto max-h-screen bg-transparent">
        <button 
          id="btn_open_shopcart" 
          onClick={onToggleShopCart}
          className="absolute top-6 sm:top-12 left-6 sm:left-12 w-auto h-auto pointer-events-auto">
          <img src={Cart} alt="cake_open_navbar" className="menu-btn h-14 sm:w-24 sm:h-24 w-auto"/> 
          {state.items.length > 0 && (
            <span className="absolute -top-2 -right-4 h-6 w-6 sm:h-8 sm:w-8 inline-flex justify-center items-center text-md sm:text-lg bg-cocoa rounded-full text-secondary">{state.items.length}</span>
          )}
        </button>
      <div className={`absolute ${ isOpen ? "left-0":"-left-[100%]"} top-0 transition-all duration-[0.8s] ease-in-out h-full w-full sm:w-[400px] bg-secondary overflow-hidden pointer-events-auto flex flex-col justify-start items-start p-6 pt-12`}>
            <button className='absolute top-3 right-3 bg-cocoa text-secondary rounded-full p-2 h-auto w-auto hover:scale-110 active:scale-95 duration-300' onClick={()=>onToggleShopCart()}>
              <X className='h-8 w-8'/>
            </button>

            <h2 className='text-primary font-heading text-6xl text-shadow-primary'>{"Order"}</h2>
            <div className="flex flex-col gap-y-4 overflow-y-scroll mt-4">
              {state.items.map((orderItem) => {
                return(
                  <OrderItemCart
                    key={orderItem.id} // Add a key prop for React's reconciliation
                    id={orderItem.id}
                    item={orderItem.item}
                    quantity={orderItem.quantity}
                  />
                )
              })}
            </div>
            <a href={link} target="_blank" className="w-full h-auto flex flex-row justify-center items-center gap-4 mt-4
              bg-rose border-2 border-rose text-secondary
              hover:border-cocoa hover:bg-cocoa
              active:scale-95 
              duration-300 transition-all
              rounded-xl py-2 mt-auto">
              <p>Order Now</p>
            </a>
        </div>
    </div>
  )
}

export default ShoppingCart;
