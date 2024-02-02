// material-ui
import {
    Grid,
    Typography
} from '@mui/material';

import { useParams } from 'react-router-dom';
// import ProgramDetailBox from './ProgramDetailBox';
import MainCard from 'components/MainCard';
import { useEffect } from 'react';
import { app } from '../../firebase/firebase';
import { getFunctions, httpsCallable } from "firebase/functions";
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const ProgramDetails = () => {
    let { id } = useParams();

    useEffect(() => {
        const functions = getFunctions();
        const getProgram = httpsCallable(functions, 'get_program');
        getProgram({"id": id})
          .then((result) => {
              const data = result.data.program;
              console.log(data);
          });
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
