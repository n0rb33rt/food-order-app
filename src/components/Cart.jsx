import Button from "./UI/Button.jsx";
import {useContext} from "react";
import {currencyFormatter} from "../util/formatting.js";
import Modal from './Modal.jsx';
import {CartContext} from "../store/shopping-cart-context.jsx";
import {UserProgressContext} from "../store/user-context-progress.jsx";
import CartItem from "./CartItem.jsx";
import {findTotalPrice} from "../util/calculator.js";

export default function Cart() {
    const {items,addItemToCart,removeItemFromCart} = useContext(CartContext);
    const {progress,showCheckout,hideCart} = useContext(UserProgressContext);
    const totalPrice = findTotalPrice(items);

    function handleIncrease(item){
        addItemToCart(item);
    }
    function handleDecrease(id){
        removeItemFromCart(id);
    }
    return (
        <Modal className='cart' open={progress === 'cart'} onClose={progress === 'cart'?hideCart:null} >
            <h2>Your cart</h2>
            <ul>
                {items.map((item) => <CartItem onDecrease={()=>handleDecrease(item.id)} onIncrease={()=>handleIncrease(item)} key={item.id} name={item.name} price={item.price} quantity={item.quantity}/>)}
            </ul>
            <p className='cart-total'>{currencyFormatter.format(totalPrice)}</p>
            <div className='modal-actions'>
                <Button textOnly={true} onClick={hideCart}>Close</Button>
                {items.length !== 0 && <Button onClick={showCheckout}>Go to Checkout</Button>}
            </div>
        </Modal>
    );
}