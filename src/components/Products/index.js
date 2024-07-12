import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';

const Products = ({ products, setProducts }) => {
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (products.length === 0) {
            const data = 'https://fakestoreapi.com/products';
            fetch(data)
                .then(response => response.json())
                .then(data => {
                    setProducts(data);
                    setDataIsLoaded(true);
                })
                .catch(error => console.error('Error:', error))
                .finally(() => console.log('Done!'));
        } else {
            setDataIsLoaded(true);
        }
    }, [products, setProducts]);

    const handleDelete = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
    };

    const handleViewDetail = (id) => {
        navigate(`/product/${id}`);
    };

    if (!dataIsLoaded) {
        return <h1 className='text__heading'>Loading...</h1>;
    }

    return (
        <>
            <h1 className='text__heading'>Our Product</h1>
            {
                products.length > 0 ? (
                    <div className='product__list'>
                        {products.map(product => (
                            <div key={product.id} className='product__item'>
                                <img src={product.image} alt={product.title} />
                                <h2>{product.title}</h2>
                                <p className='price__product'>${product.price}</p>
                                <p>{product.description}</p>
                                <button className='btn' onClick={() => handleDelete(product.id)}>Delete Product</button>
                                <button className='btn' onClick={() => handleViewDetail(product.id)}>View Detail</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h2 className='text__heading'>No Products Available</h2>
                )
            }
        </>
    );
};

export default Products;
