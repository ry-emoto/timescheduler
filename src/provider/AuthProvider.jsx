import { useEffect } from 'react';
import { auth } from "../service/firebase";
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { signInUserState } from '../recoil/atoms';

export function AuthProvider({ children }) {
  const setSignInUser = useSetRecoilState(signInUserState);
  const resetStatus = useResetRecoilState(signInUserState);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      user ? setSignInUser({uid: user.uid}) : resetStatus();
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return(
    <>{children}</>
  );
}
