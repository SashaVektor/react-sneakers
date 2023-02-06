import React, { useState } from "react";
import Info from "./Info";
import axios from "axios";
import { useBasket } from "../hooks/useBasket";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Basket = ({ onClose, onRemove, items = [], opened }) => {
  const {basketItems, setBasketItems, totalPrice} = useBasket();
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplited, setIsOrderComplited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const onClickOrderBtn = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`https://62fa668effd7197707ebd025.mockapi.io/orders`, {
        items: basketItems,
      });
      setOrderId(data.id);
      setIsOrderComplited(true);
      setBasketItems([]);
       for (let i = 0; i < basketItems.length; i++) {
        const item = basketItems[i];
        await axios.delete(`https://62fa668effd7197707ebd025.mockapi.io/basket/` + item.id);
        await delay(1000);
      } 
    }
    catch (err) {
      alert('Ошибка при создании заказа');
    }
    setIsLoading(false);
  }
  return (
    <div className={`basket__wrapper ${opened ? 'basket__wrapper-visible': ''}`}>
      <div className="basket">
        <h2 className="basket__title">Корзина</h2>
        <img className="basket__btn-out" src="/images/btn-remove.svg" alt="btn-remove" onClick={onClose} />
        {
          items.length > 0 ? <>
            <div className="basket__inner">
              {items.map((obj) => (
                <div className="basket__item" key={obj.id}>
                  <img className="basket__item-img" src={obj.imgUrl} width={70} height={70} alt="" />
                  <div className="basket__item-info">
                    <p className="basket__item-text">{obj.title}</p>
                    <p className="basket__item-price">{obj.price} руб</p>
                  </div>
                  <img className="basket__btn" src="/images/btn-remove.svg" alt="btn-remove" onClick={() => onRemove(obj.id)} />
                </div>
              ))}
            </div>
            <div className="basket__results">
              <ul className="basket__results-list">
                <li className="basket__results-item">
                  <span className="basket__results-text">Итого: </span>
                  <div className="basket__results-line"></div>
                  <p className="basket__results-price">{totalPrice} руб</p></li>
                <li className="basket__results-item">
                  <span className="basket__results-text">Налог 5%: </span>
                  <div className="basket__results-line"></div>
                  <p className="basket__results-price">{Math.round(totalPrice * 0.05)} руб</p></li>
              </ul>
              <button disabled={isLoading} className="basket__results-btn" onClick={onClickOrderBtn}>Оформить заказ
                <img className="basket__results-btn-arrow" src="/images/arrow-right.svg" alt="arrow" />
              </button>
            </div>
          </> : <Info title={isOrderComplited ? "Заказ оформлен!" : "Корзина пустая"}
            description={isOrderComplited ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
            img={isOrderComplited ? "/images/order-done.jpg" : "/images/basket-empty.jpg"}
          />
        }
      </div>
    </div>
  )
}

export default Basket;