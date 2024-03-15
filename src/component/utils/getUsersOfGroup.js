import axios from "axios";

const fetchGroupData = async () => {
  try {
    const response = await axios.get("/api/chatSystem/groups/list"); // Assuming your React app is running on the same origin, so you don't need to specify the full URL
    return response.data;
  } catch (error) {
    console.error("Error fetching group data:", error);
    return null;
  }
};

const fetchAndStoreUserData = async () => {
    try {
      const response = await axios.get('/api/chatSystem/users/list');
      const userData = response.data;
      const userDataMap = {};
  
      for (const user of userData) {
        const { id, ...userDetails } = user; // Changed variable name from userDataWithoutId to userDataa
        userDataMap[id] = userDetails;
      }
  
      return userDataMap;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null; // Return null in case of error
    }
  };
  

  const createGroupHashmap = async () => {
    const groupData = await fetchGroupData();
    if (!groupData) return {};
  
    const groupHashmap = {};
    groupData.forEach(group => {
      groupHashmap[group.id] = group;
    });
  
    return groupHashmap;
  };

  const getUsersDetailsInGroups = async () => {
    const userDataMap = await fetchAndStoreUserData();
    const groupHashmap = await createGroupHashmap();
  
    const results = [];
  
    for (const groupId in groupHashmap) {
      const group = groupHashmap[groupId];
      const userImages = [];
  
      for (const userId of group.users) {
        const userData = userDataMap[userId];
        if (userData && userData.profileImage) {
          userImages.push(userData.profileImage);
        }
      }
  
      const userCount = userImages.length;
  
      results.push({
        groupId: group.id,
        groupName: group.name,
        userImages: userImages,
        userCount: userCount
      });
    }
  
    return results;
  };


export{fetchAndStoreUserData, createGroupHashmap, getUsersDetailsInGroups};
const userDataMap = await fetchAndStoreUserData();


