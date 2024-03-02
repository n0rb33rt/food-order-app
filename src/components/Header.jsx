import reactFoodLogo from '../assets/logo.jpg';
import Button from "./UI/Button.jsx";
import {useContext} from "react";
import {CartContext} from "../store/shopping-cart-context.jsx";
import {UserProgressContext} from "../store/user-context-progress.jsx";

export default function Header() {
    const { items } = useContext(CartContext);
    const {
        showCart,
    } = useContext(UserProgressContext);
    function handleCartClick() {
        showCart();
    }

    const totalCartItems = items.reduce((totalNumberOfItems, item) =>{
        return totalNumberOfItems + item.quantity;
    },0);

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={reactFoodLogo} alt='Hot Burger'/>
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleCartClick}>Cart({totalCartItems})</Button>
            </nav>
        </header>
    );
}