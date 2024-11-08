import { createContext, useState } from "react";


export const Cart = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);  
    const [quantity, setQuantity] = useState(0);  

    
    const addCart = (product, productQuantity) => {
       
        const productInCart = isInCart(product.id);
        let cartUpdated = [...cart];  

        if (productInCart) {
            
            cartUpdated = cartUpdated.map(cartProduct => {
                if (cartProduct.id === product.id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + productQuantity
                    };
                }
                return cartProduct;
            });
        } else {
            
            cartUpdated.push({ ...product, quantity: productQuantity });
        }

        
        setCart(cartUpdated);
        setQuantity(cartUpdated.reduce((acc, item) => acc + item.quantity, 0));  
    };

    
    const isInCart = (id) => {
        return cart.some(cartProduct => cartProduct.id === id);
    };

   
    const removeFromCart = (id) => {
        const updatedCart = cart.filter(cartProduct => cartProduct.id !== id);
        setCart(updatedCart);
        setQuantity(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    };

    return (
        <Cart.Provider value={{ cart, addCart, removeFromCart, quantity }}>
            {children}
        </Cart.Provider>
    );
};

export default CartProvider;
