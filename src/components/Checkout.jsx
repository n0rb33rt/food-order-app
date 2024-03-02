import Modal from "./Modal.jsx";
import {useContext} from "react";
import {UserProgressContext} from "../store/user-context-progress.jsx";
import Button from "./UI/Button.jsx";
import {CartContext} from "../store/shopping-cart-context.jsx";
import {currencyFormatter} from "../util/formatting.js";
import Input from "./Input.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";
import {findTotalPrice} from "../util/calculator.js";
const requestConfig = {method:'POST',headers:{'Content-Type':'application/json'}};
export default function Checkout() {
    const {fetchedData,error,isLoading:isSending,fetchData: makeOrder,clearData} = useHttp('http://localhost:3000/orders', requestConfig, null);
    const {progress, hideCheckout,hideCart} = useContext(UserProgressContext);
    const {items,clearCart} = useContext(CartContext);
    const totalPrice = findTotalPrice(items);

    function handleClose(){
        clearCart();
        hideCart();
        clearData();
    }

    async function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries())
        await makeOrder(JSON.stringify(
            {
                order:
                    {
                        items:items,
                        customer:customerData,
                    }
            }));

    }
    if(error){
        return <Error title='Failed to submit order' message={error.message}/>
    }

    if(fetchedData && !error){
        return <Modal open={progress === 'checkout'} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully</p>
            <p>We will get back to you with more details via email within next few minutes</p>
            <p className='modal-actions'>
                <Button onClick={handleClose}>Okay</Button>
            </p>
        </Modal>
    }
    return (
        <Modal open={progress === 'checkout'} onClose={progress === 'checkout'?hideCheckout:null}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(totalPrice)}</p>
                <Input id='name' type='text' label='Full Name'/>
                <Input id='email' type='email' label='Email Address'/>
                <Input id='street' type='text' label='Street'/>
                <div className='control-row'>
                    <Input id='postal-code' type='text' label='Postal code'/>
                    <Input id='city' type='text' label='City'/>
                </div>
                <div className='modal-actions'>
                    {!isSending && <>
                        <Button type='button' textOnly={true} onClick={hideCheckout}>Close</Button>
                        <Button type='submit'>Submit Order</Button>
                        </>
                    }
                </div>
                {isSending && <p className='center'>The order is handling...</p>}
            </form>
        </Modal>
    );
}