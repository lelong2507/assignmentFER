import React from 'react';
import ava from '../../assets/avatar.jpg';
import './style.css';

const Information = () => {
    const user = {
        id: 1,
        name: 'LongBuaDinh',
        nickName: 'BoyNhaNgheo',
        age: 28,
        address: '123 Main St',
        email: 'longbuadinh@gmail.com',
        phone: '0987654321',
    };

    return (
        <div className='information'>
            <img src={ava} alt="avatar" className='avatar' />
            <div className='user-details'>
                <h2>{user.name}</h2>
                <p className='nickname'>{user.nickName}</p>
            </div>
            <i class="fa-solid fa-right-from-bracket"></i>
        </div>

    );
};

export default Information;
