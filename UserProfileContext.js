import React, { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: 'Saman',
    email: 'saman012@gmail.com',
    phone: '+941234567',
    address: "Boy's Hostel,\nAriviyal nagar,Kilinochchi.",
  });
  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
