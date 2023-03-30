import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Train} from '../../types';

interface TrainListProps {
  trains: Train[];
}

const columns: GridColDef[] = [
  {field: 'from', headerName: 'Откуда', flex: 1},
  {field: 'to', headerName: 'Куда', flex: 1},
  {
    field: 'date',
    headerName: 'Дата отправления',
    flex: 1,
    valueFormatter: (params) =>
      (params.value as Date).toLocaleString(),
  },
  {field: 'seats', headerName: 'Свободные места', flex: 1},
];

export default function TrainList({trains}: TrainListProps) {
  const rows = trains.map((train) => ({...train, id: train.id,}));

  return (
    <div style={{height: 400, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}

      />
    </div>
  );
}