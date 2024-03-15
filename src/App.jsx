import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import UserList from "./component/UserList";
import GroupList from "./component/GroupList";
import Message from "./component/Message";
import UserInfo from "./component/UserInfo";



//Side bar
import Sidebar from "./component/Sidebar";
import Profile from "./component/Profile";



function App() {
  const [userDetails, setUserDetails] = useState(null);
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userid');

  useEffect(() => {
    if (userId) {
        axios.get(`/api/chatSystem/user/${userId}`)
            .then(response => {
                setUserDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }
  }, [userId]);

  


  return <div className="flex">
  <aside className="flex flex-col h-full pt-[0.5rem] pl-[0.2rem]">
    <div>
      <Sidebar />
    </div>
    
    <div className="pt-[2rem]">
    {userDetails && <Profile userDetails={userDetails} />}
      
    </div>
  </aside>
  
  

  <main className="w-full">
    <div className="flex justify-between items-center  w-full px-[2rem]">
      <div className="text-2xl font-bold">Chat</div>
      <a className="text-[#5e4ae3] underline hover:cursor-pointer font-bold">Add New Profile</a>
    </div>

    <div className="grid grid-cols-9 grid-rows-5 gap-4 h-full px-[2rem] py-[1rem]">
      <div className="bg-white row-span-3 col-span-2 rounded-lg"><UserList /></div>
      <div className="bg-white row-span-5 col-span-5 rounded-lg">{userDetails && <Message userDetails={userDetails} />}</div>
      <div className="bg-white row-span-5 col-span-2 rounded-lg">{userDetails && <UserInfo userDetails={userDetails} />}</div>
      <div className="bg-white row-span-2 col-span-2 rounded-lg"><GroupList /></div>
    </div>
  </main>

</div>;}

export default App;
