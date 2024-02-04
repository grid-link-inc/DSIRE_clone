// material-ui
import { Unstable_Grid2 as Grid, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { app } from '../../firebase/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import LocationCard from './LocationCard';
import ResourcesCard from './ResourcesCard';
import TimelineCard from './TimelineCard';
import DescriptionCard from './DescriptionCard';
import { Box, Container, Divider, Stack } from '@mui/material';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const fake = {
  data: {
    program: {
      authority_code: 'Kansas Statute 58-3801 et seq.',
      authority_effective_date: null,
      authority_effective_text: '7/1/2000',
      authority_expired_date: null,
      authority_expired_text: '12/31/2004',
      authority_id: 268,
      authority_websiteurl:
        'https://www.ksrevisor.org/statutes/chapters/ch58/058_038_0001.html#:~:text=58%2D3801.,by%20such%20easement%20is%20situated.',
      city_name: 'Kansas City',
      county_name: 'Clay, Platte, and Cass Counties',
      end_date: null,
      id: 8,
      name: 'Kansas Solar Easement Laws',
      program_category_name: 'Regulatory Policy',
      program_type_name: 'Solar/Wind Access Policy',
      start_date: null,
      state_name: 'Kansas',
      summary:
        '<p><span>Parties may voluntarily enter into solar easement contracts for the purpose of ensuring adequate exposure of a solar energy system. An easement must be expressed in writing and recorded with the register of deeds for that county.</span><br/></p><p></p><p>The written agreement must contain a description of the airspace in question and any term and/or conditions under which the solar easement is granted or terminated.</p><p></p>',
      utility_name: 'PG&E',
      websiteurl: 'www.kansas.gov',
      zipcode: 64030
    }
  }
};

const squashStartDates = (authorityEffectiveDate, authorityEffectiveText, startDate) => {
  let start = null;
  if (start) {
    start = parseDate(startDate);
  }
  if (!start && authorityEffectiveDate) {
    start = parseDate(authorityEffectiveDate);
  }
  if (!start && authorityEffectiveText) {
    start = parseDate(authorityEffectiveText);
  }
  return start;
};

const squashEndDates = (authorityExpiredDate, authorityExpiredText, endDate) => {
  let end = null;
  if (endDate) {
    end = parseDate(endDate);
  }
  if (!end && authorityExpiredDate) {
    end = parseDate(authorityExpiredDate);
  }
  if (!end && authorityExpiredText) {
    end = parseDate(authorityExpiredText);
  }
  return end;
};

const parseDate = (maybeDateString) => {
  const date = new Date(maybeDateString);
  if (isNaN(date.getTime())) {
    return null;
  }
  return date;
};

const ProgramDetails = () => {
  let { id } = useParams();

  const [program, setProgram] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    const functions = getFunctions();
    const getProgram = httpsCallable(functions, 'get_program');
    getProgram({ id: id }).then((result) => {
      console.log(result);
      let program = result.data.program;
      // program = fake.data.program;
      setProgram(program);
      setStart(squashStartDates(program.authority_effective_date, program.authority_effective_text, program.start_date));
      setEnd(squashEndDates(program.authority_expired_date, program.authority_expired_text, program.end_date));
    });
  }, [id]);

  if (!program) {
    return null;
  }

  return (
    <MainCard sx={{ mt: 2 }} content={false}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
          px: 2
        }}
      >
        <Container maxWidth="false">
          <Grid container spacing={4}>
            <Grid sm={12}>
              <Stack spacing={2}>
                <Typography variant="h2">{program.name}</Typography>
                <Typography variant="h4" color="textSecondary">
                  {program.program_type_name}
                </Typography>
                <Divider />
              </Stack>
            </Grid>
            <Grid sm={12} md={6} lg={4}>
              <LocationCard state={program.state_name} county={program.county_name} city={program.city_name} zip={program.zipcode} />
            </Grid>
            <Grid sm={12} md={6} lg={4}>
              <ResourcesCard
                programWebsite={program.websiteurl}
                authorityCode={program.authority_code}
                authorityWebsite={program.authority_websiteurl}
                utilityName={program.utility_name}
              />
            </Grid>
            <Grid sm={12} md={6} lg={4}>
              <TimelineCard startDate={start} endDate={end} />
            </Grid>
            <Grid sm={12}>
              <DescriptionCard descriptionHTMLString={program.summary} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MainCard>
  );
};

export default ProgramDetails;
