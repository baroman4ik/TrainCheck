import React, {useState} from 'react';

import './App.css';
import {CircularProgress, Container, Typography} from '@mui/material';
import TrainList from './components/TrainList/TrainList';
import {SearchFormData, Train} from './types';
import {SearchForm} from './components/SearchForm/SearchForm';
import axios from "axios";

function App() {

  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (data: SearchFormData) => {
    const {from, to, date} = data
    console.log(from)
    setLoading(true);
    try {
      const response = await axios.get(`https://pass.rw.by/ru/route/?from=${from}&from_exp=2100001&from_esr=140210&to=${to}&to_exp=2100011&to_esr=141707&front_date=5+%D0%B0%D0%BF%D1%80.+2023&date=2023-04-05`, {
        params: {from, date},
      });
      setTrains(response.data);
      setError('');
    } catch (e) {
      setTrains([]);
      setError('Ошибка при загрузке поездов');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{pt: 4}}>
      <Typography variant="h4" align="center" gutterBottom>
        Расписание поездов
      </Typography>
      <SearchForm onSearch={handleSearch} loading={loading}/>
      {loading ? <CircularProgress sx={{display: "flex", justifyContent: "center"}}/> : (
        <>
          {
            error && (
              <Typography variant="body1" color="error" align="center">
                {error}
              </Typography>
            )
          }
          {trains.length > 0 ? (
            <TrainList trains={trains}/>
          ) : (
            <Typography variant="body1" align="center">
              Нет данных для отображения
            </Typography>
          )}
        </>
      )}
    </Container>
  );
}

export default App;
