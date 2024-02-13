import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Chip from '@mui/material/Chip';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// material-ui
import { Box } from '@mui/material';
// import { GridToolbar } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';

import { app, functions } from '../../firebase/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';

import CustomNoRowsOverlay from './CustomNoRowsOverlay';

import {
  DataGridPro as DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  useGridApiRef
} from '@mui/x-data-grid-pro';

const staticData = {
  data: {
    programs: [
      [1, 'aNorth Dakota Solar/Wind Easements and Laws', 'North Dakota', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [
        2,
        'Qualifying Wood Stove Deduction',
        'Arizona',
        null,
        'Personal Tax Deduction',
        'Financial Incentive',
        'Sat, 01 Jan 1994 05:00:00 GMT',
        null
      ],
      [3, 'Maryland Solar Easements & Rights Laws', 'Maryland', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [
        4,
        'Oregon Solar and Wind Easements/Rights Laws & Local Option Solar Rights Law',
        'Oregon',
        null,
        'Solar/Wind Access Policy',
        'Regulatory Policy',
        null,
        null
      ],
      [6, 'Alaska Solar Easements', 'Alaska', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [7, 'Idaho Solar Easements & Access Laws', 'Idaho', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [8, 'Kansas Solar Easement Laws', 'Kansas', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [
        9,
        'Xcel Energy - Net Metering',
        'Colorado',
        'http://www.xcelenergy.com/docs/corpcomm/psco_elec_entire_tariff.pdf',
        'Net Metering',
        'Regulatory Policy',
        null,
        null
      ],
      [46, 'Wood-Burning Heating System Deduction', 'Alabama', null, 'Personal Tax Deduction', 'Financial Incentive', null, null],
      [10, 'Georgia Solar Easement Laws', 'Georgia', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [11, 'Kentucky Solar Easements Laws', 'Kentucky', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [12, 'Maine Solar Easements (Duplicate entry)', 'Maine', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [13, 'Rhode Island Solar Easement Laws', 'Rhode Island', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [14, 'Solar Easements & Rights Laws', 'Washington', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [
        15,
        'Fuel Mix and Emissions Disclosure',
        'Texas',
        'http://www.powertochoose.org',
        'Generation Disclosure',
        'Regulatory Policy',
        null,
        null
      ],
      [16, 'Arizona Solar Rights', 'Arizona', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [
        94,
        'SRP - Solar Water Heating Program',
        'Arizona',
        'http://www.srpnet.com/environment/solar/home/solarwaterheat.aspx',
        'Rebate Program',
        'Financial Incentive',
        null,
        null
      ],
      [
        190,
        'Renewable Portfolio Standard',
        'Wisconsin',
        'https://psc.wi.gov/Pages/Programs/RpsCompliance.aspx',
        'Renewables Portfolio Standard',
        'Regulatory Policy',
        null,
        null
      ],
      [18, 'Tennessee Solar Easement and Access Laws', 'Tennessee', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [19, 'New Jersey Solar Easements (duplicate entry)', 'New Jersey', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [20, 'Missouri Solar Easements & Rights Laws', 'Missouri', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [
        21,
        'New Hampshire Solar Easements (Duplicate entry)',
        'New Hampshire',
        null,
        'Solar/Wind Access Policy',
        'Regulatory Policy',
        null,
        null
      ],
      [
        22,
        'Ohio Solar Easement and Access Laws',
        'Ohio',
        null,
        'Solar/Wind Access Policy',
        'Regulatory Policy',
        'Tue, 14 Aug 1979 04:00:00 GMT',
        null
      ],
      [
        23,
        'Glendale Water and Power - Solar Solutions Program',
        'California',
        'http://www.glendaleca.gov/government/departments/glendale-water-and-power/solar-/residential-and-small-business',
        'Rebate Program',
        'Financial Incentive',
        null,
        null
      ],
      [4992, null, 'Vermont', null, 'Other Incentive', 'Financial Incentive', null, null],
      [24, 'Lincoln Electric Cooperative - Net Metering', 'Montana', null, 'Net Metering', 'Regulatory Policy', null, null],
      [
        25,
        'Solar Water Heating Incentive Program',
        'Oregon',
        'http://energytrust.org/residential/incentives/solar-water-heating/SolarWater',
        'Rebate Program',
        'Financial Incentive',
        'Wed, 01 Oct 2003 00:00:00 GMT',
        null
      ],
      [
        26,
        'Mandatory Utility Green Power Option',
        'Montana',
        null,
        'Mandatory Utility Green Power Option',
        'Regulatory Policy',
        null,
        null
      ],
      [27, 'Iowa Solar Easement and Access Laws', 'Iowa', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [28, 'Florida Solar Easement and Access Laws', 'Florida', null, 'Solar/Wind Access Policy', 'Regulatory Policy', null, null],
      [30, 'Solar & Wind Equipment Certification', 'Arizona', null, 'Equipment Certification', 'Regulatory Policy', null, null],
      [
        158,
        'Renewable Energy Systems Property Tax Exemption',
        'Nevada',
        null,
        'Property Tax Incentive',
        'Financial Incentive',
        'Fri, 01 Jul 1983 04:00:00 GMT',
        null
      ],
      [31, 'BEF - Solar 4R Schools', 'Oregon', 'http://www.solar4rschools.org/about', 'Grant Program', 'Financial Incentive', null, null],
      [32, 'Advanced Biofuels Tax Credit', 'Arkansas', null, 'Industry Recruitment/Support', 'Financial Incentive', null, null],
      [
        33,
        'Green Power Predevelopment Financing Grant',
        'Massachusetts',
        'http://www.mtpc.org/Grants_and_Awards/GPP/04GP03Info.htm',
        'Grant Program',
        'Financial Incentive',
        'Fri, 10 Oct 2003 00:00:00 GMT',
        null
      ],
      [
        34,
        'Indiana Biomass Grant Program',
        'Indiana',
        'http://www.state.in.us/doc/energy/research.html',
        'Grant Program',
        'Financial Incentive',
        null,
        null
      ],
      [
        35,
        'ComEd - Wind & Photovoltaic Generation Program',
        'Illinois',
        'http://www.chicagosolarpartnership.org',
        'Net Metering',
        'Regulatory Policy',
        null,
        null
      ],
      [
        169,
        'Utility Independent Home Rebate Program',
        'Oregon',
        'http://www.energy.state.or.us/renew/solar/PVhome.htm',
        'Rebate Program',
        'Financial Incentive',
        null,
        null
      ],
      [
        36,
        'Net Metering',
        'Ohio',
        'https://puco.ohio.gov/utilities/electricity/resources/net-metering',
        'Net Metering',
        'Regulatory Policy',
        null,
        null
      ],
      [37, 'Net Metering', 'Montana', 'https://deq.mt.gov/energy/Programs/renewable', 'Net Metering', 'Regulatory Policy', null, null],
      [
        38,
        'Net Metering',
        'New Jersey',
        'http://www.njcleanenergy.com/renewable-energy/programs/net-metering-and-interconnection',
        'Net Metering',
        'Regulatory Policy',
        null,
        null
      ],
      [39, 'Net Metering', 'Oregon', null, 'Net Metering', 'Regulatory Policy', null, null],
      [
        40,
        'Net Metering',
        'Virginia',
        'https://www.dominionenergy.com/home-and-small-business/renewable-energy-programs',
        'Net Metering',
        'Regulatory Policy',
        null,
        null
      ],
      [41, 'Net Metering', 'Vermont', 'http://psb.vermont.gov/electric/net-metering', 'Net Metering', 'Regulatory Policy', null, null],
      [
        42,
        'Net Metering',
        'Washington',
        'http://www.utc.wa.gov/regulatedIndustries/utilities/energy/Pages/netMetering.aspx',
        'Net Metering',
        'Regulatory Policy',
        null,
        null
      ],
      [43, 'Net Metering', 'Delaware', 'http://depsc.delaware.gov/electric.shtml', 'Net Metering', 'Regulatory Policy', null, null],
      [
        44,
        'Renewable Energy Systems Sales Tax Exemption',
        'Vermont',
        null,
        'Sales Tax Incentive',
        'Financial Incentive',
        'Tue, 26 Jan 1999 05:00:00 GMT',
        null
      ],
      [
        45,
        'Local Option - Property Tax Exemption',
        'Vermont',
        'http://tax.vermont.gov/municipal-officials/solar-valuation/everything-you-need-to-know-about-solar',
        'Property Tax Incentive',
        'Financial Incentive',
        null,
        null
      ],
      [
        47,
        'Emerging Technology Development Credit',
        'Arkansas',
        'http://www.1800arkansas.com/Incentives/Emerging_Technology.htm',
        'Industry Recruitment/Support',
        'Financial Incentive',
        null,
        null
      ],
      [48, 'Energy-Saving Equipment Deduction', 'Arkansas', null, 'Personal Tax Deduction', 'Financial Incentive', null, null],
      [
        49,
        'Solar and Wind Energy Credit (Corporate)',
        'Hawaii',
        'http://tax.hawaii.gov/geninfo/renewable/',
        'Corporate Tax Credit',
        'Financial Incentive',
        'Wed, 01 Jul 2009 04:00:00 GMT',
        null
      ],
      [
        50,
        'Solar and Wind Energy Credit (Personal)',
        'Hawaii',
        'http://tax.hawaii.gov/geninfo/renewable/',
        'Personal Tax Credit',
        'Financial Incentive',
        'Wed, 01 Jul 2009 04:00:00 GMT',
        null
      ],
      [
        51,
        'Wind Energy System Personal Tax Credit',
        'Hawaii',
        'http://www.state.hi.us/dbedt/ert/taxcredit.html',
        'Personal Tax Credit',
        'Financial Incentive',
        null,
        'Tue, 01 Jul 2003 00:00:00 GMT'
      ],
      [
        52,
        'Wind Energy System Corporate Tax Credit',
        'Hawaii',
        'http://www.state.hi.us/dbedt/ert/taxcredit.html',
        'Corporate Tax Credit',
        'Financial Incentive',
        null,
        'Tue, 01 Jul 2003 00:00:00 GMT'
      ],
      [53, 'Alcohol Fuels Exemption', 'Hawaii', null, 'Sales Tax Incentive', 'Financial Incentive', null, 'Sun, 31 Dec 2006 00:00:00 GMT'],
      [
        917,
        'USDA - Rural Energy for America Program (REAP) Grants',
        'Federal',
        'http://www.rd.usda.gov/reap',
        'Grant Program',
        'Financial Incentive',
        null,
        null
      ],
      [
        54,
        'Renewable Energy Property Tax Exemption',
        'Indiana',
        'https://www.in.gov/dlgf/deductions-property-tax/',
        'Property Tax Incentive',
        'Financial Incentive',
        'Mon, 01 Mar 2010 05:00:00 GMT',
        null
      ],
      [55, 'Energy Education and Demonstration Grant Program', 'Indiana', null, 'Grant Program', 'Financial Incentive', null, null],
      [
        56,
        'Renewable Energy Equipment Exemption',
        'Iowa',
        'https://tax.iowa.gov/iowa-sales-and-use-tax-guide',
        'Sales Tax Incentive',
        'Financial Incentive',
        null,
        null
      ],
      [
        57,
        'Ethanol-Based Fuels Exemption',
        'Iowa',
        'http://www.state.ia.us/dnr/energy/programs/renewable/incentives.htm',
        'Sales Tax Incentive',
        'Financial Incentive',
        null,
        'Sat, 30 Jun 2007 00:00:00 GMT'
      ],
      [
        58,
        'State Agency Renewable Energy Utilization',
        'Nebraska',
        'http://www.nol.org/home/NEO/exec98-1.htm',
        'Energy Standards for Public Buildings',
        'Regulatory Policy',
        null,
        null
      ],
      [
        59,
        'Voluntary Renewable Resources Grants',
        'Maine',
        'http://www.efficiencymaine.com/renewable-energy/grants-for-renewables',
        'Grant Program',
        'Financial Incentive',
        'Tue, 15 Dec 1998 00:00:00 GMT',
        null
      ],
      [
        2624,
        'Local Option - Property Tax Exemption Cogeneration Systems',
        'Connecticut',
        null,
        'Property Tax Incentive',
        'Financial Incentive',
        'Sun, 01 Jul 2007 00:00:00 GMT',
        null
      ],
      [
        60,
        'Local Option - Property Tax Exemption for Renewable Energy and Electrical Energy Storage',
        'New Hampshire',
        'https://www.gencourt.state.nh.us/rsa/html/V/72/72-61.htm',
        'Property Tax Incentive',
        'Financial Incentive',
        'Thu, 01 Jan 1976 05:00:00 GMT',
        null
      ],
      [
        61,
        'San Antonio City Public Service - Distributed Generation Program',
        'Texas',
        'http://www.citypublicservice.com/content_listInternet.asp?cont_id=5458&elmt_id=11',
        'Net Metering',
        'Regulatory Policy',
        null,
        null
      ],
      [62, 'BEF - Solar 4R Schools', 'Idaho', 'http://www.solar4rschools.org/about', 'Grant Program', 'Financial Incentive', null, null],
      [
        63,
        'Grays Harbor PUD - Solar Water Heater Rebate',
        'Washington',
        'http://www.ghpud.org',
        'Rebate Program',
        'Financial Incentive',
        null,
        null
      ],
      [
        64,
        'WisconSUN Demonstration Grants',
        'Wisconsin',
        'http://www.wisconsun.org/fund/fund_oppy.shtml',
        'Grant Program',
        'Financial Incentive',
        null,
        null
      ],
      [
        65,
        'Net Metering',
        'Pennsylvania',
        'http://www.puc.pa.gov/consumer_info/electricity/alternative_energy.aspx',
        'Net Metering',
        'Regulatory Policy',
        'Mon, 28 Feb 2005 05:00:00 GMT',
        null
      ],
      [
        66,
        'Marin County - Green Building Requirements',
        'California',
        'http://www.co.marin.ca.us/depts/CD/main/comdev/advance/sustainability/greenbuilding/gbs/gb_standards.cfm',
        'Building Energy Code',
        'Regulatory Policy',
        null,
        null
      ],
      [
        107,
        'Residential Solar Energy Property Tax Reduction',
        'Rhode Island',
        'http://www.energy.ri.gov/renewable/tax/',
        'Property Tax Incentive',
        'Financial Incentive',
        'Mon, 01 Jan 2001 05:00:00 GMT',
        null
      ],
      [
        67,
        'Clean Energy Incentive Act (Personal Credit)',
        'Maryland',
        'http://www.energy.state.md.us/programs/residential/cleanincentives.htm',
        'Personal Tax Credit',
        'Financial Incentive',
        'Sat, 01 Jul 2000 00:00:00 GMT',
        'Fri, 31 Dec 2004 00:00:00 GMT'
      ],
      [68, 'Fuel Mix Disclosure', 'Pennsylvania', null, 'Generation Disclosure', 'Regulatory Policy', null, null],
      [
        69,
        'Sales Tax Exemption -  Fuel Cells',
        'Maryland',
        'http://www.energy.state.md.us/programs/cleanincentives.html',
        'Sales Tax Incentive',
        'Financial Incentive',
        'Sat, 01 Jul 2000 00:00:00 GMT',
        'Thu, 01 Jul 2004 00:00:00 GMT'
      ],
      [
        70,
        'EV and Hybrid Sales Tax Exemption',
        'Maryland',
        'http://www.energy.state.md.us/cleanincentives.html',
        'Sales Tax Incentive',
        'Financial Incentive',
        null,
        null
      ],
      [
        71,
        'Clean Energy Incentive Act (Corporate Credit)',
        'Maryland',
        'http://business.marylandtaxes.com/taxinfo/taxcredit/cleanenergy/default.asp',
        'Corporate Tax Credit',
        'Financial Incentive',
        'Sat, 01 Jul 2000 00:00:00 GMT',
        'Fri, 31 Dec 2004 00:00:00 GMT'
      ],
      [72, 'Montana Electric Coops - Net Metering', 'Montana', null, 'Net Metering', 'Regulatory Policy', null, null],
      [
        108,
        'Sustainable Energy Trust Fund',
        'District of Columbia',
        'https://www.dcseu.com/about',
        'Public Benefits Fund',
        'Regulatory Policy',
        null,
        null
      ],
      [971, 'Industrial Facilities Tax Exemption', 'Michigan', null, 'Property Tax Incentive', 'Financial Incentive', null, null],
      [
        73,
        'Ethanol Production Investment Tax Credit',
        'Hawaii',
        'http://www.state.hi.us/dbedt/ert/ethanol-incentive.html',
        'Corporate Tax Credit',
        'Financial Incentive',
        'Tue, 01 Jan 2002 00:00:00 GMT',
        null
      ],
      [
        74,
        'PV Rebate Program',
        'Florida',
        'http://www.fsec.ucf.edu/PVT/BuyInstallPV/rebates.htm',
        'Rebate Program',
        'Financial Incentive',
        null,
        null
      ],
      [75, 'Renewable Energy Property Tax Exemption', 'Kansas', null, 'Property Tax Incentive', 'Financial Incentive', null, null],
      [
        76,
        'Long Island Power Authority - PV Rebate Program',
        'New York',
        'http://www.lipower.org/solar',
        'Rebate Program',
        'Financial Incentive',
        'Mon, 26 Jan 2015 20:00:00 GMT',
        null
      ],
      [
        77,
        'Energy Conversion and Thermal Efficiency Sales Tax Exemption',
        'Ohio',
        'https://tax.ohio.gov/help-center/faqs/sales-and-use-applying-the-tax-what-is-and-isnt-taxable',
        'Sales Tax Incentive',
        'Financial Incentive',
        null,
        null
      ],
      [78, 'Air-Quality Improvement Tax Incentives', 'Ohio', null, 'Other Incentive', 'Financial Incentive', null, null],
      [
        79,
        'Energy Conversion Facilities Property Tax Exemption',
        'Ohio',
        null,
        'Property Tax Incentive',
        'Financial Incentive',
        null,
        null
      ],
      [
        80,
        'Residential Solar Tax Credit',
        'New York',
        'http://www.tax.ny.gov/pit/credits/solar_energy_system_equipment_credit.htm',
        'Personal Tax Credit',
        'Financial Incentive',
        null,
        null
      ],
      [
        81,
        'Solar and Wind Energy Device Franchise Tax Deduction',
        'Texas',
        'http://www.seco.cpa.state.tx.us/re/incentives-taxcode-statutes.php',
        'Corporate Tax Deduction',
        'Financial Incentive',
        'Tue, 26 Jan 1982 05:00:00 GMT',
        null
      ],
      [
        82,
        'Solar and Wind Energy Business Franchise Tax Exemption',
        'Texas',
        'http://www.seco.cpa.state.tx.us/re/incentives-taxcode-statutes.php',
        'Industry Recruitment/Support',
        'Financial Incentive',
        'Tue, 26 Jan 1982 05:00:00 GMT',
        null
      ],
      [
        83,
        'Renewable Energy Systems Tax Credit (Personal)',
        'Utah',
        'https://energy.utah.gov/tax-credits/renewable-energy-systems-tax-credit/',
        'Personal Tax Credit',
        'Financial Incentive',
        null,
        null
      ],
      [
        84,
        'UES - Renewable Energy Credit Purchase Program',
        'Arizona',
        'https://www.uesaz.com/Renewable/Home/PV/',
        'Rebate Program',
        'Financial Incentive',
        'Mon, 26 Jan 2015 05:00:00 GMT',
        null
      ],
      [
        85,
        'Local Option - Residential Property Tax Exemption for Solar',
        'Virginia',
        'https://law.lis.virginia.gov/vacode/58.1-3661/',
        'Property Tax Incentive',
        'Financial Incentive',
        null,
        null
      ],
      [114, 'City of Tucson - Solar Dividend', 'Arizona', 'http://www.tucsonmec.org/', 'Other Policy', 'Regulatory Policy', null, null],
      [
        86,
        'GMP - Biomass Grants',
        'Vermont',
        null,
        'Grant Program',
        'Financial Incentive',
        'Wed, 07 Apr 2004 00:00:00 GMT',
        'Mon, 31 Dec 2012 00:00:00 GMT'
      ],
      [
        87,
        'Fuel Mix and Emissions Disclosure',
        'Washington',
        'https://www.commerce.wa.gov/growing-the-economy/energy/fuel-mix-disclosure/',
        'Generation Disclosure',
        'Regulatory Policy',
        null,
        null
      ],
      [
        88,
        'Schools with Sol',
        'New Mexico',
        'http://www.emnrd.state.nm.us/emnrd/ecmd/SolSchools/SolSchools.htm',
        'Grant Program',
        'Financial Incentive',
        null,
        null
      ],
      [89, 'Klickitat PUD - Solar PV Rebate', 'Washington', 'http://www.klickpud.com', 'Rebate Program', 'Financial Incentive', null, null],
      [90, 'Aspen Electric - Net Metering', 'Colorado', null, 'Net Metering', 'Regulatory Policy', null, null],
      [
        91,
        'Klickitat PUD - Solar PV Loan Program',
        'Washington',
        'http://www.klickpud.com',
        'Loan Program',
        'Financial Incentive',
        null,
        null
      ],
      [
        92,
        'DEMEC - Green Power Program',
        'Delaware',
        'http://www.demecinc.net/news.html',
        'Mandatory Utility Green Power Option',
        'Regulatory Policy',
        null,
        null
      ]
    ]
  }
};
function createData(id, name, state_name, websiteurl, program_type_name, program_category_name, start_date, end_date) {
  start_date = start_date ? new Date(start_date) : null;
  end_date = end_date ? new Date(end_date) : null;
  return { id, name, state_name, websiteurl, program_type_name, program_category_name, start_date, end_date };
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const _lightGreen_ = '#EBF9F1';
const _green_ = '#BBDDD3';
const _darkGreen_ = '#1F9254';
const _lightOrange_ = '#FEF2E5';
const _darkOrange_ = '#CD6200';
const _lightRed_ = '#FBE7E8';
const _darkRed_ = '#A30D11';

const renderStatus = (params) => {
  const currentDate = new Date();
  if (!params.row.start_date && params.row.end_date >= currentDate) {
    return (
      <Chip
        label="Upcoming"
        size="small"
        style={{
          backgroundColor: _lightOrange_,
          color: _darkOrange_
        }}
      />
    );
  }
  if (params.row.start_date <= currentDate && params.row.end_date >= currentDate) {
    return (
      <Chip
        label="Active"
        size="small"
        style={{
          backgroundColor: _lightGreen_,
          color: _darkGreen_
        }}
      />
    );
  }
  return (
    <Chip
      label="Inactive"
      size="small"
      style={{
        backgroundColor: _lightRed_,
        color: _darkRed_
      }}
    />
  );
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

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    disableColumnMenu: true,
    headerAlign: 'center',
    align: 'center',
    width: 70,
    hideSortIcons: true,
    headerClassName: 'app-grey--header'
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
    headerName: 'Program Type',
    flex: 1,
    headerClassName: 'app-grey--header'
  },
  {
    field: 'program_category_name',
    headerName: 'Program Category',
    flex: 1,
    headerClassName: 'app-grey--header'
  },
  {
    headerName: 'Status',
    headerClassName: 'app-grey--header',
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

let fake_rows = staticData['data']['programs'].map((row) => createData(...row));
fake_rows = [...fake_rows, ...fake_rows];

const defaultTableState = {
  pagination: { paginationModel: { page: 0, pageSize: 25 } }
};

const maybeStoreTableState = (apiRefCurrent) => {
  const tableState = apiRefCurrent.exportState();
  // check table state is not empty object
  if (Object.keys(tableState).length === 0) return;
  const myState = { tableState };
  localStorage.setItem('dsireCloneSiteState', JSON.stringify(myState));
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

export default function ProgramTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Hook from React Router to get current location
  const apiRef = useGridApiRef();

  useEffect(() => {
    // setTimeout(() => {
    //   setRows(fake_rows), 1000;
    //   setLoading(false);
    // }, 1000);
    const functions = getFunctions();
    const getPrograms = httpsCallable(functions, 'get_programs');
    getPrograms({}).then((result) => {
      const data = result.data.programs;
      let rows = data.map((row) => createData(...row));
      setRows(rows);
      setLoading(false);
    });
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
  });

  // Save table state when the user leaves this page
  useEffect(() => {
    const currentApiRef = apiRef.current;
    return () => {
      maybeStoreTableState(currentApiRef);
    };
  }, [location, apiRef]);

  let initialTableState = defaultTableState;

  const storedState = localStorage.getItem('dsireCloneSiteState');
  if (storedState) {
    const parsedState = JSON.parse(storedState);
    if (parsedState.tableState) {
      initialTableState = parsedState.tableState;
    }
  }

  return (
    <Box
      sx={{
        '& .MuiChip-root': {
          borderRadius: 10
        }
      }}
    >
      <DataGrid
        apiRef={apiRef}
        columns={columns}
        rows={rows}
        autoHeight
        pagination
        loading={loading}
        pageSizeOptions={[25, 50, 100, 1000]}
        initialState={initialTableState}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          toolbar: CustomToolbar
        }}
        sx={{
          '--DataGrid-overlayHeight': '300px',
          '& .app-grey--header': {
            backgroundColor: _green_
          }
        }}
        aria-labelledby="tableTitle"
      />
    </Box>
  );
}
