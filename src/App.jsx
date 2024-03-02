import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import CartContextProvider from "./store/shopping-cart-context.jsx";
import UserContextProgressProvider from "./store/user-context-progress.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
    return (
        <UserContextProgressProvider>
            <CartContextProvider>
                <Header/>
                <Meals/>
                <Cart/>
                <Checkout/>
            </CartContextProvider>
        </UserContextProgressProvider>
    );
}

export default App;
