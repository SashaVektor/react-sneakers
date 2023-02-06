import React from "react";
import { Link } from "react-router-dom";
import { useBasket } from "../hooks/useBasket";

const Header = ({ onClickBasket }) => {
    const { totalPrice } = useBasket()

    return (
        <header className="header">
            <Link to="/">
                <div className="header__left">
                    <img src="/images/logo.png" width={40} height={40} alt="img" />
                    <div>
                        <h3>REACT SNEAKERS</h3>
                        <p className="header__left-text">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="header__right">
                <li onClick={onClickBasket}>
                    <img src="/images/basket.svg" width={18} height={18} alt="basket" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to="/favourites">
                        <img src="/images/heart.svg" width={20} height={20} alt="heart" />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img src="/images/user.svg" width={20} height={20} alt="user" />
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;