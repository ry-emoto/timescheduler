import React, { useState } from 'react'
import { db } from '../../../service/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Button, FormControl, Stack, TextField } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { signInUserState } from '../../../recoil/atoms';

const CreateTodo = () => {
  // --------------------
  // 定義
  // --------------------
  // todoの入力値を格納
  const [inputTitle, setInputTitle] = useState("")
  // ログインユーザー情報取得
  const signInUser = useRecoilValue(signInUserState);

  // --------------------
  // 処理
  // --------------------
  // トリガー：todo入力時
  // 処理：入力値をdb（todoTasks）に格納
  const dbAdd = async () => {
    const tasksRef = collection(db, 'todoTasks');
    await addDoc(tasksRef, {
      title: inputTitle,
      uid: signInUser.uid,
      createAt: serverTimestamp(),
      completed: false,
      deleted: false,
    });
    setInputTitle("");
  }

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
      <FormControl fullWidth>
        <TextField
          label="New task ?"
          size='small'
          value={inputTitle}
          onChange={(e) =>
            setInputTitle(e.target.value)
          }
        />
      </FormControl>
      <Button variant="contained" size="small" disabled={!inputTitle}  sx={{borderRadius: "30px" }} onClick={() => dbAdd()}>追加</Button>
  </Stack>
)
}

export default CreateTodo
