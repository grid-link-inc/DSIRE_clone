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
import DetailsCard from './DetailsCard';
import ContactsCard from './ContactsCard';
import ApplicabilityCard from './ApplicabilityCard';
import ChatWidget from './ChatWidget';
import { Box, Container, Divider, Stack } from '@mui/material';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const fake_data = {
  data: {
    authorities: [
      {
        code: 'Policy No. 900-14',
        effective: '2010-05-18 04:00:00',
        effectivetext: null,
        enacted: null,
        enactedtext: null,
        expired: null,
        expiredtext: null,
        file_key: null,
        file_name: null,
        id: 2845,
        program_id: 4790,
        website: 'https://docs.sandiego.gov/councilpolicies/cpd_900-14.pdf'
      },
      {
        code: 'Policy No. 600-27',
        effective: '2017-10-20 04:00:00',
        effectivetext: null,
        enacted: null,
        enactedtext: null,
        expired: null,
        expiredtext: null,
        file_key: null,
        file_name: null,
        id: 2844,
        program_id: 4790,
        website: 'https://docs.sandiego.gov/councilpolicies/cpd_600-27.pdf'
      }
    ],
    cities: [
      {
        id: 27522,
        name: 'San Diego'
      },
      {
        id: 27523,
        name: 'Los Angeles'
      }
    ],
    contacts: [
      {
        email: null,
        first_name: 'General',
        id: 4754,
        last_name: 'Information',
        organization_name: null,
        phone: '6194465000',
        website_url: 'http://www.sandiego.gov/development-services/contact/'
      }
    ],
    counties: ['San Diego', 'Los Angeles'],
    details: [
      {
        display_order: 0,
        id: 20881,
        label: 'Permit Fee Waiver / Reduction',
        value: null
      },
      {
        display_order: 1,
        id: 20882,
        label: 'Expedited Permitting Process',
        value: 'Buildings designed to achieve LEED Silver Certification can qualify for expedited permits.'
      },
      {
        display_order: 2,
        id: 20883,
        label: 'Density Bonus',
        value: null
      }
    ],
    program: {
      category: 'Financial Incentive',
      end_date: null,
      id: 4790,
      name: 'City of San Diego - Sustainable Building Expedited Permit Program',
      start_date: 'Tue, 20 May 2003 04:00:00 GMT',
      state: 'California',
      summary:
        '<p>In 2002, the City of San Diego passed Resolution R-298001, which amended the <a href="http://programs.dsireusa.org/system/program/detail/204">Sustainable Building Policy</a> to allow for expedited permitting for sustainable buildings. Sustainable buildings are defined in Policy Number 900-14, and the expedited permitting program is described in Policy Number 600-27. The Sustainable Building Policy is scheduled to be revised every three years.<br/><br/>&#10;New residential, commercial, and industrial development projects are all eligible for expedited permitting. The expedited permitting process is estimated to take 50% as much time as the normal permitting process. The policy also prioritizes project types in the case that the expedited permitting program is full. Sustainable projects that also qualify as &#34;Affordable Housing&#34; projects receive second priority, and all other sustainable building projects receive fourth priority.<br/><br/>See <a href="https://docs.sandiego.gov/councilpolicies/cpd_900-14.pdf">Council Policy 900-14</a> for a list of requirements to qualify for expedited permitting.  Program materials, including a checklist and form, are available on the program website above.</p>',
      type: 'Green Building Incentive',
      website: 'https://www.sandiego.gov/development-services/news-programs/sbep'
    },
    utilities: [],
    zipcodes: ['00501', '00544', '00601']
  }
};

const ProgramDetails = () => {
  let { id } = useParams();

  // const [programData, setProgramData] = useState(null);
  const [programData, setProgramData] = useState(fake_data.data);

  // useEffect(() => {
  //   const functions = getFunctions();
  //   const get_program_enriched = httpsCallable(functions, 'get_program_enriched');
  //   get_program_enriched({ id: id }).then((result) => {
  //     setProgramData(result.data);
  //   });
  // }, [id]);

  if (!programData) {
    return null;
  }

  return (
    <MainCard sx={{ mt: 2 }} content={false}>
      {/* <ChatWidget /> */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
          px: 5,
          background: 'E4F4EF' // FIXME: use theme
        }}
      >
        <Container maxWidth="false">
          <Grid container spacing={4}>
            <Grid sm={12}>
              <Stack spacing={2}>
                <Typography variant="h2">{programData.program.name}</Typography>
                <Typography variant="h4" color="textSecondary">
                  {programData.program_type_name}
                </Typography>
                <Divider />
              </Stack>
            </Grid>
            <Grid sm={12} md={6}>
              <Stack spacing={4}>
                <ApplicabilityCard
                  state={programData.program.state}
                  counties={programData.counties}
                  cities={programData.cities}
                  zips={programData.zipcodes}
                  category={programData.program.category}
                  type={programData.program.type}
                  startDate={programData.program.start_date}
                  endDate={programData.program.end_date}
                />
                <ResourcesCard programWebsite={programData.program.website} authorities={programData.authorities} />
              </Stack>
            </Grid>
            <Grid sm={12} md={6}>
              <Stack spacing={4}>
                <ContactsCard contacts={programData.contacts} />
                <DetailsCard listOfDetails={programData.details} />
              </Stack>
            </Grid>
            <Grid sm={12}>
              <DescriptionCard descriptionHTMLString={programData.program.summary} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MainCard>
  );
};

export default ProgramDetails;
