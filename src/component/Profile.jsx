import React from 'react';

const Profile = ({ userDetails }) => {
  const { profileImage, username } = userDetails;

  return (
    <div className="pl-[1rem] pt-[4rem]">
      <div className="relative inline-block">
        <img src={profileImage} alt="Profile" className="h-12 w-12 rounded-full" />
        <div className="bg-green-500 w-3 h-3 rounded-full absolute top-10 right-1 border-2 border-white "></div>
      </div>
      <div className="text-black mt-[0.3rem] font-bold">{username}</div>
    </div>
  );
};

export default Profile;
