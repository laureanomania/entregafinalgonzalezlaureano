import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail'; 
import { useParams } from 'react-router-dom'; 
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebase/config'; 

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();  

    useEffect(() => {
        (async () => {
            try {
                
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);  

                if (docSnap.exists()) {
                    
                    setProduct({ ...docSnap.data(), id });
                } else {
                    console.log("No existe el producto con ese ID");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        })();
    }, [id]);  

    if (!product) {
        return <div>Cargando el producto...</div>;  
    }

    return <ItemDetail product={product} />;  
};

export default ItemDetailContainer;
