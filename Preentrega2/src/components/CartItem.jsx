import React from "react";
import styles from "../styles/cartitem.module.css";

const CartItem = ({ item, onDelete }) => {
   
    const totalPrice = item.price * item.quantity;

    return (
        <div className={styles.cartItem}>
            
            <img src={item.pictureUrl} alt={item.title} />

            
            <h1>{item.title}</h1>

            
            <p>Precio unitario: ${item.price}</p>
            <p>Cantidad: {item.quantity}</p>
            <p><strong>Total: ${totalPrice}</strong></p> 

           
            <button onClick={() => onDelete(item.id)}>Eliminar</button>
        </div>
    );
};

export default CartItem;
