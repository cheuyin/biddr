// Source: https://www.youtube.com/watch?v=oUZjO00NkhY&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=3 (8:35)

import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

// This hook just simplifies the steps needed for calling the Auth Context
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
