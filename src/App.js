import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import Home from './components/HomePage/index.js';
import Footer from './components/Footer/index.js';
import DetailProduct from './components/DetailProduct';

function App() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
  };

  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/our-product' element={<Products products={products} setProducts={setProducts} />} />
          <Route path='/addProduct' element={<AddProduct onAddProduct={handleAddProduct} />} />
          <Route path='/product/:id' element={<DetailProduct onUpdateProduct={handleUpdateProduct} />} />
        </Routes>
      </Layout>
      <Footer />
    </div>
  );
}

export default App;
