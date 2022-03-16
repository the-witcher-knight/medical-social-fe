import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const DoctorManagerPage = () => {
  const { data } = useDemoData({
    dataSet: 'doctor',
    visibleFields: ['firstname', 'lastname', 'speciality', 'isActive'],
    rowLength: 100,
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid {...data} />
    </div>
  );
};
export default DoctorManagerPage;
