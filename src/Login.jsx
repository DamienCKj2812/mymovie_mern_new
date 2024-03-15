import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import chatUi from './component/img/chatUI.png'

const Login = () => {
    const [userList, setUserList] = useState([]);
    const [searchContact, setSearchContact] = useState('');

    useEffect(() => {
        axios.get('/api/chatSystem/users/list')
            .then(response => {
                setUserList(response.data);
            })
            .catch(error => {
                console.error('Error fetching user list:', error);
            });
    }, []);

return (
    <div style={{ backgroundImage: `url(${chatUi})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',  }}>
    <div className="h-screen flex justify-center items-center" style={{ backgroundImage: `url(${chatUi})` }}>
        <div className='bg-[#5e4ae3] bg-opacity-90 text-white rounded-lg px-[6rem] py-[2rem]'>
        <h1 className="font-bold text-3xl">Login</h1>
            <ul>
                {userList.map(user => (
                <li key={user.id} className=" mt-[2rem]">
                    <Link to={{ pathname: '/App', search: `?userid=${user.id}` }} className='flex items-center flex-row gap-5'>
                    <img src={user.profileImage} alt={user.username} className="w-10 h-10 rounded-full mr-2" />

                    <div className="flex flex-col">
                        <div>{user.username}</div>
                        <div>{user.email}</div>
                    </div>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    </div>
    </div>
    );
};

export default Login;