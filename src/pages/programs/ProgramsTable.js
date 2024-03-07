import PropTypes from 'prop-types';
import { useEffect } from 'react';
import * as React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Chip from '@mui/material/Chip';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// material-ui
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { app, functions } from '../../firebase/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';

import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import { doesNotContainOperator } from './CustomFilters/DoesNotContainFilterOperator';
import { notEqualOperator } from './CustomFilters/NotEqualFilterOperator';

import {
  DataGridPro as DataGrid,
  getGridStringOperators,
  GridLogicOperator,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  useGridApiRef
} from '@mui/x-data-grid-pro';
import { get } from 'lodash';
import { fontSize } from '../../../node_modules/@mui/system/index';

function programToDataRow(program) {
  const start_date = program.start_date ? new Date(program.start_date) : null;
  const end_date = program.end_date ? new Date(program.end_date) : null;
  return {
    id: program.id,
    name: program.name,
    state_name: program.state,
    websiteurl: program.website,
    program_type_name: program.program_type,
    program_category_name: program.program_category,
    start_date: start_date,
    end_date: end_date,
    technologies: program.technologies
  };
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const _lightGreen_ = '#EBF9F1';
const _darkGreen_ = '#1F9254';
const _lightOrange_ = '#FEF2E5';
const _darkOrange_ = '#CD6200';
const _lightRed_ = '#FBE7E8';
const _darkRed_ = '#A30D11';

// status enum: active, inactive, upcoming
const statusEnum = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  UNKNOWN: 'unknown',
  UPCOMING: 'upcoming'
};

const getStatus = (params) => {
  const currentDate = new Date();
  if (!params.row.start_date && params.row.end_date >= currentDate) {
    return statusEnum.UPCOMING;
  }
  if (params.row.start_date && params.row.start_date <= currentDate && (!params.row.end_date || params.row.end_date >= currentDate)) {
    return statusEnum.ACTIVE;
  }
  if (params.row.end_date && params.row.end_date < currentDate) {
    return statusEnum.INACTIVE;
  }
  return statusEnum.UNKNOWN;
};

const renderStatus = (params) => {
  switch (getStatus(params)) {
    case statusEnum.ACTIVE:
      return (
        <Chip
          label="Active"
          size="small"
          style={{
            backgroundColor: _lightGreen_,
            fontSize: '0.75rem',
            color: _darkGreen_
          }}
        />
      );
    case statusEnum.INACTIVE:
      return (
        <Chip
          label="Inactive"
          size="small"
          style={{
            backgroundColor: _lightRed_,
            fontSize: '0.75rem',
            color: _darkRed_
          }}
        />
      );
    case statusEnum.UNKNOWN:
      return (
        <Chip
          label="Unknown"
          size="small"
          style={{
            backgroundColor: 'text.primary',
            fontSize: '0.75rem',
            color: 'background.paper'
          }}
        />
      );
    case statusEnum.UPCOMING:
      return (
        <Chip
          label="Upcoming"
          size="small"
          style={{
            backgroundColor: _lightOrange_,
            fontSize: '0.75rem',
            color: _darkOrange_
          }}
        />
      );
    default:
      return null;
  }
};

const renderName = (params) => {
  return (
    <RouterLink
      to={`/programs/${params.row.id}`}
      style={{
        color: 'inherit',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'pointer',
        whiteSpace: 'nowrap'
      }}
    >
      {params.value}
    </RouterLink>
  );
};

const getTechnologies = (params) => {
  console.log(get(params.row, 'technologies', []).join(', '));
  return get(params.row, 'technologies', []).join(', ');
};

const renderTechnologies = (params) => {
  const technologies = get(params.row, 'technologies', []);
  return technologies.map((technology) => (
    <Chip
      key={technology}
      label={technology}
      size="small"
      style={{
        margin: '2px',
        backgroundColor: 'background.paper',
        color: 'text.primary'
      }}
      sx={{
        fontSize: '0.75rem'
      }}
    />
  ));
};
const columns = [
  {
    field: 'id',
    headerName: 'ID',
    disableColumnMenu: true,
    headerAlign: 'center',
    align: 'center',
    width: 70,
    hideSortIcons: true,
    headerClassName: 'app-grey--header',
    hide: true
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    headerClassName: 'app-grey--header',
    renderCell: renderName
  },
  {
    field: 'state_name',
    headerName: 'State',
    headerClassName: 'app-grey--header'
  },
  {
    field: 'program_type_name',
    headerName: 'Type',
    flex: 1,
    headerClassName: 'app-grey--header'
  },
  {
    field: 'technologies',
    headerName: 'Technologies',
    flex: 1,
    headerClassName: 'app-grey--header',
    valueGetter: getTechnologies,
    renderCell: renderTechnologies
  },
  {
    field: 'program_category_name',
    headerName: 'Category',
    flex: 1,
    headerClassName: 'app-grey--header'
  },
  {
    headerName: 'Status',
    headerClassName: 'app-grey--header',
    field: 'status',
    valueGetter: getStatus,
    renderCell: renderStatus
  },
  {
    field: 'websiteurl',
    headerName: 'Website',
    headerClassName: 'app-grey--header',
    width: 80,
    renderCell: (params) => {
      if (!params.value) return null;
      return (
        <a href={params.value}>
          <OpenInNewIcon fontSize="small" />
        </a>
      );
    }
  }
];

const defaultTableState = {
  pagination: { paginationModel: { page: 0, pageSize: 25 } },
  filter: {
    filterModel: {
      items: [
        {
          field: 'status',
          operator: 'equals',
          id: 32485,
          value: 'Active',
          fromInput: ':r3l:'
        }
      ],
      quickFilterLogicOperator: GridLogicOperator.Or
    }
  }
};

const maybeStoreTableState = (apiRefCurrent) => {
  const tableState = apiRefCurrent.exportState();
  if (Object.keys(tableState).length === 0) return;

  localStorage.setItem('dsireCloneSiteState', JSON.stringify({ tableState }));
};

function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1.5,
        '& .MuiButton-root': {
          color: 'primary.dark'
        }
      }}
    >
      {/* Grouping other toolbar buttons on the left */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </Box>

      {/* QuickFilter on the right */}
      <GridToolbarQuickFilter sx={{ width: 300 }} />
    </GridToolbarContainer>
  );
}

const addCustomFilterOperators = (columns) => {
  columns.forEach((column) => {
    // Because we're overriding the default filter operators, we need to include the default operators
    column.filterOperators = getGridStringOperators();
    const ineligibleColumns = ['websiteurl', 'id'];
    if (!ineligibleColumns.includes(column.field)) {
      column.filterOperators = [...column.filterOperators, notEqualOperator, doesNotContainOperator];
    }
  });
};

export default function ProgramTable() {
  const location = useLocation(); // Hook from React Router to get current location/route
  const apiRef = useGridApiRef();

  const OneHourInMS = 60 * 60 * 1000;
  const functions = getFunctions();
  const getPrograms = httpsCallable(functions, 'get_programs');
  const { isLoading, error, data } = useQuery({
    queryKey: ['programs'],
    queryFn: () =>
      getPrograms({}).then((result) => {
        return result.data.programs.map((program) => programToDataRow(program));
      }),
    staleTime: OneHourInMS
  });

  // Save table state when the user leaves our site
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      maybeStoreTableState(apiRef.current);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    // Cleanup the event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [apiRef]);

  // Save table state when the user leaves this page
  useEffect(() => {
    const currentApiRef = apiRef.current;
    return () => {
      maybeStoreTableState(currentApiRef);
    };
  }, [location, apiRef]);

  addCustomFilterOperators(columns);

  if (error) return 'An error has occurred';

  let initialTableState = defaultTableState;

  const storedState = localStorage.getItem('dsireCloneSiteState');
  if (storedState) {
    const parsedState = JSON.parse(storedState);
    if (parsedState.tableState) {
      initialTableState = parsedState.tableState;
    }
  }

  return (
    <DataGrid
      apiRef={apiRef}
      columns={columns}
      rows={data ? data : []}
      autoHeight
      pagination
      loading={isLoading}
      pageSizeOptions={[25, 50, 100, 1000]}
      initialState={initialTableState}
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        toolbar: CustomToolbar
      }}
      sx={{
        '--DataGrid-overlayHeight': '300px',
        '& .app-grey--header': {
          backgroundColor: 'primary.main'
        },
        '& .MuiChip-root': {
          borderRadius: 10
        },
        '& .MuiPaper-root': {
          border: null
        },
        '& .MuiDataGrid-columnHeaders': {
          border: null,
          borderRadius: 0,
          borderBottom: 0
        }
      }}
      aria-labelledby="tableTitle"
    />
  );
}
