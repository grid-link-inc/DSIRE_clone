import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { app, functions } from '../../firebase/firebase';
import { getFunctions, httpsCallable } from "firebase/functions";

function createData(trackingNo, name, state_name, websiteurl, program_type_name, program_category_name, start_date, end_date) {
  return { trackingNo, name, state_name, websiteurl, program_type_name, program_category_name, start_date, end_date };
}

// const rows = [
//   createData(22574, "North Dakota Solar/Wind Easements and Laws", "North Dakota", "", "Solar/Wind Access Policy", "Regulatory Policy", "2022-01-01", "2025-01-01"),
//   createData(2956, "Qualifying Wood Stove Deduction", "Arizona", "", "Personal Tax Deduction", "Financial Incentive", "1994-01-01", ""),
//   createData(2287, "Maryland Solar Easements & Rights Laws", "Maryland", "", "Solar/Wind Access Policy", "Regulatory Policy", "2006-05-12", "2006-05-12"),
//   createData(2740, "Oregon Solar and Wind Easements/Rights Laws", "Oregon", "", "Solar/Wind Access Policy", "Regulatory Policy", "", ""),
//   createData(4790, "Alaska Solar Easements", "Alaska", "", "Solar/Wind Access Policy", "Regulatory Policy", "2003-05-20", "2003-05-20"),
//   createData(4717, "Idaho Solar Easements & Access Laws", "Idaho", "", "Solar/Wind Access Policy", "Regulatory Policy", "2004-03-06", "2007-03-06"),
//   createData(2658, "Kansas Solar Easement Laws", "Kansas", "", "Solar/Wind Access Policy", "Regulatory Policy", "", ""),
//   createData(4469, "Xcel Energy - Net Metering", "Colorado", "http://www.xcelenergy.com/docs/corpcomm/psco_elec_entire_tariff.pdf", "Net Metering", "Regulatory Policy", "2015-01-26", "2015-01-26"),
//   createData(5897, "Wood-Burning Heating System Deduction", "Alabama", "", "Personal Tax Deduction", "Financial Incentive", "", ""),
//   createData(1995, "Georgia Solar Easement Laws", "Georgia", "", "Solar/Wind Access Policy", "Regulatory Policy", "2014-07-01", "2017-07-01"),
//   createData(1996, "Kentucky Solar Easements Laws", "Kentucky", "", "Solar/Wind Access Policy", "Regulatory Policy", "2003-07-01", "2009-07-01"),
//   createData(4792, "Maine Solar Easements (Duplicate entry)", "Maine", "", "Solar/Wind Access Policy", "Regulatory Policy", "", ""),
//   createData(5017, "Rhode Island Solar Easement Laws", "Rhode Island", "", "Solar/Wind Access Policy", "Regulatory Policy", "2006-08-08", "2006-08-08"),
//   createData(2696, "Solar Easements & Rights Laws", "Washington", "", "Solar/Wind Access Policy", "Regulatory Policy", "2010-06-01", "2013-06-01"),
//   createData(4671, "Fuel Mix and Emissions Disclosure", "Texas", "http://www.powertochoose.org", "Generation Disclosure", "Regulatory Policy", "", ""),
//   createData(5020, "Arizona Solar Rights", "Arizona", "", "Solar/Wind Access Policy", "Regulatory Policy", "2010-10-01", "2010-10-01"),
//   createData(5186, "SRP - Solar Water Heating Program", "Arizona", "http://www.srpnet.com/environment/solar/home/solarwaterheat.aspx", "Rebate Program", "Financial Incentive", "", ""),
//   createData(5884, "Renewable Portfolio Standard", "Wisconsin", "https://psc.wi.gov/Pages/Programs/RpsCompliance.aspx", "Renewables Portfolio Standard", "Regulatory Policy", "", ""),
//   createData(2748, "Tennessee Solar Easement and Access Laws", "Tennessee", "", "Solar/Wind Access Policy", "Regulatory Policy", "", ""),
//   createData(3152, "New Jersey Solar Easements (duplicate entry)", "New Jersey", "", "Solar/Wind Access Policy", "Regulatory Policy", "", "")
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //


// name, state_name, websiteurl, program_type_name, program_category_name, start_date, end_date) {
const headCells = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'ID'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'state_name',
    align: 'left',
    disablePadding: true,
    label: 'State'
  },
  {
    id: 'program_type_name',
    align: 'left',
    disablePadding: false,
    label: 'Program Type'
  },
  {
    id: 'program_category_name',
    align: 'left',
    disablePadding: false,
    label: 'Program Category'
  },
  {
    id: 'start_date',
    align: 'left',
    disablePadding: false,
    label: 'Start Date'
  },
  {
    id: 'end_date',
    align: 'left',
    disablePadding: false,
    label: 'End Date'
  }
];


// ==============================|| ORDER TABLE - HEADER ||============================== //

function ProgramTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ProgramTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};


// ==============================||  TABLE ||============================== //

function nameWithLink(name, websiteurl) {
  if (websiteurl) {
    return (
      <Link href={websiteurl} target="_blank" rel="noreferrer">
        {name}
      </Link>
    )
  }
  return name
}

export default function ProgramTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const functions = getFunctions();
    const getPrograms = httpsCallable(functions, 'get_programs');
    // program.id,
    // program.name,
    // state.name AS state_name,
    // program.websiteurl,
    // program_type.name AS program_type_name,
    // program_category.name AS program_category_name,
    // program.start_date,
    // program.end_date
    getPrograms({})
      .then((result) => {
        console.log(result);
        const data = result.data.programs;
        let rows = data.map(row => createData(...row));
        setRows(rows);
      });
  }, []);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <ProgramTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.trackingNo);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.trackingNo}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.trackingNo}
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                    {nameWithLink(row.name, row.websiteurl)}
                  </TableCell>
                  <TableCell align="left">{row.state_name}</TableCell>
                  <TableCell align="left">{row.program_type_name}</TableCell>
                  <TableCell align="left">{row.program_category_name}</TableCell>
                  <TableCell align="left">{row.start_date}</TableCell>
                  <TableCell align="left">{row.end_date}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
