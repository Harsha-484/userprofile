import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCard = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?page=1&results=12&seed=abc');
        setUserList(response.data.results);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const renderCardGroup = (start, end) => {
    return userList.slice(start, end).map((userData) => (
      <div
        key={userData.login.uuid}
        className="max-w-md mx-4 my-4 overflow-hidden bg-white rounded-lg shadow-lg flex">
        <img
          className="object-cover w-full h-48 md:w-1/2 rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          src={userData.picture.large}
          alt={`${userData.name.first} ${userData.name.last}`}
        />
        <div className="w-full p-4 flex flex-col">
          <div className="text-lg md:text-xl font-bold mb-2">
            {userData.name.first} {userData.name.last}
          </div>
          <div className="mb-2 text-gray-700"><span className="font-semibold">Country:</span> {userData.location.country}</div>
          <div className="text-gray-700 flex-1">
            <p className="mb-2">
              <span className="font-semibold">Phone:</span> {userData.phone}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-500 min-h-screen p-8">
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-wrap w-full justify-center">
          {renderCardGroup(0, 3)}
        </div>
        <div className="flex flex-wrap w-full justify-center">
          {renderCardGroup(3, 6)}
        </div>
        <div className="flex flex-wrap w-full justify-center">
          {renderCardGroup(6, 9)}
        </div>
        <div className="flex flex-wrap w-full justify-center">
          {renderCardGroup(9, 12)}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
