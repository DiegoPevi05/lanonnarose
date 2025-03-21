import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

interface CartState {
  items: { id: string, item: OrderItem; quantity: number }[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: {item:OrderItem, quantity:number} }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, { id: uuidv4(), item: action.payload.item, quantity: action.payload.quantity }] };
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };

    default:
      return state;
  }
};

// Function to get initial state from localStorage
const getInitialCartState = (): CartState => {
  try {
    const savedCart = localStorage.getItem('cartState');
    if (savedCart) {
      return JSON.parse(savedCart) as CartState;
    }
  } catch (error) {
    console.error("Failed to parse cart state from localStorage:", error);
  }
  // Return default state if nothing is in localStorage or parsing fails
  return { items: [] };
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialCartState);
  // Effect to save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cartState', JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save cart state to localStorage:", error);
    }
  }, [state]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
