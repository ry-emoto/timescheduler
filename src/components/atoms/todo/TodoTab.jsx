import React from 'react'
import { db } from '../../../service/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { List, Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoTab = (props) => {
  // --------------------
  // 処理
  // --------------------
  // トリガー：ゴミ箱アイコンクリック
  // 処理：db（todoTasks）更新
  const dbUpdateDelete = async (task) => {
    const usersCollectionRef = doc(db, 'todoTasks', task.id);
    await updateDoc(usersCollectionRef, { deleted: !task.deleted });
  }
  // トリガー：チェックアイコンクリック
  // 処理：db（todoTasks）更新
  const dbUpdateComplete = async (task) => {
    const usersCollectionRef = doc(db, 'todoTasks', task.id);
    await updateDoc(usersCollectionRef, { completed: !task.completed });
  }

  return (
    <List>
    {props.tasks.map((task) => {
      return (
        <React.Fragment key={task.id}>
          <ListItem
            secondaryAction={
              <IconButton edge="end" size="small" onClick={() => dbUpdateDelete(task)}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            }
            disablePadding>
            <ListItemIcon sx={{minWidth:"30px", m:0, p:0}}>
              <Checkbox
                edge="start"
                checked={task.completed}
                onChange={() => dbUpdateComplete(task)}
                size='small'
                sx={{m:0, p:0}}
              />
            </ListItemIcon>
            <ListItemText primary={task.title} />
          </ListItem>
        </React.Fragment>
      )
    }
    )}
  </List>
  )
}

export default TodoTab
