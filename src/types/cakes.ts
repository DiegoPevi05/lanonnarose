export {};
declare global{

  type ItemType = 'CAKE' | 'DESSERT';
  type SelectorRefLabel = 'shadow_cake_1' | 'shadow_cake_2' | 'shadow_cake_3' | 'shadow_cake_4' | 'shadow_cake_5' | 'shadow_cake_6' | 'shadow_cake_7' | 'shadow_cake_8';
  type OcassionType = 'BIRTHDAY' | 'WEDDING' | 'BABY_SHOWER' | 'GRADUATION' | 'OTHER';

  export interface Order {
    items:{
      id: string;
      item: OrderItem;
      quantity: number;
    }[]
  }

  export interface OrderItem {
    id:string;
    name: string;
    type:ItemType;
    characteristics: {
      type: OcassionType;
      size: string[];
      flavor: string[];
      filling: string[];
      frosting: string[];
      topping: string[];
    };
  }

  type optionsType = {
    isVegan: boolean;
    isGlutenFree: boolean;
    isDairyFree: boolean;
    isNutFree: boolean;
    isSoyFree: boolean;
    isEggFree: boolean;
    isSugarFree: boolean;
    isLowFat: boolean;
  }

  export interface Cake {
    id: string;
    name: string;
    selector_ref: SelectorRefLabel;
    type:ItemType;
    characteristics: {
      type: OcassionType;
      size: string[];
      flavor: string[];
      filling: string[];
      frosting: string[];
      topping: string[];
    };
    header: string;
    description: string;
    indications:string;
    options: optionsType;
    image_ref: string;
  }

  export interface Dessert {
    id: string;
    name: string;
    selector_ref: SelectorRefLabel;
    type:ItemType;
    characteristics:{
      type: OcassionType;
      size: string[];
      flavor: string[];
      filling: string[];
      frosting: string[];
      topping: string[];
    }
    header: string;
    description: string;
    indications:string;
    options: optionsType;
    image_ref: string;
  }

}

