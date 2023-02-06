import React from "react";
import { Link } from "react-router-dom";

const Empty = ({ img, title, description }) => {
    return (
        <div className="favourites__empty">
            <img className="favourites__empty-img" src={img} alt="cry" width={70} height={70} />
            <h5 className="favourites__empty-title">
                {title}
            </h5>
            <p className="favourites__empty-text">
                {description}
            </p>
            <Link to="/"><button className="basket__empty-btn" >
                <img className="basket__empty-btn-arrow" src="/images/arrow-left.svg" alt="" />
                Вернуться назад</button></Link>
        </div>
    )
}
export default Empty;