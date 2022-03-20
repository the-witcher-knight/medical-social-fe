import React from 'react';
import { LinearProgress, Divider } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  useGridApiContext,
} from '@mui/x-data-grid';

const UserTableManager = ({ columns, rows, loading, nextPage, otherToolbarItems }) => {
  const [pageSize, setPageSize] = React.useState(10);

  const ToolBar = () => {
    // get current DataGrid context
    const apiRef = useGridApiContext().current;

    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        {otherToolbarItems && otherToolbarItems({ apiRef })}
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
