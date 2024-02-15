// material-ui
import { Typography, Link, Grid, Card, CardHeader, CardContent, Button, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import { Box } from '../../../node_modules/@mui/material/index';

// ==============================|| SAMPLE PAGE ||============================== //

const AboutPage = () => {
  const theme = useTheme();
  return (
    <MainCard sx={{ py: 4, px: 6 }}>
      <Typography variant="h1" gutterBottom align="center" sx={{ mb: 4}}>
        About
      </Typography>
      <Typography variant="body1" align="center" paragraph sx={{ fontSize: 16 }}>
        This site is a database of energy incentives and policies in the United States. It&apos;s a more user-friendly wrapper of{' '}
        <Link href="https://www.dsireusa.org/">DSIRE.org</Link>. However, DSIRE data is known to be incomplete and out-of-date, (to no fault
        of their own; they do great work with limited resources). If you&apos;re interested in compehnsive, up-to-date data, check out my{' '}
        <Link href="https://policyexpert.umso.co/">other project.</Link>
      </Typography>
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={5} sx={{ pb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h3" align="center">
                  I want your feedback!
                </Typography>
              }
              sx={{ background: theme.palette.primary.main }}
            />
            <CardContent align="center" sx={{ p: 4, background: theme.palette.grey['50'] }}>
              <Typography variant="body1" paragraph sx={{ fontSize: 16 }}>
                I want to make this site as useful as possible, and to do that I want to know: what data is important to you? What are you
                using the data for? What features would you like to see?
              </Typography>
              <div id="about-page-feedback-button" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h3" align="center">
                  {' '}
                  Future improvements
                </Typography>
              }
              sx={{ background: theme.palette.primary.main }}
            />
            <CardContent sx={{ p: 4, background: theme.palette.grey['50'] }}>
              <Typography variant="body1" sx={{ mb: 2, fontSize: 16 }}>
                Some improvements I&apos;m considering are:
                <ul>
                  <li>More comprehensive data</li>
                  <li>Daily data updates</li>
                  <li>And a chat bot that is trained to answer your questions</li>
                </ul>
                If this sounds interesting to you, join the waitlist on my
                <Link href="https://policyexpert.umso.co/"> other project.</Link>
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button href="https://policyexpert.umso.co/#waitlist" variant="outlined">
                  Join Waitlist
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="body1" sx={{ fontSize: 16 }} paragraph>
        I hope you find this site useful!
      </Typography>
      <Typography variant="body1" sx={{ fontSize: 16, fontWeight: 'bold', fontStyle: 'italic' }}>
        Lyon Lay
      </Typography>
      <Typography variant="body1" sx={{ fontSize: 16 }}>
        <Link href="https://www.linkedin.com/in/lyonlay/">https://www.linkedin.com/in/lyonlay/</Link>{' '}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: 16 }}>
        <Link href="mailto:lay.lyon@gmail.com">lay.lyon@gmail.com</Link>
      </Typography>
    </MainCard>
  );
};

export default AboutPage;
