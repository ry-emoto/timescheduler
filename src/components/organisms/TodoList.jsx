import React, { useEffect } from 'react'
import { db } from '../../service/firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { signInUserState, todoTaskState } from '../../recoil/atoms';
import { Stack, Typography } from '@mui/material';
import CreateTodo from '../molecules/todos/CreateTodo';
import DispTodo from '../molecules/todos/DispTodo';

const TodoList = () => {
  // --------------------
  // 定義
  // --------------------
  // todo表示用の格納（リコイル）
  const setTodoTaskState = useSetRecoilState(todoTaskState);
  // ログインユーザー情報取得
  const signInUser = useRecoilValue(signInUserState);

  // --------------------
  // 処理
  // --------------------
  // トリガー：初回
  // 処理：db（todoTasks）を取得
  useEffect(() => {
    const tasksRef = collection(db, 'todoTasks');
    const q = query(tasksRef, orderBy('title',"asc"), where("uid", "==", signInUser.uid));
    const unSub = onSnapshot(q, (snapshot) => {
      setTodoTaskState(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unSub;
  },[]);

  return (
    <Stack spacing={1} sx={{ width: "400px", m: "0 auto" }}>
      {/* タイトル */}
      <Typography variant="h5" textAlign="center">
        Todo リスト
      </Typography>

      {/* Todo登録フォーム */}
      <CreateTodo />

      {/* Todo表示リスト */}
      <DispTodo />
    </Stack>
  )
}

export default TodoList
