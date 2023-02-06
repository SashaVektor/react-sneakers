import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Empty from "../components/Empty";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            (async () => {
                const { data } = await axios.get('https://62fa668effd7197707ebd025.mockapi.io/orders');
                setOrders(data.map(obj => obj.items).flat());
                setIsLoading(false);
            })();
        }
        catch (err) {
            alert('Ошибка при запросе заказов');
            console.log(err);
        }

    }, []);
    return (
        <div className="content">
            <div className="content__top">
                <h1 className="content__title">Мои заказы</h1>
            </div>
            <div className="content__inner">
                {orders.length > 0 ? (isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card key={index}
                        loading={isLoading}
                        {...item} />
                )) : <Empty title="У вас нет заказов"
                    description="Вы нищеброд?  Оформите хотя бы один заказ."
                    img="/images/sad-smile.png" />}
            </div>
        </div>
    )
}

export default Orders;