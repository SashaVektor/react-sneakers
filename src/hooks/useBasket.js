import React from "react";
import AppContext from "../context";

export const useBasket = () => {
    const { basketItems, setBasketItems } = React.useContext(AppContext);
    const totalPrice = basketItems.reduce((sum, obj) => Number(obj.price) + sum, 0);

    return { basketItems, setBasketItems, totalPrice };
}

