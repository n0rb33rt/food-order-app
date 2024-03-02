import {createContext, useState} from "react";

export const UserProgressContext = createContext({
    progress: '',
    showCart: ()=>{},
    hideCart: ()=>{},
    showCheckout: ()=>{},
    hideCheckout: ()=>{},
});

export default function UserContextProgressProvider({children}) {
    const [progress,setProgress] = useState('');
    function showCart (){
        setProgress('cart');
    }
    function hideCart (){
        setProgress('');
    }
    function showCheckout (){
        setProgress('checkout');
    }
    function hideCheckout (){
        showCart();
    }
    const contextValue = {
        progress: progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    }

    return <UserProgressContext.Provider value={contextValue}>
        {children}
    </UserProgressContext.Provider>
}