// material-ui
import {
    Grid,
    Typography
} from '@mui/material';

import { useParams } from 'react-router-dom';
// project import
// import ProgramDetailBox from './ProgramDetailBox';
import MainCard from 'components/MainCard';
import { useEffect } from 'react';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const ProgramDetails = () => {
    let { id } = useParams();

    useEffect(() => {
        // load program details
        console.log('loading program details for id: ', id);
    })
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75} >
            <Grid item xs={12} md={12} lg={12}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    {/* <ProgramDetailBox /> */}
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ProgramDetails;
