import {  Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { signInUserState } from '../recoil/atoms';

const PublicRoute = ({ children }) => {
    const signInUser = useRecoilValue(signInUserState);

    return !signInUser.uid ? (
      <>{children}</>
    ) : (
      <Navigate to="/" />
    );
  };

  export default PublicRoute;
