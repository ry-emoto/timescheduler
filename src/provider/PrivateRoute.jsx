import {  Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { signInUserState } from '../recoil/atoms';

const PrivateRoute = ({ children }) => {
    const signInUser = useRecoilValue(signInUserState);

    return signInUser.uid ? (
      <>{children}</>
    ) : (
      <Navigate to="/login" />
    );
  };

  export default PrivateRoute;
