import {CartContext} from "../store/shopping-cart-context.jsx";
import {useContext} from "react";
import {currencyFormatter} from "../util/formatting.js";
import Button from "./UI/Button.jsx";

export default function MealCard({meal}) {
    const { addItemToCart} = useContext(CartContext);
    return (
        <div className='meal-item'>
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt='Meal Image'/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className='meal-item-price'>{currencyFormatter.format(meal.price)}</p>
                    <p className='meal-item-description'>{meal.description}</p>
                </div>
                <div className='meal-item-actions'>
                    <Button onClick={() => addItemToCart(meal)}>Add to Cart</Button>
                </div>
            </article>
        </div>
    );
}