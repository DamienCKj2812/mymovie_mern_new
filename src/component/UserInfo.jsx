import React from 'react'
import gps from './img/gps.png';
import addUser from './img/add-user.png';
import chat from './img/chat.png';
import videoCall from './img/video-call.png';
import info from './img/info.png';
import team from './img/team.png';
import picture from './img/picture.png';
import { getUsersDetailsInGroups } from './utils/getUsersOfGroup';
import { useEffect, useState } from 'react';




const UserInfo = ({userDetails}) => {
  const { id, username, position, address, phone, email, profileImage,   } = userDetails;
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupsData = await getUsersDetailsInGroups();
        setGroups(groupsData);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchData();
  }, []);

  const colors = ['blue', 'green', 'pink', 'red', 'purple'];

  return (
    <>
    <div className="flex flex-col overflow-auto max-h-[40rem]">
      <div className="flex flex-col items-center">
        <div>
          <div>
            <img src={profileImage} alt="profile image" className="w-full h-full" />
          </div>
        </div>

        <div className="mt-[-4rem] w-[80%] bg-white rounded-tl-lg rounded-tr-lg flex flex-col gap-2 items-center text-center mx-[1.5rem] z-10 py-[1rem]">
          <div className="font-bold">{username}</div>
          <div className="text-gray-400">{position}</div>
          <div className="font-semibold flex ">
            <img src={gps} alt="gps" className='w-6 h-6'/>
            {address}
          </div>
        </div>

        <div className='flex gap-3'>
          <div className="border border-black rounded-full p-3">
            <img src={addUser} alt="add user" className="h-6 w-6 " />
          </div>

          <div className="border bg-[#5e4ae3]  border-white rounded-full p-3">
            <img src={chat} alt="chat" className="h-6 w-6 filter invert" />
          </div>

          <div className="border bg-red-500  border-white rounded-full p-3">
            <img src={videoCall} alt="video call" className="h-6 w-6 filter invert" />
          </div>
        </div>
      </div>
      
      <br/><hr />

      {/* Middle part */}

      <div className="flex-col pt-[1rem] px-[1rem]">
        <div className='flex justify-between'>
          <div className="font-semibold">User Information</div>
          <div>
          <img src={info} alt="info" className="filter grayscale" />
        </div>
        </div>

        <p className='text-gray-400'>Phone</p>
        <div className="font-bold">{phone}</div>
        <p className='pt-3 text-gray-400'>Email</p>
        <div className="font-bold">{email}</div>
      </div>

      <br/><hr />
    

    <div className="flex-col pt-[1rem] px-[1rem]">
      <div className='flex justify-between'>
        <div className="font-semibold">Group Participants</div>
        <div>
          <img src={team} alt="team" className="filter grayscale" />
        </div>
      </div>

      
        {groups.map((group, index) => (
          <li key={group.groupId} className='flex  mt-3 items-center'>
            <div className={`rounded-lg h-8 w-8  flex items-center justify-center`} style={{ backgroundColor: colors[index % colors.length], color: 'white' }}>
              {group.groupName.charAt(0)}
            </div>

            <p className='pl-[1rem] text-sm pr-[2rem]'>{group.groupName}</p> 

            <div className='flex items-center relative'>
              {group.userImages.length > 0 && (
                <div className="h-8 w-8 rounded-full overflow-hidden relative">
                  <img src={group.userImages[0]} alt={`User 1`} className="w-full h-full object-cover z-10" />
                </div>
              )}
              {group.userCount > 1 && (
                <div className="h-8 w-8 flex items-center justify-center bg-gray-400 rounded-full ml-4 absolute z-20">
                  <p className="text-white">+{group.userCount - 1}</p>
                </div>
              )}
            </div>
          </li>
        ))}
    </div>

    <br/><hr />

    <div className="flex-col pt-[1rem] px-[1rem]">
      <div className='flex justify-between'>
        <div className="font-semibold">Media</div>
        <div>
          <img src={picture} alt="picture" className="filter grayscale" />
        </div>
      </div>

      <p className='pt-3 text-gray-400'>No media uploaded yet..</p>
    </div>

    </div>
    </>
  )
}

export default UserInfo