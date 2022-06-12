import React, { useState } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { selectDateState } from '../../recoil/atoms';

const DatePicker = () => {
  // --------------------
  // 定義
  // --------------------
  // カレンダーの選択日付を格納（リコイル）
  const [selectDate, setSelectDate] = useRecoilState(selectDateState);

  // --------------------
  // 関数
  // --------------------
  // トリガー：日付変更時
  // 処理：選択した日付をリコイルに格納
  const changeDay = (newValue) => {
    setSelectDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
          inputFormat="MM/dd/yyyy"
          value={selectDate}
          onChange={changeDay}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
    </LocalizationProvider>
    )
}

export default DatePicker
