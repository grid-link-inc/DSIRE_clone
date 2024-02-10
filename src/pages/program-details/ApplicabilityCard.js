import PropTypes from 'prop-types';

import { Card, CardContent, CardHeader, List, ListItem, Divider, Typography, Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import HelpIcon from '@mui/icons-material/Help';

import { useTheme } from '@mui/material/styles';

const geographicRegion = (state, cities) => {
  if (state == 'federal') {
    return 'USA';
  }
  let region = '';
  if (cities.length > 0) {
    region += cities[0].name;
  }
  if (state) {
    region ? (region += ', ') : region;
    region += state;
  }
  // TODO
  // if (counties) {
  //   region += ', ' + counties[0] + ' County';
  // }
  // if (zips) {
  //   region += ', ' + zips[0] + ' (and ' + (zips.length - 1) + ' more)\n';
  // }
  return region;
};

const ApplicabilityCard = (props) => {
  const startDate = props.startDate ? new Date(props.startDate).toDateString() : 'N/A';
  const endDate = props.endDate ? new Date(props.endDate).toDateString() : 'N/A';

  const theme = useTheme();
  return (
    <Card>
      <CardHeader title="Applicability" sx={{ background: theme.palette.primary.main }} />
      <CardContent sx={{ padding: 0 }}>
        <List sx={{ padding: 0 }}>
          {props.category && (
            <>
              <Divider component="li" />
              <ListItem id="category">
                <Typography color="textSecondary" sx={{ minWidth: '150px' }}>
                  Category:
                </Typography>
                <Typography variant="h5">{props.category}</Typography>
              </ListItem>
            </>
          )}
          {props.type && (
            <>
              <Divider component="li" id="type-div" />
              <ListItem id="type">
                <Typography color="textSecondary" sx={{ minWidth: '150px' }}>
                  Type:
                </Typography>
                <Typography variant="h5">{props.type}</Typography>
                <Tooltip title="Type of program" TransitionComponent={Zoom} arrow>
                  <HelpIcon color="grey" sx={{ fontSize: 17, marginLeft: 1 }} />
                </Tooltip>
              </ListItem>
            </>
          )}
          {(props.state || props.cities) && (
            <>
              <Divider component="li" id="geography-div" />
              <ListItem id="geography">
                <Typography color="textSecondary" sx={{ minWidth: '150px' }}>
                  Geographic Area:
                </Typography>
                <Typography variant="h5">{geographicRegion(props.state, props.cities)}</Typography>
              </ListItem>
            </>
          )}
          <Divider component="li" id="start-div" />
          <ListItem id="start-date">
            <Typography color="textSecondary" sx={{ minWidth: '150px' }}>
              Start Date:
            </Typography>
            <Typography variant="h5">{startDate}</Typography>
          </ListItem>
          <Divider component="li" />
          <ListItem id="end-date">
            <Typography color="textSecondary" sx={{ minWidth: '150px' }}>
              End Date:
            </Typography>
            <Typography variant="h5">{endDate}</Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

ApplicabilityCard.propTypes = {
  category: PropTypes.string,
  type: PropTypes.string,
  state: PropTypes.string,
  counties: PropTypes.array,
  cities: PropTypes.array,
  zips: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string
};

export default ApplicabilityCard;
