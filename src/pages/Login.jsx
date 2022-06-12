import { useState } from 'react';
import { auth, provider } from '../service/firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Button, Card, FormControl, Link, Stack, TextField, Typography } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // --------------------
  // 処理
  // --------------------
  // サインアップ
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  // ゲストログイン
  const guestLogin = async () => {
    setEmail( "guest@example.com" );
    setIsLogin( "password" );
    login();
  }
  // 通常ログイン
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  // Googleログイン
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Card component={Stack} width="400px" textAlign="center" sx={{ m: "30px auto 0"}}>
      <Stack spacing={2} sx={{ p:"30px 60px" }}>
        <Typography>{ isLogin ? "ログイン" : "サインアップ" }</Typography>
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            name="email"
            label="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
        {/* サインアップ用ボタン */}
        <Stack display={ isLogin ? "none" : "stack" }>
          <Button variant="contained" size="small" onClick={signUp} >サインアップ</Button>
        </Stack>
        {/* ログイン用ボタン */}
        <Stack display={ isLogin ? "stack" : "none" } spacing={1}>
          <Button variant="contained" size="small" color="primary" onClick={login}>ログイン</Button>
          <Button variant="contained" size="small" color="primary" onClick={googleLogin}>Googleでログイン</Button>
          <Button variant="contained" size="small" color="secondary" onClick={guestLogin}>ゲストログイン</Button>
        </Stack>
        {/* リンク */}
        <Link component="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create new account ?" : "Back to login"}
        </Link>
      </Stack>

    </Card>
  )
}

export default Login
