import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  LinearProgress,
  Button,
  Tooltip,
  Divider,
  InputBase,
  Box,
  TextField,
  IconButton,
} from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  useGridApiContext,
} from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 1),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

const UserTableManager = ({ columns, rows, loading, onActivateOrInActivate, onDelete }) => {
  const [pageSize, setPageSize] = React.useState(10);

  const ToolBar = () => {
    // get current DataGrid context
    const apiRef = useGridApiContext().current;
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Divider
          orientation="vertical"
          sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
        />
        <Tooltip title="Active selected row">
          <Button
            color="success"
            aria-label="active"
            size="small"
            onClick={() => onActivateOrInActivate([...apiRef.getSelectedRows()][0])}
          >
            <FontAwesomeIcon icon="pen" />
            &nbsp; Activate
          </Button>
        </Tooltip>
        <Tooltip title="Delete selected row">
          <Button
            color="error"
            aria-label="delete"
            size="small"
            onClick={() => onDelete([...apiRef.getSelectedRows()][0])}
          >
            <FontAwesomeIcon icon="trash" />
            &nbsp; Delete
          </Button>
        </Tooltip>
        {/* <Divider
          orientation="vertical"
          sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
        /> */}
        {/* <Tooltip title="Search by">
          <Search>
            <SearchIconWrapper>
              <FontAwesomeIcon icon="search" />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Tooltip> */}
      </GridToolbarContainer>
    );
  };

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      loading={loading}
      components={{
        Toolbar: ToolBar,
        LoadingOverlay: LinearProgress,
      }}
      pageSize={pageSize}
      onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      rowsPerPageOptions={[10, 20, 30]}
      pagination
    />
  );
};
export default UserTableManager;
