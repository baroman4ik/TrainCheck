import React, {useState} from 'react';
import {TextField, Grid, Button, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {SearchFormData} from '../../types';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {ru} from 'date-fns/esm/locale'


interface SearchFormProps {
  onSearch: (data: SearchFormData) => void;
  loading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({onSearch, loading}) => {
  const [formData, setFormData] = useState<SearchFormData>({
    from: "",
    to: "",
    date: null,
  });

  const handleChange = (event: SelectChangeEvent<string>) => {
    console.log(event)
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(formData);
    console.log(onSearch)
    console.log(formData)
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={3} md={3}>
          <FormControl size='medium' variant='outlined' sx={{m: 1, minWidth: 200}}>
            <InputLabel>
              Откуда
            </InputLabel>
            <Select
              sx={{width: "200px"}}
              label="Откуда"
              name="from"
              value={formData.from}
              onChange={handleChange}
            >
              <MenuItem value="Крупки">Крупки</MenuItem>
              <MenuItem value="Минск-Пассажирский">Минск-Пассажирский</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} md={3}>
          <FormControl size='medium' variant='outlined' sx={{m: 1, minWidth: 200}}>
            <InputLabel>
              Куда
            </InputLabel>
            <Select
              sx={{width: "200px"}}
              name="to"
              label="Куда"
              value={formData.to}
              onChange={handleChange}
            >
              <MenuItem value="Крупки">Крупки</MenuItem>
              <MenuItem value="Минск-Пассажирский">Минск-Пассажирский</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} md={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <DatePicker

              disablePast
              format="dd.MM.yyyy"
              label="Дата отправления"
              value={formData.date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>

        </Grid>
        <Grid item xs={3} md={3}>
          <Button type="submit" variant="contained" color="primary" sx={{width: "200px"}}
          >
            Найти поезда
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};