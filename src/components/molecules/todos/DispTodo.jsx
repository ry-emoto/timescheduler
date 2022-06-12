import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { todoTaskState } from '../../../recoil/atoms';
import { Box, Card, Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TodoTab from '../../atoms/todo/TodoTab';

const DispTodo = () => {
  // --------------------
  // 定義
  // --------------------
  // タブ切り替え用
  const [value, setValue] = useState('1');
  // 表示するtodoリスト取得
  const todoTasks = useRecoilValue(todoTaskState);
  // 表示するtodoリスト取得（作業中）
  const wordTasks = todoTasks.filter((task) => task.completed === false && task.deleted === false);
  // 表示するtodoリスト取得（完了）
  const completedTasks = todoTasks.filter((task) => task.completed === true && task.deleted === false);
  // 表示するtodoリスト取得（ゴミ箱）
  const deletedTasks = todoTasks.filter((task) => task.deleted === true);

  // --------------------
  // 処理
  // --------------------
  // トリガー：タブ切り替え時
  // 処理：タブの値をセット
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card  component={Stack} variant="outlined" sx={{ maxHeight: "400px", overflow: "auto"}}>
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} centered>
            <Tab label="作業中" value="1" />
            <Tab label="完了" value="2" />
            <Tab label="ゴミ箱" value="3" />
          </TabList>
        </Box>
        <Box sx={{ ".MuiTabPanel-root" : { p: "16px" } }}>
          <TabPanel value="1"><TodoTab tasks={wordTasks} /></TabPanel>
          <TabPanel value="2"><TodoTab tasks={completedTasks} /></TabPanel>
          <TabPanel value="3"><TodoTab tasks={deletedTasks} /></TabPanel>
        </Box>
      </TabContext>
    </Card>
    )
}

export default DispTodo
