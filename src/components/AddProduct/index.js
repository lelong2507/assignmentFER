import React, { useState } from 'react';
import './style.css';

const AddProduct = ({ onAddProduct }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            id: Date.now(),
            title,
            price: parseFloat(price),
            description,
            image,
        };
        onAddProduct(newProduct);
        setTitle('');
        setPrice('');
        setDescription('');
        setImage(null);
    };

    return (
        <div className='add-product__container'>
            <div className='box'>
                <h2 className="text__heading">Add Product Here</h2>
                <form className='wrapper__form' onSubmit={handleSubmit}>
                    <div className='form__input'>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <label>Title:</label>
                    </div>
                    <div className='form__input'>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                        <label>Price:</label>
                    </div>
                    <div className='form__input'>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} required />
                        <label>Description:</label>
                    </div>
                    <div className='form__input'>
                        <input type="file" onChange={handleImageUpload} required />
                    </div>
                    <button className='btn' type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
