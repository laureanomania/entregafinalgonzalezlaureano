import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import NotFound from './components/NotFound';
import Cart from './components/Cart';  
import CartProvider from './context/CartProvider';

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<ItemListContainer />} />
                        <Route path="/category/:categoryId" element={<ItemListContainer />} />
                        <Route path="/detail/:id" element={<ItemDetailContainer />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/cart" element={<Cart />} />  
                    </Routes>
                </Layout>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
