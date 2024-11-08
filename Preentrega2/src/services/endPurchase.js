const endPurchase = async (cart) => {
    const productsToUpdateRefs = [];

    // Crear una lista de productos a actualizar
    for (const cartProduct of cart) {
        const productRef = doc(db, "products", cartProduct.id);
        productsToUpdateRefs.push({ ref: productRef, id: cartProduct.id });
    }

    const orderCollectionRef = collection(db, "orders");

    try {
        const order = await runTransaction(db, async (transaction) => {

            const stocksUpdated = [];

            // Verificar stock y realizar las actualizaciones
            for (const productToUpdate of productsToUpdateRefs) {
                const { ref } = productToUpdate;
                const product = await transaction.get(ref);
                
                if (!product.exists()) {
                    throw new Error("Producto no encontrado en la base de datos");
                }

                const stock = parseInt(product.data().stock, 10); // Asegurarte de que sea un número
                const productInCart = cart.find((cartElement) => cartElement.id === product.id);
                const quantityInCart = parseInt(productInCart.quantity, 10); // Asegúrate de que sea un número

                // Verificar que tanto el stock como la cantidad sean válidos
                if (isNaN(stock) || isNaN(quantityInCart)) {
                    throw new Error("El stock o la cantidad no son números válidos");
                }

                const resultStock = stock - quantityInCart;

                if (resultStock < 0) {
                    throw new Error(`Producto: ${product.data().title}, no tiene suficiente stock. Stock disponible: ${stock}, cantidad añadida al carrito: ${quantityInCart}.`);
                }

                stocksUpdated.push({
                    productId: product.id,
                    stock: resultStock,
                });
            }

            // Actualizar los productos con el nuevo stock
            for (const product of productsToUpdateRefs) {
                const { ref, id } = product;
                const stockUpdated = stocksUpdated.find((stock) => stock.productId === id);

                transaction.update(ref, {
                    stock: stockUpdated.stock,
                });
            }

            // Crear la orden en la colección de Firebase
            const order = {
                products: cart,
                user: {
                    name: "Jhon Doe", // Ejemplo de datos del comprador
                    email: "jhon.doe@email.com",
                },
                timestamp: serverTimestamp(),
                total: cart.reduce((total, item) => total + item.price * item.quantity, 0), // Sumar el total de la compra
            };

            await addDoc(orderCollectionRef, order);

            return order;
        });

        console.log("Orden creada exitosamente!", order);
    } catch (e) {
        console.error(e);
    }
};

export default endPurchase;
