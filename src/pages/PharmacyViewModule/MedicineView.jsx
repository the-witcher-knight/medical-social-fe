import { Paper, Typography, Divider } from '@mui/material';
import UserTableManager from 'src/shared/components/UserTableManager';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { blue } from '@mui/material/colors';
import { getMedicineList } from './pharmacy-view.reducer';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'medicine.name',
    headerName: 'Name',
    editable: false,
    width: 150,
    valueGetter(params) {
      return params.row.medicine.name;
    },
  },
  {
    field: 'medicine.description',
    headerName: 'Description',
    editable: false,
    width: 300,
    valueGetter(params) {
      return params.row.medicine.description;
    },
  },
  {
    field: 'amount',
    headerName: 'Amount',
    editable: false,
    width: 150,
  },
  {
    field: 'medicine.unit',
    headerName: 'Unit',
    editable: false,
    width: 150,
    valueGetter(params) {
      return params.row.medicine.unit;
    },
  },
  {
    field: 'medicine.price',
    headerName: 'Price',
    editable: false,
    width: 150,
    valueGetter(params) {
      return params.row.medicine.price;
    },
  },
];

export default function MedicineView() {
  const { pharmacyId } = useParams();
  const dispatch = useAppDispatch();

  const { loading, medicineList, errorMessage } = useAppSelector(state => state.pharmacyView);

  useEffect(() => {
    dispatch(getMedicineList({ pharmacyId }));
  }, []);

  const nextPage = () => {
    console.log('nextPage');
  };

  // const onClickAction = (values, action) => {
  //   if (values && values.length > 0) {
  //     action(values[0][1]);
  //   } else {
  //     toast.warning('Please select a pharmacy');
  //   }
  // };

  // const ToolbarItems = ({ apiRef }) => (
  //   <>
  //     <Divider
  //       orientation="vertical"
  //       sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
  //     />
  //     <Tooltip title="View medicine">
  //       <Button
  //         color="info"
  //         aria-label="active"
  //         size="small"
  //         onClick={() => onClickAction([...apiRef.getSelectedRows()], onClickViewMedicine)}
  //       >
  //         <FontAwesomeIcon icon="eye" />
  //         &nbsp; View Medicine
  //       </Button>
  //     </Tooltip>
  //   </>
  // );

  return (
    <Paper sx={{ margin: 3, padding: 3, flexGrow: 3 }}>
      <Typography variant="h5" component="h3" color={blue[400]}>
        Medicines
      </Typography>
      <Divider sx={{ marginTop: 2 }} />
      <div style={{ height: 600, width: '100%' }}>
        <UserTableManager
          sx={{ border: 'none' }}
          columns={columns}
          rows={medicineList}
          loading={loading}
          nextPage={nextPage}
        />
      </div>
    </Paper>
  );
}
