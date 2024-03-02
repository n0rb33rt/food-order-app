export function findTotalPrice(items){
    return items.reduce((total, item) => {
        return total + item.quantity * item.price;
    }, 0);
}