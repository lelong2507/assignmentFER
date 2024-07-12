import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

const DetailProduct = ({ onUpdateProduct }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({});
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        const data = `https://fakestoreapi.com/products/${id}`;
        fetch(data)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setUpdatedProduct(data);
                setDataIsLoaded(true);
            })
            .catch(() => {
                console.log('Wrong Fetch');
            })
            .finally(() => {
                console.log('Done Fetch');
            });
    }, [id]);

    if (!dataIsLoaded) {
        return <h2>Loading...</h2>;
    }

    if (!product) {
        return <h2>Product not found</h2>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({
            ...updatedProduct,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewImage(file);

        // Hiển thị ảnh mới trước khi upload
        const reader = new FileReader();
        reader.onloadend = () => {
            setUpdatedProduct({
                ...updatedProduct,
                image: reader.result
            });
        };
        reader.readAsDataURL(file);
    };

    const handleUpdate = () => {
        const updatedData = { ...updatedProduct };
        if (newImage) {
            updatedData.image = URL.createObjectURL(newImage);
        }

        fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                onUpdateProduct(data);
                setIsEditing(false);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className='product__detail'>
            <div className={`overlay ${isEditing ? 'show' : ''}`}>
                <div className='overlay-content'>
                    <h2>Update Product</h2>
                    <input
                        type="text"
                        name="title"
                        value={updatedProduct.title}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="price"
                        value={updatedProduct.price}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        value={updatedProduct.description}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="category"
                        value={updatedProduct.category}
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {updatedProduct.image && <img src={updatedProduct.image} alt="New" />}
                    <button className='btn' onClick={handleUpdate}>Save</button>
                    <button className='btn' onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            </div>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p className='price__product'>${product.price}</p>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            {product.rating && (
                <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            )}
            <button className='btn' onClick={() => setIsEditing(true)}>Update Product</button>
        </div>
    );
};

export default DetailProduct;
