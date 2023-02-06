import React from "react";
import Card from "../components/Card"
import AppContext from "../context";
import Empty from "../components/Empty";

const Favourites = () => {
  const { favourites, onAddToFavourite } = React.useContext(AppContext);

  return (
    <div className="content">
      <div className="content__top">
        <h1 className="content__title">Мои закладки</h1>
      </div>
      <div className="content__inner">
        {favourites.length > 0 ?
          favourites.map(item => (
            <Card
              key={item.id}
              favourited={true}
              onFavourite={onAddToFavourite}
              {...item}
            />
          )) :
          <Empty title="Закладок нет :("
            description="Вы ничего не добавляли в закладки"
            img="/images/cry-smile.png" />}
      </div>
    </div>
  )
}

export default Favourites;