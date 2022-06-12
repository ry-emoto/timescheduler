import React from 'react'
import { db } from '../../../service/firebase';
import { addDoc, collection,  deleteDoc,  doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Box, Button, Card,  FormControl, IconButton, MenuItem, Select, Stack, Typography, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { selectDateState, timeTaskState, todoTaskState } from '../../../recoil/atoms';

const DispTime = () => {
  // --------------------
  // 定義
  // --------------------
  // リストに表示する時刻用
  const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  // timeリストに表示するリスト
  const timeTasks = useRecoilValue(timeTaskState);
  // セレクトボックスに表示するリスト
  const todoTasks = useRecoilValue(todoTaskState);
  const wordTasks = todoTasks.filter((task) => task.completed === false && task.deleted === false);
  // 選択した日付を取得→フォーマット
  const selectDate = useRecoilValue(selectDateState);
  const formatSelectDate = format(selectDate,"yyyyMMdd");

  // --------------------
  // 処理
  // --------------------
  // トリガー：追加ボタン押下時
  // 処理：db（timeTasks）に登録
  const addTodo = async (hour) => {
    const usersCollectionRef = collection(db, 'timeTasks');
    await addDoc(usersCollectionRef, {
      title: "",
      createAt: serverTimestamp(),
      day: formatSelectDate,
      hour : hour,
    });
  }
  // トリガー：ゴミ箱ボタン押下時
  // 処理：db（timeTasks）を削除
  const delTodo = async (taskId) => {
    const usersCollectionRef = doc(db, 'timeTasks', taskId);
    await deleteDoc(usersCollectionRef);
  }
  // トリガー：初回
  // 処理：db（timeTasks）を取得
  const changeTodo = (id, event) => {
    updateTodo(id, event.target.value);
  };
  const updateTodo = async (id, title) => {
    const usersCollectionRef = doc(db, 'timeTasks', id);
    await updateDoc(usersCollectionRef, {
      title: title,
    });
  }

  return (
    <Card component={Stack} variant="outlined" sx={{ p: "16px", overflow: "auto"}}>
      {hours.map((hour, index) => {
        return(
          <Box key={index}>
            <Stack direction="row" justifyContent="left" alignItems="center">
              <Typography variant="body1">{`${hour}:00`}</Typography>
              <Button size='small' onClick={() => addTodo(hour)}>追加</Button>
            </Stack>
            {timeTasks.filter((fil) => fil.day===formatSelectDate && fil.hour===hour).map((day, index) => {
              return(
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} key={index}>
                  <FormControl fullWidth size='small' key={index}>
                    <InputLabel>todo</InputLabel>
                    <Select
                      value={day.title}
                      onChange={(e) => changeTodo(day.id, e)}
                    >
                      {wordTasks.map((task) => {
                        return (
                          <MenuItem key={task.id} value={task.title}>{task.title}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <IconButton edge="end" size="small" onClick={() => delTodo(day.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              );
            })}
          </Box>
        );
      })}
    </Card>
  )
}

export default DispTime
