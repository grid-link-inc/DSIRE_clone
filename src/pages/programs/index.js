// project import
import ProgramsTable from './ProgramsTable';
import MainCard from 'components/MainCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Programs = () => {
  return (
    <MainCard content={false}>
      <ProgramsTable />
    </MainCard>
  );
};

export default Programs;
