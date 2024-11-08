import React, { useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom"; 
import styles from '../styles/itemdetail.module.css'; 
import ItemCount from "./ItemCount";
import { Cart } from "../context/CartProvider";

const ItemDetail = ({ product }) => {
    const { addCart } = useContext(Cart);
    const [itemCountVisibility, setItemCountVisibility] = useState(true);
    const [quantity, setQuantity] = useState(1); 
    const navigate = useNavigate(); 

    console.log(product);

    const handleCart = (quantity) => {
        if (quantity > product.count) {
            alert("No hay suficiente stock disponible.");
            return;
        }
        setItemCountVisibility(false);
        addCart(product, quantity); 
    };

    const goToCart = () => {
        navigate("/cart"); 
    };

    if (!product) {
        return <div>Cargando...</div>; 
    }

    return (
        <div className={styles.container}>
            <img src={product.pictureUrl} alt={product.title} className={styles.image} />
            <h2 className={styles.title}>{product.title}</h2>
            <span className={styles.price}>${product.price}</span>
            <p className={styles.description}>{product.description || "Descripción no disponible."}</p>
            

            {itemCountVisibility ? (
                <ItemCount 
                    stock={product.count} 
                    setQuantity={setQuantity} 
                    quantity={quantity} 
                    addCart={handleCart} 
                />
            ) : (
                <button className={styles.goToCartButton}> 
                    <NavLink to="/cart" className={styles.navLink}>
                        Finalizar Compra
                    </NavLink>
                </button>
            )}
        </div>
    );
};

export default ItemDetail;
