import { Divider, LinearProgress } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  useGridApiContext,
} from '@mui/x-data-grid';
import React from 'react';

// interface Builder {
//   buildBasic(),
//   buildComponent(),
//   buildPagination(),
// }

export class DataGridBuilder {
  result;

  /**
   * Build data grid component
   * @param {T[]} columns
   * @param {T[]} rows
   * @param {style} sx
   * @param {bool} loading
   */
  withBasic(columns, rows, loading, sx) {
    this.result = {
      ...this.result,
      columns,
      rows,
      loading,
      sx,
    };
    return this;
  }

  /**
   * Build the toolbar component
   * @param {bool} addDefaultItems - if true, will add default items to the toolbar
   * @param {React.FC} items - the toolbar to add to the grid with props {apiRef}
   */
  withToolbar(addDefaultItems, items) {
    const ToolBar = () => {
      const apiRef = useGridApiContext().current;

      return (
        <GridToolbarContainer>
          {addDefaultItems && (
            <>
              <GridToolbarFilterButton />
              <GridToolbarDensitySelector />
              <GridToolbarExport />
              <Divider
                orientation="vertical"
                sx={{ margin: 1, borderColor: 'text.secondary', minHeight: '10px' }}
              />
            </>
          )}
          {items && items({ apiRef })}
        </GridToolbarContainer>
      );
    };

    this.result = {
      ...this.result,
      components: {
        Toolbar: ToolBar,
      },
    };

    return this;
  }

  withLoadingOverlay(type) {
    const components = this.result.components;

    this.result.components = {
      ...components,
      LoadingOverlay: type || LinearProgress,
    };

    return this;
  }

  withPagination(pageSize, onPageSizeChange, rowsPerPageOptions, pagination) {
    this.result = {
      ...this.result,
      pageSize,
      onPageSizeChange,
      rowsPerPageOptions,
      pagination,
    };
    return this;
  }

  getComponent() {
    return <DataGrid {...this.result} />;
  }
}
