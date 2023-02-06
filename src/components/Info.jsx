import React from 'react';
import AppContext from '../context';

const Info = ({ img, title, description}) => {
    const {setBasketOpened} = React.useContext(AppContext);
    return (
        <div className="basket__empty">
            <img src={img} alt="empty" width={120} height={120} />
            <h2 className="basket__empty-title">{title}</h2>
            <p className="basket__empty-text">{description}</p>
            <button className="basket__empty-btn" onClick={() => setBasketOpened()}>
                <img className="basket__empty-btn-arrow" src="/images/arrow-left.svg" alt="" />
                Вернуться назад</button>
        </div>
    )
}

export default Info
