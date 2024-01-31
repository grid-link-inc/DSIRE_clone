// material-ui
import {
  Grid,
  Typography
} from '@mui/material';

// project import
import ProgramsTable from './ProgramsTable';
import MainCard from 'components/MainCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} >
      <Grid item xs={12} md={12} lg={12}>
        <MainCard sx={{ mt: 2 }} content={false}>
          <ProgramsTable />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
