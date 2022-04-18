import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/configs/store';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';
import { DataGrid, useGridApiContext, GridToolbarContainer } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PrescriptionModal() {
  const { patientId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const [prescription, setPrescription] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
    navigate('/booking-manager');
  };

  const cols = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'medicineName', headerName: 'MedicineName', editable: true, width: 250 },
    { field: 'dose', headerName: 'Dose', editable: true, width: 350 },
  ];

  const { apiRef, columns } = useApiRef(cols);

  const onAccept = () => {
    // Get all rows from table (type map)
    const rows = apiRef.current.getRowModels();
    // Convert to array
    const prescription = Array.from(rows).map(row => row[1]);
    console.log(prescription);
    // dispatch(prescription(prescriptionData))
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Prescribing medication for patients with ID {patientId}
      </DialogTitle>
      <DialogContent>
        <PrescriptionTable columns={columns} />
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button color="primary" fullWidth variant="contained" onClick={onAccept}>
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button color="secondary" fullWidth variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

function PrescriptionTable({ columns }) {
  const prescription = [];

  return (
    <div style={{ height: 500, width: 690 }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={prescription}
            columns={columns}
            experimentalFeatures={{ newEditingApi: true }}
            components={{
              Toolbar: CustomToolbar,
            }}
            hideFooter
          />
        </div>
      </div>
    </div>
  );
}

function useApiRef(columns) {
  const apiRef = React.useRef(null);
  const _columns = React.useMemo(
    () =>
      columns.concat({
        field: '__HIDDEN__',
        width: 0,
        renderCell(params) {
          apiRef.current = params.api;
          return null;
        },
      }),
    [columns]
  );

  return { apiRef, columns: _columns };
}

function CustomToolbar() {
  const apiRef = useGridApiContext().current;

  const addMore = () => {
    // TODO: Add rows with biggest ID + 1
    apiRef.updateRows([{ id: apiRef.getRowsCount() + 1, medicineName: '', dose: '' }]);
  };

  const removeOne = () => {
    const rows = apiRef.getSelectedRows();
    // Remove seleted rows
    apiRef.updateRows([{ id: rows.entries().next().value[1].id, _action: 'delete' }]);
  };

  return (
    <GridToolbarContainer>
      <Button type="button" size="small" color="info" onClick={addMore}>
        <FontAwesomeIcon icon="plus" />
        &nbsp;Add more
      </Button>
      <Button type="button" size="small" color="info" onClick={removeOne}>
        <FontAwesomeIcon icon="minus" />
        &nbsp;Remove one
      </Button>
    </GridToolbarContainer>
  );
}
