import { Box, Divider, Tooltip, Button, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch } from 'src/configs/store';
import UserTableManager from 'src/shared/components/UserTableManager';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet, useNavigate } from 'react-router-dom';
import MedicineDeleteDialog from './DeleteDialog';

const MedicineManagerPage = () => {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  // const loading = false;
  // const medicineList = [];

  // const withSelectedRow = (values, action) => {
  //   if (values && values.length > 0) {
  //     action(values[0][1]);
  //   } else {
  //     toast.warning('Please select a medicine');
  //   }
  // };

  // const addNewMedicine = () => {
  //   navigate('new');
  // };

  // const nextPage = () => {
  //   console.log('Next page');
  // };

  // const columns = [
  //   {
  //     field: 'id',
  //     headerName: 'ID',
  //     width: 100,
  //   },
  //   {
  //     field: 'medicine.name',
  //     headerName: 'Medicine Name',
  //     width: 150,
  //   },
  //   {
  //     field: 'amount',
  //     headerName: 'Amount',
  //     width: 100,
  //   },
  //   {
  //     field: 'medicine.unit',
  //     headerName: 'Unit',
  //     width: 100,
  //   },
  //   {
  //     field: 'medicine.price',
  //     headerName: 'Price',
  //     width: 100,
  //   },
  // ];

  // const toolbarItems = ({ apiRef }) => (
  //   <>
  //     <Divider
  //       orientation="vertical"
  //       sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
  //     />
  //     <Tooltip title="Add new medicine">
  //       <Button color="primary" arial-label="Add new medicine" onClick={() => addNewMedicine()}>
  //         <FontAwesomeIcon icon="plus" />
  //         &nbsp; Add new medicine
  //       </Button>
  //     </Tooltip>
  //     <Tooltip title="View medicine">
  //       <Button
  //         color="secondary"
  //         arial-label="View medicine"
  //         // onClick={() => onClickAction([...apiRef.getSelectedRows()], )}
  //       >
  //         <FontAwesomeIcon icon="eye" />
  //         &nbsp; View medicine
  //       </Button>
  //     </Tooltip>
  //     <Tooltip title="Update medicine">
  //       <Button
  //         color="info"
  //         arial-label="update medicine"
  //         // onClick={() => onClickAction([...apiRef.getSelectedRows()], )}
  //       >
  //         <FontAwesomeIcon icon="wrench" />
  //         &nbsp; Update medicine
  //       </Button>
  //     </Tooltip>
  //     <Tooltip title="Delete Medicine">
  //       <Button
  //         color="error"
  //         arial-label="Delete medicine"
  //         // onClick={() => onClickAction([...apiRef.getSelectedRows()], )}
  //       >
  //         <FontAwesomeIcon icon="trash" />
  //         &nbsp; Delete medicine
  //       </Button>
  //     </Tooltip>
  //   </>
  // );

  return (
    <Box component="div" display="flex" justifyContent="center" mt={3}>
      <Outlet />
      <MedicineDeleteDialog />
    </Box>
  );
};
export default MedicineManagerPage;
