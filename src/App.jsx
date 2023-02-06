import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route } from 'react-router-dom'
import Header from "./components/Header";
import Home from "./pages/Home";
import Basket from "./components/Basket";
import Favourites from "./pages/Favourites";
import AppContext from './context'
import Orders from "./pages/Orders";


function App() {
  const [basketOpened, setBasketOpened] = useState(false);
  const [basketItems, setBasketItems] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const [basketResponse, favouriteResponse, itemsResponse] = await Promise.all([
          axios.get('https://62fa668effd7197707ebd025.mockapi.io/basket'),
          axios.get('https://62fa668effd7197707ebd025.mockapi.io/favourites'),
          axios.get('https://62fa668effd7197707ebd025.mockapi.io/items')])
        setIsLoading(false);

        setBasketItems(basketResponse.data);
        setFavourites(favouriteResponse.data);
        setItems(itemsResponse.data);
      }
      catch (err) {
        alert('Ошибка при запросе данных :(')
      }
    }

    fetchData();
  }, [])

  const onAddToBasket = async (obj) => {
    try {
      const findItem = basketItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setBasketItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62fa668effd7197707ebd025.mockapi.io/basket/${findItem.id}`);
      } else {
        setBasketItems(prev => [...prev, obj]);
        const { data } = await axios.post('https://62fa668effd7197707ebd025.mockapi.io/basket', obj)
        setBasketItems(prev => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id,
            }
          }
          else {
            return item;
          }
        }));
      }
    } catch (err) {
      alert('Ошибка при добавлении в корзину')
    }
  }

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://62fa668effd7197707ebd025.mockapi.io/favourites/${obj.id}`);
        setFavourites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://62fa668effd7197707ebd025.mockapi.io/favourites', obj)
        setFavourites(prev => [...prev, data]);
      }
    } catch (err) {
      alert('Не удалось добавить в фавориты')
    }
  }

  const onRemoveItem = async (id) => {

    try {
      axios.delete(`https://62fa668effd7197707ebd025.mockapi.io/basket/${id}`);
      setBasketItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    }
    catch (err) {
      alert('Ошибка при удалении из корзины');
    }

  }

  const onChangeSearchInput = event => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return basketItems.some(obj => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={{ items, basketItems, favourites, isItemAdded, onAddToFavourite, setBasketOpened, setBasketItems, onAddToBasket }}>
      <div className="wrapper">
        <Basket items={basketItems} onClose={() => setBasketOpened(false)} onRemove={onRemoveItem} opened={basketOpened} />
        <Header onClickBasket={() => setBasketOpened(true)} />
        <Route exact path="/">
          <Home
            items={items}
            basketItems={basketItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavourite={onAddToFavourite}
            onAddToBasket={onAddToBasket}
            isLoading={isLoading}
          />
        </Route>
        <Route exact path="/favourites">
          <Favourites />
        </Route>
        <Route exact path="/orders">
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>

  );
}

export default App;




