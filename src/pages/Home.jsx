import React from "react";
import Card from "../components/Card";

const Home = ({ items, onChangeSearchInput, searchValue,
  setSearchValue, onAddToFavourite, onAddToBasket, isLoading
}) => {
  const renderItems = () => { 
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
    return (isLoading ? [...Array(8)] : filteredItems)
    .map((item, index) => (
        <Card
          key={index}
          onFavourite={(obj) => onAddToFavourite(obj)}
          onPlus={(obj) => onAddToBasket(obj)}
          loading={isLoading}
          {...item}
        />
      ))
    
  }
  return (
    <div className="content">
      <div className="content__top">
        <h1 className="content__title">{
          searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'
        }</h1>
        <div className="content__search">
          <img src="/images/search.svg" alt="img" />
          {searchValue &&
            <img
              className="content__btn-remove"
              src="/images/btn-remove.svg"
              alt="btn-remove"
              onClick={() => setSearchValue('')} />}
          <input placeholder="Поиск..." onChange={onChangeSearchInput} value={searchValue} />
        </div>
      </div>
      <div className="content__inner">
        {renderItems()}
      </div>
    </div>
  )
}

export default Home;