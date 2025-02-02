// Source: https://www.youtube.com/watch?v=27KeYk-5vJw&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=6 (19:25)

import axios from '../api/axios';
import useAuth from './useAuth';

// This hook returns a function for logging a user out.
// Typically is used for also directing a user back to the sign-in page.

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      await axios.put('/auth/logout', null, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
