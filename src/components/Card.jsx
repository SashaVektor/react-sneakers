import React, { useState } from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../context";

const Card = ({ title, price, imgUrl, id,
  onFavourite, onPlus, favourited = false,
   loading = false, 
}) => {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(favourited);
  const itemObj = { title, price, imgUrl, id, parentId: id };

  const handleClickPlus = () => {
    onPlus(itemObj);
  }

  const handleClickFavourite = () => {
    onFavourite(itemObj);
    setIsFavourite(!isFavourite);
  }


  return (
    <div className="card">
      {loading ? <ContentLoader
        speed={2}
        width={150}
        height={190}
        viewBox="0 0 150 190"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="180" y="156" rx="0" ry="0" width="1" height="1" />
        <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
        <rect x="0" y="100" rx="2" ry="2" width="150" height="15" />
        <rect x="0" y="120" rx="2" ry="2" width="100" height="15" />
        <rect x="0" y="165" rx="10" ry="10" width="80" height="24" />
        <rect x="118" y="158" rx="10" ry="10" width="32" height="32" />
      </ContentLoader> : <>
        {onFavourite && <div className="card__favourite" onClick={handleClickFavourite} >
          <img src={!isFavourite ? "/images/heart-def.svg" : "/images/heart-check.svg"} alt="heart-unliked" />
        </div>}
        <img src={imgUrl} alt="img" width="100%" height={120} />
        <h5>{title}</h5>
        <div className="card__bottom">
          <div className="card__bottom-info">
            <p className="card__price-name">Цена:</p>
            <p className="card__price">{price} руб.</p>
          </div>
          {onPlus && <img className="card__btn-plus" src={!isItemAdded(id) ? "/images/plus.svg" : "/images/btn-checked.svg"} alt="img" onClick={handleClickPlus} />}
        </div>
      </>}
    </div>
  )
}

export default Card;
