import React, { useEffect, useState } from 'react';
import { getUsersDetailsInGroups } from './utils/getUsersOfGroup';
import plus from './img/plus.png';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [groupsCount, setGroupsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupsData = await getUsersDetailsInGroups();
        setGroups(groupsData);
        setGroupsCount(groupsData.length);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchData();
  }, []);

  const colors = ['blue', 'green', 'pink', 'red', 'purple'];

  return (
    <div className='py-[1rem] px-[1rem]'>
      <div className="flex justify-between items-center pb-[1rem]">
        <h2 className='font-bold'>Groups ({groupsCount})</h2>
        <button><img src={plus} alt="plus" className='h-4 w-4'/></button>
      </div>
      
      <ul className='overflow-auto max-h-[10rem]'>
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
      </ul>

    </div>
  );
};

export default GroupList;