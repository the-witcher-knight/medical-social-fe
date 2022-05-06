import React from 'react';
import { lightBlue } from '@mui/material/colors';
import {
  Box,
  Paper,
  Divider,
  Typography,
  Chip,
  Tooltip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import UserTableManager from 'src/shared/components/UserTableManager';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { toast } from 'react-toastify';
import { AuthorityConstant } from 'src/shared/authority-constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUsers, updateUser, getDegreeDoctor } from './user-manager.reducer';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'login', headerName: 'Username', width: 150 },
  {
    field: 'firstName',
    headerName: 'First name',
    editable: false,
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    editable: false,
    width: 150,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    editable: false,
    valueGetter: params => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    width: 200,
  },
  {
    field: 'activated',
    headerName: 'Activated',
    editable: false,
    width: 150,
    renderCell: params =>
      params.row.activated ? (
        <Chip color="success" label="Active" />
      ) : (
        <Chip color="error" label="InActive" />
      ),
  },
];

export default function AdminPage() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.userManager.loading);
  const userList = useAppSelector(state => state.userManager.userList);
  const errorMessage = useAppSelector(state => state.userManager.errorMessage);
  const updateSuccess = useAppSelector(state => state.userManager.updateSuccess);

  const [userType, setUserType] = React.useState(AuthorityConstant.DOCTOR);
  const [pagination, setPagination] = React.useState({
    page: 0,
    size: 30,
  });

  React.useEffect(() => {
    if (userType) {
      dispatch(getUsers({ userType, ...pagination }));
    }
    if (updateSuccess) {
      toast.success('User update successfully');
    }
  }, [userType, pagination, updateSuccess]);

  React.useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  const nextPage = () => {
    setPagination(prev => ({ ...prev, page: prev.page + 1 }));
  };

  const onChangeUserType = e => {
    setUserType(e.target.value);
  };

  const onClickAction = (values, action) => {
    if (values && values.length > 0) {
      action(values[0][1]);
    } else {
      toast.warn('Please select a user');
    }
  };

  const onActiveOrDeactive = values => {
    if (values) {
      const formData = new FormData();
      Object.keys(values)
        .filter(key => values[key] !== null && values[key] !== undefined)
        .forEach(key => {
          if (key === 'files') {
            formData.append(key, values[key][0]);
          } else if (key === 'activated') {
            formData.append(key, !values[key]); // activated or inactivated
          } else if (key === 'createdDate' || key === 'lastModifiedDate') {
            return; // ignore createdDate and lastModifiedDate
          } else {
            formData.append(key, values[key]);
          }
        });
      dispatch(updateUser(formData));
    }
  };

  const onReviewDegree = values => {
    if (values) {
      dispatch(getDegreeDoctor(values.id)).then(res => {
        window.open('http://localhost:8080/files/' + res.payload.path, '_blank');
      });
    }
  };

  const reviewDegreeToolbarItems = ({ apiRef }) => (
    <>
      <Divider
        orientation="vertical"
        sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
      />
      {userType === AuthorityConstant.DOCTOR && (
        <Tooltip title="Reviewer selected doctor">
          <Button
            color="info"
            aria-label="active"
            size="small"
            onClick={() => onClickAction([...apiRef.getSelectedRows()], onReviewDegree)}
          >
            <FontAwesomeIcon icon="eye" />
            &nbsp; Review Degree
          </Button>
        </Tooltip>
      )}
      <Tooltip title="Active selected row">
        <Button
          color="info"
          aria-label="active"
          size="small"
          onClick={() => onClickAction([...apiRef.getSelectedRows()], onActiveOrDeactive)}
        >
          <FontAwesomeIcon icon="check" />
          &nbsp; Activate
        </Button>
      </Tooltip>
      <Tooltip title="Deactive selected row">
        <Button
          color="info"
          aria-label="deactive"
          size="small"
          onClick={() => onClickAction([...apiRef.getSelectedRows()], onActiveOrDeactive)}
        >
          <FontAwesomeIcon icon="times" />
          &nbsp; Deactivate
        </Button>
      </Tooltip>
      <Divider
        orientation="vertical"
        sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
      />
      <Box sx={{ m: 1, minWidth: 150 }}>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="user-type-input-label">User Type</InputLabel>
          <Select
            labelId="user-type-select-label"
            id="user-type-select"
            value={userType}
            label="User Type"
            size="small"
            onChange={onChangeUserType}
          >
            {Object.keys(AuthorityConstant).map(key => (
              <MenuItem key={key} value={AuthorityConstant[key]}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );

  return (
    <Box component="div" mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ padding: 2, flexGrow: 3 }}>
        <Typography variant="h5" component="h3" color={lightBlue[800]} gutterBottom>
          Doctor Manager
        </Typography>
        <Divider />
        <div style={{ height: 600, width: '100%', marginTop: 2 }}>
          <UserTableManager
            sx={{ border: 'none' }}
            columns={columns}
            rows={userList}
            loading={loading}
            nextPage={nextPage}
            otherToolbarItems={reviewDegreeToolbarItems}
          />
        </div>
      </Paper>
      <Outlet />
    </Box>
  );
}
