import React from "react";
import { useNavigate } from "react-router-dom"; 
import Item from "./Item"; 
import styles from '../styles/itemlist.module.css'; 

const ItemList = ({ products }) => {
    const navigate = useNavigate(); 

    const handleViewMore = (id) => {
        navigate(`/detail/${id}`); 
    };

    return (
        <div className={styles.container}>
            {products.map((product) => {
                return (
                    <div className={styles.containerCard} key={product.id}> 
                        <Item 
                            item={product} 
                            key={product.id} 
                            onViewMore={handleViewMore} 
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ItemList;
