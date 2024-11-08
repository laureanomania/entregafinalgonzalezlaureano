import React from 'react';
import styles from '../styles/itemlist.module.css'; 

const Item = ({ item, onViewMore }) => {
    return (
        <div className={styles.containerCard}> 
            <img 
                src={item.pictureUrl} 
                alt={item.title} 
                className={styles.containerImage} 
            />
            <div className={styles.containerDetails}>
                <h3 className={styles.containerTitle}>{item.title}</h3>
                <p className={styles.containerPrice}>${item.price}</p>
            </div>
            <button 
                className={styles.viewMoreButton} 
                onClick={() => onViewMore(item.id)}
            >
                Ver más
            </button>
        </div>
    );
};

export default Item;
