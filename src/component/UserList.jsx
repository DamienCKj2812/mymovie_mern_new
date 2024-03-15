import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { randomDate, randomTime, generateShortText, generateRandomNumber } from './utils/randomiseTools';

import seen from './img/seen.png';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [searchContact, setSearchContact] = useState('');

  const filteredUsers = searchContact ? 
    userList.filter(user =>
      user.username.toLowerCase().includes(searchContact.toLowerCase())
    ) : userList;
  
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
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by username"
          value={searchContact}
          onChange={e => setSearchContact(e.target.value)}
          className='mx-[0.5rem] my-[0.5rem] bg-[#eaedf2] px-3 py-2 rounded w-[85%]'
        />
      </div>

      <ul className="overflow-auto max-h-[14.5rem]"> 
        {filteredUsers.map(user => (
          <li key={user.id} className='pl-[1rem] pt-[1rem] relative'> {/* Set li as relative */}
            <div className='flex items-center'> 
              <img src={user.profileImage} alt={user.username} className='h-[3rem] w-[3rem] rounded-full mr-4' /> {/* Set width, height, and rounded corners */}
              
              <div>
                <h3 className="font-bold text-m">
                  {user.username}
                </h3> 

                <p className="text-gray-500 text-xm">
                  <span>{generateShortText()}</span>
                </p>

                <div className="flex gap-[0.5rem]">
                  <div className="font-bold text-sm">
                    {randomDate()}
                  </div> 
                  <div className="font-bold text-sm">
                    {randomTime()}
                  </div> 

                  <img src={seen} alt="seen" className="absolute right-2 h-5 w-5"/>
                </div>

                <span className="absolute top-5 right-2 h-4 w-4  bg-red-500 rounded-full flex items-center justify-center text-white text-xs ml-1">
                    {generateRandomNumber()}
                </span>

              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex p-[1rem] gap-4 pb-0 ml-[1rem]">
        <button className="bg-[#5e4ae3] text-white rounded-md px-4 py-2 font-semibold">Meeting</button> {/* Set background color to purple, text color to white, rounded corners, and padding */}
        <button className="bg-[#eaedf2] text-gray-700 rounded-md px-4 py-2 font-semibold">Schedule</button> {/* Set background color to grey, text color to grey, rounded corners, and padding */}
      </div>
    </div>
  );
};

export default UserList;
