import React, { useContext } from "react";
import { Cart as CartContext } from "../context/CartProvider";  
import CartItem from "./CartItem";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";  
import Swal from "sweetalert2";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const endPurchase = async (cart, user, total) => {
  const orderCollectionRef = collection(db, "orders");

  const order = {
    products: cart,
    user: user,
    total: total,
    timestamp: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(orderCollectionRef, order);
    console.log("Orden creada con ID:", docRef.id);
  } catch (error) {
    console.error("Error al crear la orden:", error);
  }
};

const Cart = () => {
  const { cart, removeFromCart, quantity } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleFinalizePurchase = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Finalizar Compra",
      html: `
        <div>
          <p><strong>Total de productos:</strong> ${totalQuantity}</p>
          <p><strong>Total a pagar:</strong> $${totalAmount}</p>
          <label for="name">Nombre:</label>
          <input type="text" id="name" class="swal2-input" placeholder="Nombre completo">
          <label for="email">Correo:</label>
          <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico">
          <label for="phone">Teléfono:</label>
          <input type="text" id="phone" class="swal2-input" placeholder="Número de teléfono">
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Confirmar compra",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        if (!name || !email || !phone) {
          Swal.showValidationMessage("Por favor, completa todos los campos.");
        }

        return { name, email, phone };
      },
    });

    if (formValues) {
      const user = {
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
      };

      await endPurchase(cart, user, totalAmount);

      Swal.fire({
        title: "Compra exitosa",
        text: `Gracias por tu compra, ${user.name}!`,
        icon: "success",
        confirmButtonText: "Volver a la tienda",
      }).then(() => {
        navigate("/"); 
      });
    }
  };

  return (
    <div style={styles.cart}>
      {cart.length === 0 ? (
        <div style={styles.emptyCart}>
          <h1 style={styles.emptyCartText}>No hay productos en el carrito</h1>
          <NavLink to="/" style={styles.goBackButton}>Volver a la tienda</NavLink>
        </div>
      ) : (
        <>
          <h1 style={styles.cartTitle}>Carrito de Compras</h1>
          {cart.map((cartItem) => (
            <CartItem item={cartItem} key={cartItem.id} onDelete={removeFromCart} />
          ))}
          <div style={styles.cartTotals}>
            <p>Total de productos: {totalQuantity}</p>
            <p>Total a pagar: ${totalAmount}</p>
          </div>
          <button style={styles.finalizeButton} onClick={handleFinalizePurchase}>
            Finalizar compra
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  cart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    fontFamily: "Arial, sans-serif",
  },
  emptyCart: {
    textAlign: "center",
    marginTop: "50px",
  },
  emptyCartText: {
    fontSize: "2em",
    color: "#333",
  },
  goBackButton: {
    display: "inline-block", 
    backgroundColor: "#000", 
    color: "white", 
    fontSize: "1.2em", 
    padding: "12px 25px", 
    textDecoration: "none", 
    borderRadius: "5px", 
    marginTop: "20px", 
    transition: "background-color 0.3s ease", 
    textAlign: "center", 
  },
  cartTitle: {
    fontSize: "2.5em",
    color: "#333",
    marginBottom: "30px",
    fontWeight: "bold",
  },
  cartTotals: {
    fontSize: "1.3em",
    color: "#333",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  finalizeButton: {
    backgroundColor: "#000000",
    color: "white",
    padding: "12px 25px",
    fontSize: "1.2em",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "200px",
    transition: "background-color 0.3s ease",
    textAlign: "center",
    marginTop: "20px",
  },
};

export default Cart;
