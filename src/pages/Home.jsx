import React from 'react'
import { Box, Stack } from '@mui/material';
import DatePicker from '../components/molecules/DatePicker';
import TodoList from '../components/organisms/TodoList';
import TimeList from '../components/organisms/TimeList';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const Home = () => {
  return (
    <>
      <header><Header /></header>

      <Stack component="main" spacing={2} justifyContent="center" sx={{ my: "60px" }}>
        {/* カレンダー表示エリア */}
        <Box textAlign="center">
          <DatePicker />
        </Box>
        {/* Todoリストとtimeリスト表示エリア */}
        <Stack flexWrap="wrap" direction="row" justifyContent="center" sx={{ m: "0 auto" }}>
          <TodoList />
          <TimeList />
        </Stack>
      </Stack>

      <footer><Footer /></footer>
    </>
  )
}

export default Home
