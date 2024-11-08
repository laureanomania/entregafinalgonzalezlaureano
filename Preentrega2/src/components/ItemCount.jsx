import React, { useState } from "react";
import Swal from 'sweetalert2';  
import styles from "../styles/itemcount.module.css";

const ItemCount = ({ addCart }) => {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decreaseCount = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
        }
    };

    const handleAddToCart = () => {
        if (count === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes seleccionar al menos un producto.",  
                
            });
        } else {
            addCart(count); 
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.operators}>
                <button onClick={decreaseCount} disabled={count === 0}>-</button>
                <span>{count}</span>
                <button onClick={increaseCount}>+</button>
            </div>
            <button className={styles.addcart} onClick={handleAddToCart}>Add to cart</button>
        </div>
    );
};

export default ItemCount;
