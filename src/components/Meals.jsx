import useHttp from "../hooks/useHttp.js";
import MealCard from "./MealCard.jsx";
import Error from "./Error.jsx";
const requestConfig = {};

export default function Meals (){
    const {fetchedData,error,isLoading} = useHttp('http://localhost:3000/meals',requestConfig,[]);

    if(error){
        return <Error title='Failed to fetch available meals data' message={error.message}/>
    }

    if(isLoading){
        return <p className="center">The available meals are fetching...</p>;
    }

    return <ul id='meals'>
        {!error && !isLoading &&  fetchedData.map(meal => <li key={meal.id}><MealCard meal={meal}/></li>)}
    </ul>
}