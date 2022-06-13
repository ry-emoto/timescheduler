import React, { useEffect } from 'react'
import { db } from '../../service/firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { signInUserState, timeTaskState, } from '../../recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Stack, Typography } from '@mui/material';
import DispTime from '../molecules/times/DispTime';

const TimeList = () => {
  // --------------------
  // 定義
  // --------------------
  // todo表示用の格納（リコイル）
  const setTimeTaskState = useSetRecoilState(timeTaskState);
  // ログインユーザー情報取得
  const signInUser = useRecoilValue(signInUserState);

  // --------------------
  // 処理
  // --------------------
  // トリガー：初回
  // 処理：db（timeTasks）を取得
  useEffect(() => {
    const tasksRef = collection(db, 'timeTasks');
    const q = query(tasksRef, orderBy('createAt',"asc"), where("uid", "==", signInUser.uid));
    const unSub = onSnapshot(q, (snapshot) => {
      setTimeTaskState(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unSub;
  },[]);

  return (
    <Stack spacing={1} sx={{ width: "400px", m: "0 auto" }}>
      {/* タイトル */}
      <Typography variant="h5" textAlign="center">
        Time リスト
      </Typography>

      {/* Todo表示リスト */}
      <DispTime />
    </Stack>  )
}

export default TimeList
