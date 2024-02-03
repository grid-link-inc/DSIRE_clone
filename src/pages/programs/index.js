// material-ui
import {
  Grid,
  Typography
} from '@mui/material';

// project import
import ProgramsTable from './ProgramsTable';
import MainCard from 'components/MainCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Programs = () => {
  return (
        <MainCard sx={{ mt: 2 }} content={false}>
          <ProgramsTable />
        </MainCard>
  );
};

export default Programs;
