import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config'; 
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import ItemList from './ItemList';
import { useParams, useNavigate } from 'react-router-dom';

const ItemListContainer = () => {
  const [loadedProducts, setLoadedProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let productsFiltered = [];

        const timer = setTimeout(async () => {
          if (categoryId) {
            
            const q = query(
              collection(db, "products"),
              where("category", "==", categoryId)
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              productsFiltered.push({ id: doc.id, ...doc.data() });
            });
          } else {
            
            const querySnapshot = await getDocs(collection(db, "products"));
            querySnapshot.forEach((doc) => {
              productsFiltered.push({ id: doc.id, ...doc.data() });
            });
          }

          setLoadedProducts(productsFiltered); 
          setLoading(false);
        }, 300); // 

        return () => clearTimeout(timer); 
      } catch (error) {
        console.log('Error al cargar los productos:', error);
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [categoryId]); 

  
  if (loading) {
    return <div>Cargando los productos, por favor espere...</div>;
  }

  
  const onViewMore = (id) => {
   
    navigate(`/product/${id}`);
  };

  return (
    <ItemList products={loadedProducts} onViewMore={onViewMore} /> 
  );
};

export default ItemListContainer;
