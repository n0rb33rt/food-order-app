import {createContext, useReducer} from "react";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    removeItemFromCart: ()=>{},
    clearCart: () =>{}
});

function cartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.item.id)

        const updatedItems = [...state.items];
        if(existingCartItemIndex>-1){
            const existingItem = state.items[existingCartItemIndex];
            updatedItems[existingCartItemIndex] = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
        }else{
            updatedItems.push({...action.item, quantity: 1});
        }
        return {...state, items: updatedItems};
    }

    if(action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
       const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
       if(existingCartItem.quantity === 1){
            updatedItems.splice(existingCartItemIndex,1);
       }else{
           updatedItems[existingCartItemIndex] = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
       }
       return {...state,items:updatedItems};
    }

    if(action.type === 'CLEAR_ITEMS'){
        return {...state,items:[]};
    }

    return state;
}
export default function CartContextProvider({children}) {
    const [cart,dispatchCartAction ] = useReducer(cartReducer,{items:[]});

    const contextValue = {
        items: cart.items,
        addItemToCart: addItem,
        removeItemFromCart: removeItem,
        clearCart: clearItems
    };

    function addItem(item){
        dispatchCartAction({ type: 'ADD_ITEM',item});
    }

    function removeItem(id){
        dispatchCartAction({ type: 'REMOVE_ITEM',id});
    }

    function clearItems(){
        dispatchCartAction({ type: 'CLEAR_ITEMS'});
    }
    return <CartContext.Provider value={contextValue}>
        {children}
    </CartContext.Provider>
}