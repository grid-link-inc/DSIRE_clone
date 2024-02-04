// material-ui
import { Unstable_Grid2 as Grid, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';
import MainCard from 'components/MainCard';
import { useEffect } from 'react';
import { app } from '../../firebase/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import LocationCard from './LocationCard';
import ResourcesCard from './ResourcesCard';
import TimelineCard from './TimelineCard';
import DescriptionCard from './DescriptionCard';
import { Box, Container, Stack } from '@mui/material';

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
      city_name: 'cistyname',
      county_name: 'county name',
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
      zipcode: 1234
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
  let start = null;
  let end = null;

  //   useEffect(() => {
  // const functions = getFunctions();
  // const getProgram = httpsCallable(functions, 'get_program');
  // getProgram({"id": id})
  //   .then((result) => {
  //       const data = result.data.program;
  //       console.log(data);
  //   });
  // });
  start = squashStartDates(
    fake.data.program.authority_effective_date,
    fake.data.program.authority_effective_text,
    fake.data.program.start_date
  );
  end = squashEndDates(fake.data.program.authority_expired_date, fake.data.program.authority_expired_text, fake.data.program.end_date);

  return (
    <MainCard sx={{ mt: 2 }} content={false}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="false">
          <Stack spacing={3}>
            <Typography variant="h2">{fake.data.program.name}</Typography>
            <Typography variant="h4" color="textSecondary">
              {fake.data.program.program_type_name}
            </Typography>
            <Grid container spacing={3}>
              <Grid sm={12}>
                <DescriptionCard descriptionHTMLString={fake.data.program.summary} />
              </Grid>
              <Grid sm={12} md={6} lg={4}>
                <LocationCard
                  state={fake.data.program.state_name}
                  county={fake.data.program.county_name}
                  city={fake.data.program.city_name}
                  zip={fake.data.program.zipcode}
                />
              </Grid>
              <Grid sm={12} md={6} lg={4}>
                <ResourcesCard
                  programWebsite={fake.data.program.websiteurl}
                  authorityCode={fake.data.program.authority_code}
                  authorityWebsite={fake.data.program.authority_websiteurl}
                  utilityName={fake.data.program.utility_name}
                />
              </Grid>
              <Grid sm={12} md={6} lg={4}>
                <TimelineCard startDate={start} endDate={end} />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </MainCard>
  );
};

export default ProgramDetails;
